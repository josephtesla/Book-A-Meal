import * as types from "../constants/menu"


const initialState = {
  menu: [],
  loading: false,
  error: ""
}

const menuReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_MENU_REQUEST:
      return {
        ...state,
        loading: true,
        error: ""
      }

    case types.FETCH_MENU_SUCCESS:
      return {
        menu: payload.data,
        loading: false,
        error: ""
      }

    case types.FETCH_MENU_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error
      }


    case types.SETUP_MENU_REQUEST:
      return {
        ...state,
        loading: true,
        error: ""
      }


    case types.SETUP_MENU_SUCCESS:
      return {
        menu: [payload.data],
        loading: false,
        error: ""
      }

    case types.SETUP_MENU_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error
      }

    default:
      return {
        ...state
      };
  }
}


export default menuReducer;