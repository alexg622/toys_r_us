import axios from 'axios'
import { GET_ERRORS, SET_CURRENT_USER, ADD_TOY_TO_CART } from './types'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/set_auth_token'

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwt_decode(token) // stores user data and issue at
      // set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const addToyToCart = toyId => dispatch => {
  axios.post(`/api/toys/${toyId}/cart`)
  .then(res =>
    dispatch({
      type: ADD_TOY_TO_CART,
      payload: res.data
    })
  ).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: {error: "You must be logged in to add a toy to your cart"}
    })
  )
}

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}
