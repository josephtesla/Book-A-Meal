import * as types from "../constants/meals"


const initialState = {
  meals: [],
  loading: false,
  error: ""
}

const mealsReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case types.FETCH_MEALS_REQUEST:
    case types.ADD_MEALS_REQUEST:
    case types.REMOVE_MEALS_REQUEST:
    case types.UPDATE_MEALS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ""
      }


    case types.FETCH_MEALS_FAILURE:
    case types.ADD_MEALS_FAILURE:
    case types.REMOVE_MEALS_FAILURE:
    case types.UPDATE_MEALS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error
      }

    case types.FETCH_MEALS_SUCCESS:
      return {
        meals: payload.data,
        loading: false,
        error: ""
      }

    case types.ADD_MEALS_SUCCESS:
      return {
        meals: [...state.meals, payload.data],
        loading: false,
        error: ""
      }

    case types.REMOVE_MEALS_SUCCESS:
      return {
        meals: state.meals.filter(meal => meal._id !== payload.data._id),
        loading: false,
        error: ""
      }

    case types.UPDATE_MEALS_SUCCESS:
        return {
          ...state,
          loading: false,
          error: ""
        }


    default:
      return {
        ...state
      }
  }
}

export default mealsReducer;