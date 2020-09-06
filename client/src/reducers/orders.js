import * as types from "../constants/orders"


const initialState = {
  orders: [],
  loading: false,
  error: ""
}

const ordersReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case types.FETCH_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ""
      }


    case types.FETCH_ORDERS_SUCCESS:
      return {
        orders: payload.data,
        loading: false,
        error: ""
      }

    case types.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error
      }

    case types.ADD_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ""
      }


    case types.ADD_ORDERS_SUCCESS:
      return {
        orders: [...state.orders, payload.data],
        loading: false,
        error: ""
      }

    case types.ADD_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error
      }

    case types.REMOVE_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ""
      }


    case types.REMOVE_ORDERS_SUCCESS:
      return {
        orders: state.orders.filter(order => order._id !== payload.data._id ),
        loading: false,
        error: ""
      }

    case types.REMOVE_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error
      }

    default:
      return {
        ...state
      }
  }
}

export default ordersReducer;