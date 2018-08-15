import axios from 'axios'
import {DELETE_TOY, GET_TOYS, GET_TOY, GET_ERRORS} from './types'

export const getToys = () => dispatch => {
  axios
    .get('/api/toys')
    .then(res =>
      dispatch({
        type: GET_TOYS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TOYS,
        payload: null
      })
    )
}

export const getToy = toyId => dispatch => {
  axios
    .get(`/api/posts/${toyId}`)
    .then(res =>
      dispatch({
        type: GET_TOY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TOY,
        payload: null
      })
    )
}

export const addToy = (toyData, history) => dispatch => {
  axios
    .post(`/api/toys`, toyData)
    .then(res => history.push('/'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const deleteToy = id => dispatch => {
  axios
    .delete(`/api/toys/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_TOY,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
