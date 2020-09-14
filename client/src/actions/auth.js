import * as actionTypes from "../constants/auth";
import { asyncPostData } from "../utils/fetch";
import { removeLocalStorage, setLocalStorage, getAccessToken } from "../utils/helpers";

const action = (type, payload) => ({ type, payload });

export const authenticate = (resp, next) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(action(actionTypes.AUTHENTICATE_USER, resp))
      localStorage.clear();
      setLocalStorage("token", resp.token);
      next()
    }, 1000)
  }
}

export const userSignInAction = (loginDetails = {}) => {
  return async (dispatch) => {
    dispatch(action(actionTypes.FETCH_SIGNIN_REQUEST, loginDetails))
    try {
      const resp = await asyncPostData("/signin", "", loginDetails);
      if (resp.error) {
        dispatch(action(actionTypes.FETCH_SIGNIN_FAILURE, resp))
      }
      else {
        dispatch(action(actionTypes.FETCH_SIGNIN_SUCCESS, resp))
      }
      return resp;
    } catch (errorResp) {
      console.log(errorResp)
      const resp = { error: errorResp.message }
      dispatch(action(actionTypes.FETCH_SIGNIN_FAILURE, resp))
      return resp;
    }
  }
}

export const userSignUpAction = (signUpDetails = {}) => {
  return async (dispatch) => {
    dispatch(action(actionTypes.FETCH_SIGNUP_REQUEST, signUpDetails))
    try {
      const token = getAccessToken();
      const resp = await asyncPostData("/signup", token, signUpDetails);
      if (resp.error) {
        dispatch(action(actionTypes.FETCH_SIGNUP_FAILURE, resp))
      }
      else {
        dispatch(action(actionTypes.FETCH_SIGNUP_SUCCESS, resp))
      }
      return resp;
    } catch (errorResp) {
      console.log(errorResp)
      const resp = { error: errorResp.message }
      dispatch(action(actionTypes.FETCH_SIGNUP_FAILURE, resp))
      return resp;
    }
  }
}


export const logout = (next) => {
  return (dispatch) => {
    dispatch(action(actionTypes.USER_LOGOUT, {}))
    removeLocalStorage(["token"])
    next();
  }
}