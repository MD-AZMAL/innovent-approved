import userActionTypes from "./user.types";

export const setCurrentUser = (user) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const setCurrentUserNull = () => ({
  type: userActionTypes.SET_CURRENT_USER_NULL,
});
