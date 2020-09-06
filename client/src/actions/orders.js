import * as types from "../constants/orders";
import { getAccessToken } from "../utils/helpers";

import { 
  asyncGetData, 
  asyncPostData, 
  asyncDeleteData, 
  asyncUpdateData 
} from "../utils/fetch";

const action = (type, payload) => ({ type, payload });


export const fetchOrdersAction = () => async (dispatch) => {
  dispatch(action(types.FETCH_ORDERS_REQUEST, {}))
  try {
    const token = getAccessToken();
    const resp = await asyncGetData("/orders", token);
    console.log(resp);
    if (!resp.error) {
      dispatch(action(types.FETCH_ORDERS_SUCCESS, resp));
    } else {
      dispatch(action(types.FETCH_ORDERS_FAILURE, resp))
    }
    return resp
  } catch (error) {
    console.log(error)
    const resp = { error: error.message }
    dispatch(action(types.FETCH_ORDERS_FAILURE, resp))
    return resp
  }
}


export const addOrdersAction = (data = {}) => async (dispatch) => {
  dispatch(action(types.ADD_ORDERS_REQUEST, {}))
  try {
    const token = getAccessToken();
    const resp = await asyncPostData("/orders", token, data);
    console.log(resp);
    if (!resp.error) {
      dispatch(action(types.ADD_ORDERS_SUCCESS, resp));
    } else {
      dispatch(action(types.ADD_ORDERS_FAILURE, resp));
    }
    return resp;
  } catch (error) {
    console.log(error)
    const resp = { error: error.message }
    dispatch(action(types.ADD_ORDERS_FAILURE, resp))
    return resp
  }
}

export const removeOrdersAction = (orderId = "") => async (dispatch) => {
  dispatch(action(types.REMOVE_ORDERS_REQUEST, {}))
  try {
    const token = getAccessToken();
    const resp = await asyncDeleteData(`/orders/${orderId}`, token);
    console.log(resp);
    if (!resp.error) {
      dispatch(action(types.REMOVE_ORDERS_SUCCESS, resp));
    } else {
      dispatch(action(types.REMOVE_ORDERS_FAILURE, resp));
    }
    return resp;
  } catch (error) {
    console.log(error)
    const resp = { error: error.message }
    dispatch(action(types.REMOVE_ORDERS_FAILURE, resp))
    return resp
  }
}
