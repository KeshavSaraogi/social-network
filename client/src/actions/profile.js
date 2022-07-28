import axios from "axios"
import { setAlert } from "./alert"

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS,
} from "./types"

//Get Current User Profile
const getCurrentProfile = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE })
  try {
    const res = await axios.get("/api/profile/me")
    dispatch({
      type: {
        type: GET_PROFILES,
        payload: res.data,
      },
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Get All User Profiles
const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile")
    dispatch({
      type: {
        type: GET_PROFILE,
        payload: res.data,
      },
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Get Profile By Id
const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`)
    dispatch({
      type: {
        type: GET_PROFILE,
        payload: res.data,
      },
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Get Github Repos
const getGihubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`)
    dispatch({
      type: {
        type: GET_REPOS,
        payload: res.data,
      },
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Create-Update Profile
const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        "Content-Type": "application/json",
      }
      const res = await axios.post("/api/profile", formData, config)
      dispatch({
        type: {
          type: GET_PROFILE,
          payload: res.data,
        },
      })
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "Success")
      )

      //If Creating
      if (!edit) {
        history.push("/dashboard")
      }
    } catch (err) {
      const errors = err.response.data.errors
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(err.msg, "danger")))
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }

//Add Experience
const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      "Content-Type": "application/json",
    }
    const res = await axios.put("/api/profile/experience", formData, config)
    dispatch({
      type: {
        type: UPDATE_PROFILE,
        payload: res.data,
      },
    })
    dispatch(setAlert("Experience Added", "Success"))
    history.push("/dashboard")
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(err.msg, "danger")))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Add Education
const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      "Content-Type": "application/json",
    }
    const res = await axios.put("/api/profile/education", formData, config)
    dispatch({
      type: {
        type: UPDATE_PROFILE,
        payload: res.data,
      },
    })
    dispatch(setAlert("Education Added", "Success"))
    history.push("/dashboard")
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(err.msg, "danger")))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Delete Experience
const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/exp/:exp_${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert("Experience Removed", "Success"))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Delete Education
const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/education/:exp_${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert("Education Removed", "Success"))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Delete Account-Profile
const deleteAccount = () => async (dispatch) => {
  if (
    window.confirm(
      "Are You Sure? This Will Result In Permament Removal Of The Account"
    )
  ) {
    try {
      await axios.delete("/api/profile")
      dispatch({ type: CLEAR_PROFILE })
      dispatch({ type: ACCOUNT_DELETED })
      dispatch(setAlert("Account Permanently Removed"))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}

export default {
  getCurrentProfile,
  getProfiles,
  getProfileById,
  createProfile,
  addEducation,
  addExperience,
  deleteExperience,
  deleteEducation,
  deleteAccount,
  getGihubRepos,
}
