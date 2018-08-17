import axios from 'axios'
import { BUY_TOYS, GET_CURRENT_USER, GET_ERRORS, SET_CURRENT_USER, ADD_TOY_TO_CART, REMOVE_TOY_FROM_CART, CLEAR_ERRORS } from './types'
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

export const loginUser = userData => dispatch => (
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
)

export const buyToys = () => dispatch => (
  axios.post(`/api/toys/purchase`)
    .then(res =>
      dispatch({
        type: BUY_TOYS,
        payload: res.data
      })
    )
)

export const getCurrentUser = () => dispatch => (
  axios.get(`/api/users/current`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data
      })
    )
)

export const addToyToCart = toyId => dispatch => (
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
)

export const haveItem = () => dispatch => (
  dispatch({
    type: GET_ERRORS,
    payload: {error: "You aleardy have this item"}
  })
)

export const removeToyFromCart = toyId => dispatch => (
  axios.delete(`/api/toys/${toyId}/cart`)
    .then(res =>
      dispatch({
        type: REMOVE_TOY_FROM_CART,
        payload: res.data
      })
    ).catch(err =>
      dispatch({
        type: GET_ERRORS,
        msg: "Couldn't remove toy"
      })
    )
)

export const clearErrors = () => dispatch => (
  dispatch({
    type: CLEAR_ERRORS
  })
)

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
