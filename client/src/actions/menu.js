import * as types from "../constants/menu";
import { getAccessToken } from "../utils/helpers";

import { 
  asyncGetData, 
  asyncPostData, 
  asyncDeleteData, 
  asyncUpdateData 
} from "../utils/fetch";

const action = (type, payload) => ({ type, payload });


export const fetchMenuAction = () => async (dispatch) => {
  dispatch(action(types.FETCH_MENU_REQUEST, {}))
  try {
    const token = getAccessToken();
    const resp = await asyncGetData("/menu", token);
    console.log(resp);
    if (!resp.error) {
      dispatch(action(types.FETCH_MENU_SUCCESS, resp));
    } else {
      dispatch(action(types.FETCH_MENU_FAILURE, resp))
    }
    return resp
  } catch (error) {
    console.log(error)
    const resp = { error: error.message }
    dispatch(action(types.FETCH_MENU_FAILURE, resp))
    return resp
  }
}


export const setupMenuAction = (data = {}) => async (dispatch) => {
  dispatch(action(types.SETUP_MENU_REQUEST, {}))
  try {
    const token = getAccessToken();
    const resp = await asyncPostData("/menu", token, data);
    console.log(resp);
    if (!resp.error) {
      dispatch(action(types.SETUP_MENU_SUCCESS, resp));
    } else {
      dispatch(action(types.SETUP_MENU_FAILURE, resp));
    }
    return resp;
  } catch (error) {
    console.log(error)
    const resp = { error: error.message }
    dispatch(action(types.SETUP_MENU_FAILURE, resp))
    return resp
  }
}