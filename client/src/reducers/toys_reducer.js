import {
  ADD_TOY,
  GET_TOY,
  GET_TOYS,
  DELETE_TOY
} from '../actions/types'

const initialState = {
  toys: [],
  toy: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_TOYS:
      return {
        ...state,
        toys: action.payload,
      }
    case GET_TOY:
      return {
        ...state,
        toy: action.payload
      }
    case ADD_TOY:
      return {
        ...state,
        toys: [action.payload, ...state.toys]
      }
    case DELETE_TOY:
      return {
        ...state,
        toys: state.toys.filter(toy => toy._id !== action.payload)
      }
    default:
      return state;
  }
}
