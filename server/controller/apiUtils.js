const bcrypt = require("bcrypt");
const User = require("../models/User");
const Api = require("../models/Api");
const promiseHandler = require("../utils/promiseHandler");

const generateApiKey = async (user) => {
  // check for user
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

  //   unique date

  const uniqueNumber = Date.now();

  //   hash to make api key
  const [hashedApiKey, errorHashedApiKey] = await promiseHandler(
    bcrypt.hash(`${uniqueNumber}@${user.token}`, 10)
  );

  if (errorHashedApiKey) {
    throw {
      errorCode: 2,
      message: "Error in generating api key",
      error: errorHashedApiKey.message,
    };
  }

  //   add to database

  const [apiKey, errorApiKey] = await promiseHandler(
    Api.create({
      user: user._id,
      apiKey: hashedApiKey,
    })
  );

  if (errorApiKey) {
    throw {
      errorCode: 3,
      message: "Unable to add api key to database",
      error: errorApiKey.message,
    };
  }

  return { apiKey };
};

const getApiKeys = async (user) => {
  // get users
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

  let [apiKeys, errorApiKeys] = await promiseHandler(
    Api.find({ user: user._id })
  );

  if (errorApiKeys) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query Apis",
      error: errorApiKeys.message,
    };
  }

  apiKeys = apiKeys.map(({ apiKey }) => ( apiKey ));

  return { apiKeys };
};

module.exports = { generateApiKey, getApiKeys };
