import { GET_CURRENT_USER, QUANTITY, SET_CURRENT_USER, ADD_TOY_TO_CART, REMOVE_TOY_FROM_CART } from '../actions/types'
import isEmpty from '../validation/is-empty'

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case ADD_TOY_TO_CART:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case REMOVE_TOY_FROM_CART:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case QUANTITY:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case GET_CURRENT_USER:
    return {
      ...state,
      isAuthenticated: !isEmpty(action.payload),
      user: action.payload
    }
    default:
      return state
  }
}
