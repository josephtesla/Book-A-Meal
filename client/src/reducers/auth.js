import * as actionTypes from "../constants/auth";
import { userIsLoggedIn } from "../utils/helpers";


const [isLoggedIn, user, token ] = userIsLoggedIn();


const initialState = {
  isAuthenticated: isLoggedIn,
  user: user,
  token: token,
  loading: false,
  error: ""
}


const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {

    case actionTypes.FETCH_SIGNIN_REQUEST:
    case actionTypes.FETCH_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true
      }

    case actionTypes.FETCH_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ""
      }
    
    case actionTypes.FETCH_SIGNIN_FAILURE:
    case actionTypes.FETCH_SIGNUP_FAILURE:
    return {
      ...state,
      loading: false,
      error: payload.error
    }

    case actionTypes.FETCH_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ""
      }

    case actionTypes.AUTHENTICATE_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        token: payload.token,
        error: "",
        loading: true,
      }
    
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false
      }

    default:
      return state;
  }
}

export default authReducer;