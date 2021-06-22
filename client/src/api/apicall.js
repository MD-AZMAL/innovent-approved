import axios from "axios";
import endpoints from "./routes";

export const loginApi = async ({ email, role, password }) => {
  let data;
  let error;

  const requestObject = {
    ...endpoints.login,
    data: {
      email,
      password,
      role,
    },
  };

  try {
    const result = await axios(requestObject);
    data = result.data;

    error = null;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};

export const signupApi = async ({
  firstName,
  lastName,
  email,
  role,
  idNo,
  password,
}) => {
  let data;
  let error;

  const requestObject = {
    ...endpoints.signup,
    data: {
      firstName,
      lastName,
      email,
      role,
      password,
      idNo,
    },
  };

  try {
    const result = await axios(requestObject);
    data = result.data;

    error = null;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};

export const getPostsApi = async (token, all = false) => {
  let data;
  let error;

  const requestObject = {
    ...endpoints.getPosts,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      all: all,
    },
  };

  try {
    const result = await axios(requestObject);
    data = result.data;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};

export const getPostApi = async (token, postId) => {
  let data;
  let error;

  const requestObject = {
    ...endpoints.getPost,
    url: endpoints.getPost.url.replace(":postId", postId),
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const result = await axios(requestObject);
    data = result.data;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};

export const addPostApi = async (token, postLink) => {
  let data;
  let error;

  const requestObject = {
    ...endpoints.addPost,
    data: {
      postLink,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const result = await axios(requestObject);
    data = result.data;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};

export const approvePostApi = async (token, postId) => {
    let data;
    let error;
  
    const requestObject = {
      ...endpoints.approvePost,
      url: endpoints.approvePost.url.replace(":postId", postId),
      headers: {
        Authorization: "Bearer " + token,
      },
    };
  
    try {
      const result = await axios(requestObject);
      data = result.data;
    } catch (err) {
      data = null;
      error = err;
    }
  
    return [error, data];
  };