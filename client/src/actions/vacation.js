import axios from "axios";
import {setAlert} from "./alert";
import {
  NEW_VACATION,
  DELETE_VACATION,
  GET_VACATION,
  VACATION_ERROR,
  GET_VACATION_BY_USER,
  UPDATE_FOLLOW,
  GET_VACATION_DATA,
  EDIT_VACATION
} from "./types";
//get vacations that the user followed
export const getVacationsfollowedByUser = () => async dispatch => {
  try {
    const res = await axios.get("/vacations/follow");

    dispatch({
      type: GET_VACATION_BY_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VACATION_ERROR
    });
  }
};
//get all the vacations
export const getVacations = () => async dispatch => {
  try {
    const res = await axios.get("/vacations/");
    dispatch({
      type: GET_VACATION,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: VACATION_ERROR
      // payload: {msg:error.res.statusText,status: error.res.status}
    });
  }
};
//get the data of vacation
export const getVacationData = id => async dispatch => {
  try {
    const res = await axios.get(`/vacations/${id}`);
    dispatch({
      type: GET_VACATION_DATA,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VACATION_ERROR
    });
  }
};
// Add follow to vacation
export const addFollow = vacationID => async dispatch => {
  try {
    await axios.put(`/vacations/follow/${vacationID}`);
    dispatch({
      type: UPDATE_FOLLOW
    });
    dispatch(getVacationsfollowedByUser());
  } catch (err) {
    dispatch({
      type: VACATION_ERROR
    });
  }
};

// remove follow from vacation
export const removeFollow = vacationID => async dispatch => {
  try {
    await axios.put(`/vacations/unfollow/${vacationID}`);
    dispatch({
      type: UPDATE_FOLLOW
    });
    dispatch(getVacationsfollowedByUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: VACATION_ERROR
    });
  }
};
//delete vacation
export const deleteVacation = vacationID => async dispatch => {
  try {
    await axios.delete(`/vacations/${vacationID}`);
    dispatch({
      type: DELETE_VACATION,
      payload: vacationID
    });
    dispatch(setAlert("Vacation removed", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: VACATION_ERROR
    });
  }
};
//add new vacation
export const newVacation = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(
      `/vacations/`,
      formData,
      config
    );
    dispatch({
      type: NEW_VACATION,
      payload: res.data
    });
    dispatch(getVacations());
    dispatch(setAlert("Vacation created", "success"));
  } catch (err) {
    dispatch({
      type: VACATION_ERROR
    });
  }
};
//edit exist vacation
export const editVacation = (
  vacationId,
  formData,
  vacation
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (formData.Descripe === "") {
    formData.Descripe = vacation[0].Descripe;
  }
  if (formData.Img === "") {
    formData.Img = vacation[0].Img;
  }
  if (formData.startDate === "") {
    formData.startDate = vacation[0].startDate;
  }
  if (formData.endDate === "") {
    formData.endDate = vacation[0].endDate;
  }

  if (formData.Price === "") {
    formData.Price = vacation[0].Price;
  }

  try {
    const res = await axios.put(
      `/vacations/${vacationId}`,
      [formData],
      config
    );
    dispatch({
      type: EDIT_VACATION,
      payload: res.data
    });
    dispatch(setAlert("VACATION EDITED", "success"));
    dispatch(getVacations());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: VACATION_ERROR
    });
  }
};
