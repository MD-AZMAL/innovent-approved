const mongoose = require("mongoose");
const urlMetadata = require("url-metadata");
const User = require("../models/User");
const Post = require("../models/Post");
const promiseHandler = require("../utils/promiseHandler");

const addPost = async (io, postLink, user) => {
  //   check existing user
  const [existingUser, errorExistingUser] = await promiseHandler(
    User.findById(user._id)
  );

  if (!existingUser) {
    throw {
      errorCode: 4,
      message: "Invalid user id",
      error: null,
    };
  } else if (errorExistingUser) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query user",
      error: errorExistingUser,
    };
  }

  const [existingPost, errorExistingPost] = await promiseHandler(
    Post.findOne({ url: postLink })
  );

  // check for existing post
  if (existingPost) {
    throw {
      errorCode: 3,
      message: "Post already exists",
      error: null,
    };
  } else if (errorExistingPost) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query posts",
      error: errorExistingPost,
    };
  }

  // Get metadata from link

  const [meta, errorMeta] = await promiseHandler(urlMetadata(postLink));


  if (errorMeta) {
   
    throw {
      errorCode: 4,
      message: "Meta Error",
      error: errorMeta.message,
    };
  }

  //   fill postData
  const postData = {
    url: postLink,
    title: meta.title ? meta.title : "Unavailable",
    description: meta.description
      ? meta.description
      : "Lorem ipsum dolor sit amet",
    image: meta.image ? meta.image : "Unavailable",
    source: meta.source ? meta.source : "Unavailable",
    status: {
      levelOne: 0,
      levelTwo: 0,
    },
  };

  let [post, errorPost] = await promiseHandler(
    Post.create({
      ...postData,
      requestedBy: existingUser,
    })
  );

  if (errorPost) {
    throw {
      errorCode: 1,
      message: "Database error : Could not add post",
      error: errorPost,
    };
  }

  post = post.toObject();

  post.requestedBy = {
    name: `${post.requestedBy.firstName} ${post.requestedBy.lastName}`,
    role: post.requestedBy.role,
    email: post.requestedBy.email,
  };

  io.emit("posts", "hello from backend");

  return { post };
};

const getPosts = async ( user) => {
  let posts, errorPosts;

  // if admin return all posts

  if (user.role === "Admin") {
    [posts, errorPosts] = await promiseHandler(Post.find({}).sort({ _id: -1 }));
  } else {
    [posts, errorPosts] = await promiseHandler(
      Post.find({ requestedBy: user._id }).sort({ _id: -1 })
    );
  }


  if (errorPosts) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query posts",
      error: errorPosts,
    };
  }

  return { posts };
};

const getPost = async (id, user) => {
  // if admin return post info
  // if not admin show only post info if requested by user

  let post, errorPost;

  // if admin return  post
  if (user.role === "Admin") {
    [post, errorPost] = await promiseHandler(
      Post.findOne({ _id: id })
        .populate("requestedBy")
        .populate("levelOne")
        .populate("levelTwo")
    );
  } else {
    // if user requested the post for approval return them

    [post, errorPost] = await promiseHandler(
      Post.findOne({ _id: id, requestedBy: user._id })
        .populate("requestedBy")
        .populate("levelOne")
        .populate("levelTwo")
    );
  }

  if (errorPost) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query post",
      error: errorPost,
    };
  }

  if (post === null) {
    throw {
      errorCode: 2,
      message: "Not in request list or invalid post",
      error: null,
    };
  }

  post = post.toObject();

  post.requestedBy = {
    name: `${post.requestedBy.firstName} ${post.requestedBy.lastName}`,
    role: post.requestedBy.role,
    email: post.requestedBy.email,
  };

  post.levelOne = post.levelOne
    ? {
        name: `${post.levelOne.firstName} ${post.levelOne.lastName}`,
        role: post.levelOne.role,
        email: post.levelOne.email,
      }
    : null;

  post.levelTwo = post.levelTwo
    ? {
        name: `${post.levelTwo.firstName} ${post.levelTwo.lastName}`,
        role: post.levelTwo.role,
        email: post.levelTwo.email,
      }
    : null;

  return { post };
};

const validatePost = async (io, clientParameters, user) => {
  // check for admin

  const {postId, statusCode} = clientParameters;



  if (user.role != "Admin") {
    throw {
      errorCode: 2,
      message: "Not an Admin",
      error: { admin: false },
    };
  }

  // get post
  let [post, errorPost] = await promiseHandler(Post.findOne({ _id: postId }));

  if (errorPost) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query post",
      error: errorPost,
    };
  }
  if(!post) {
    throw {
      errorCode: 1,
      message: "Database Error: No post found",
      error: errorPost,
    };
  }

  // check level and update
  try {
    if (post.status.levelOne === 0) {
      post.status.levelOne = statusCode;
      post.levelOne = mongoose.Types.ObjectId(user._id);
    } else if (post.status.levelOne !== -1 && post.status.levelTwo === 0) {
      post.status.levelTwo = statusCode;
      post.levelTwo = mongoose.Types.ObjectId(user._id);
    }

    post.save();
  } catch (error) {
    console.log(error);
    throw {
      errorCode: 1,
      message: "Database Error: Unable to update post",
      error: error,
    };
  }

  [post, errorPost] = await promiseHandler(
    post
      .populate("requestedBy")
      .populate("levelOne")
      .populate("levelTwo")
      .execPopulate()
  );

  if (errorPost) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query post",
      error: errorPost,
    };
  }

  post = post.toObject();

  post.requestedBy = {
    name: `${post.requestedBy.firstName} ${post.requestedBy.lastName}`,
    role: post.requestedBy.role,
    email: post.requestedBy.email,
  };

  post.levelOne = post.levelOne
    ? {
        name: `${post.levelOne.firstName} ${post.levelOne.lastName}`,
        role: post.levelOne.role,
        email: post.levelOne.email,
      }
    : null;

  post.levelTwo = post.levelTwo
    ? {
        name: `${post.levelTwo.firstName} ${post.levelTwo.lastName}`,
        role: post.levelTwo.role,
        email: post.levelTwo.email,
      }
    : null;

  io.emit("posts", "hello from backend");
    
  return { post };
};

module.exports = { addPost, getPosts, getPost, validatePost };
