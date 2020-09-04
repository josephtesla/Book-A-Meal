import * as actionTypes from "../constants/auth";
import { asyncPostData } from "../utils/fetch";
import { removeLocalStorage, setLocalStorage } from "../utils/helpers";

const action = (type, payload) => ({ type, payload });

export const authenticate = (resp, next) => {
  return (dispatch) => {
    dispatch(action(actionTypes.AUTHENTICATE_USER, resp))
    localStorage.clear();
    setLocalStorage("token", resp.token);
    setTimeout(() => {
      next()
    }, 1200)
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




export const logout = (next) => {
  return (dispatch) => {
    dispatch(action(actionTypes.USER_LOGOUT, {}))
    removeLocalStorage(["token"])
    next();
  }
}