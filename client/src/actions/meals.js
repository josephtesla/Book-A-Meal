import * as types from "../constants/meals";
import { getAccessToken } from "../utils/helpers";

import { 
  asyncGetData, 
  asyncPostData, 
  asyncDeleteData, 
  asyncUpdateData 
} from "../utils/fetch";

const action = (type, payload) => ({ type, payload });


export const fetchMealsAction = () => async (dispatch) => {
  dispatch(action(types.FETCH_MEALS_REQUEST, {}))
  try {
    const token = getAccessToken();
    const resp = await asyncGetData("/meals", token);
    console.log(resp);
    if (!resp.error) {
      dispatch(action(types.FETCH_MEALS_SUCCESS, resp));
    } else {
      dispatch(action(types.FETCH_MEALS_FAILURE, resp))
    }
    return resp
  } catch (error) {
    console.log(error)
    const resp = { error: error.message }
    dispatch(action(types.FETCH_MEALS_FAILURE, resp))
    return resp
  }
}


export const addMealsAction = (data = {}) => async (dispatch) => {
  dispatch(action(types.ADD_MEALS_REQUEST, {}))
  try {
    const token = getAccessToken();
    const resp = await asyncPostData("/meals", token, data);
    console.log(resp);
    if (!resp.error) {
      dispatch(action(types.ADD_MEALS_SUCCESS, resp));
    } else {
      dispatch(action(types.ADD_MEALS_FAILURE, resp));
    }
    return resp;
  } catch (error) {
    console.log(error)
    const resp = { error: error.message }
    dispatch(action(types.ADD_MEALS_FAILURE, resp))
    return resp
  }
}

export const removeMealsAction = (mealId = "") => async (dispatch) => {
  dispatch(action(types.REMOVE_MEALS_REQUEST, {}))
  try {
    const token = getAccessToken();
    const resp = await asyncDeleteData(`/meals/${mealId}`, token);
    console.log(resp);
    if (!resp.error) {
      dispatch(action(types.REMOVE_MEALS_SUCCESS, resp));
    } else {
      dispatch(action(types.REMOVE_MEALS_FAILURE, resp));
    }
    return resp;
  } catch (error) {
    console.log(error)
    const resp = { error: error.message }
    dispatch(action(types.REMOVE_MEALS_FAILURE, resp))
    return resp
  }
}

export const updateMealAction = (mealId = "", updates = {}) => async (dispatch) => {
  dispatch(action(types.UPDATE_MEALS_REQUEST, {}))
  try {
    const token = getAccessToken();
    const resp = await asyncUpdateData(`/meals/${mealId}`, token, updates);
    console.log(resp);
    if (!resp.error) {
      dispatch(action(types.UPDATE_MEALS_SUCCESS, resp));
    } else {
      dispatch(action(types.UPDATE_MEALS_FAILURE, resp));
    }
    return resp;
  } catch (error) {
    console.log(error)
    const resp = { error: error.message }
    dispatch(action(types.UPDATE_MEALS_FAILURE, resp))
    return resp
  }
}
