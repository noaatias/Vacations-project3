import {
  GET_VACATION,
  VACATION_ERROR,
  UPDATE_FOLLOW,
  GET_VACATION_BY_USER,
  DELETE_VACATION,
  NEW_VACATION,
  GET_VACATION_DATA,
  EDIT_VACATION
} from "../actions/types";

const initialState = {
  vacations: [],
  vacationsFollowedByUser: [],
  vacation: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_VACATION_BY_USER:
      return {
        ...state,
        vacationsFollowedByUser: payload
      };
    case NEW_VACATION:
      return {
        ...state,
        vacations: [...state.vacations, payload],
        loading: false
      };
    case EDIT_VACATION:
      return {
        ...state
      };
    case GET_VACATION_DATA:
      return {
        ...state,
        vacation: payload,
        loading: false
      };
    case DELETE_VACATION:
      return {
        ...state,
        vacations: state.vacations.filter(
          vacation => vacation.vacationID !== payload
        ),
        loading: false
      };
    case GET_VACATION:
      return {
        ...state,
        vacations: payload,
        loading: false
      };
    case VACATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_FOLLOW:
      return {
        ...state
      };
    default:
      return state;
  }
}
