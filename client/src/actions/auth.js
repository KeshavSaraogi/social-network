import axios from "axios"
import { setAlert } from "./alert"
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTHENTICATION_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CLEAR_PROFILE,
} from "../actions/types"
import setAuthToken from "../utilities/setAuthToken"

//Load User
const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get("/api/auth")
    dispatch({ type: USER_LOADED, payload: res.data })
  } catch (err) {
    dispatch({ type: AUTHENTICATION_ERROR })
  }
}

//Register User
const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const body = JSON.stringify({ name, email, password })

    try {
      const res = await axios.post("/api/users", body, config)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
      dispatch(loadUser())
    } catch (err) {
      const errors = err.response.data.errors
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(err.msg, "danger")))
      }

      dispatch({
        type: REGISTER_FAILURE,
      })
    }
  }

//Login User
const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post("/api/auth", body, config)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(err.msg, "danger")))
    }

    dispatch({
      type: LOGIN_FAILURE,
    })
  }
}

//Logout-Clear Profile
const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT })
  dispatch({ type: CLEAR_PROFILE })
}

export default { loadUser, register, login }
