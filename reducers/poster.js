import {
  POSTER_REGISTER_REQUEST,
  POSTER_REGISTER_SUCCESS,
  POSTER_REGISTER_FAIL,
  POSTER_LOGIN_REQUEST,
  POSTER_LOGIN_SUCCESS,
  POSTER_LOGIN_FAIL,
  POSTER_LOGOUT,
  POSTER_PROFILE_REQUEST,
  POSTER_PROFILE_SUCCESS,
  POSTER_PROFILE_FAIL,
  POSTER_PROFILE_UPDATE_REQUEST,
  POSTER_PROFILE_UPDATE_SUCCESS,
  POSTER_PROFILE_UPDATE_FAIL,
  GET_ALL_POSTERS_REQUEST,
  GET_ALL_POSTERS_SUCCESS,
  GET_ALL_POSTERS_FAIL,
  APPROVE_POSTER_REQUEST,
  APPROVE_POSTER_SUCCESS,
  APPROVE_POSTER_FAIL,
  DELETE_POSTER_REQUEST,
  DELETE_POSTER_SUCCESS,
  DELETE_POSTER_FAIL,
  POSTER_UPDATE_PICTURE_REQUEST,
  POSTER_UPDATE_PICTURE_SUCCESS,
  POSTER_UPDATE_PICTURE_FAIL,
} from "../constants/poster";

export const registerPosterReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTER_REGISTER_REQUEST:
      return { loading: true };
    case POSTER_REGISTER_SUCCESS:
      return { loading: false, success: true, posterInfo: action.payload };
    case POSTER_REGISTER_FAIL:
      return { loading: false, success: false, error: action.payload };
    case POSTER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const loginPosterReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTER_LOGIN_REQUEST:
      return { loading: true };
    case POSTER_LOGIN_SUCCESS:
      return { loading: false, success: true, posterInfo: action.payload };
    case POSTER_LOGIN_FAIL:
      return { loading: false, success: false, error: action.payload };
    case POSTER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const getPosterProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTER_PROFILE_REQUEST:
      return { loading: true };
    case POSTER_PROFILE_SUCCESS:
      return { loading: false, success: true, posterInfo: action.payload };
    case POSTER_PROFILE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case POSTER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const updatePosterProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTER_PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case POSTER_PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true, posterInfo: action.payload };
    case POSTER_PROFILE_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case POSTER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const checkPosterTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_POSTER_TOKEN_REQUEST:
      return { loading: true };
    case CHECK_POSTER_TOKEN_SUCCESS:
      return { loading: false, success: true, posterInfo: action.payload };
    case CHECK_POSTER_TOKEN_FAIL:
      return { loading: false, success: false, error: action.payload };
    case POSTER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const getAllPostersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_POSTERS_REQUEST:
      return { loading: true };
    case GET_ALL_POSTERS_SUCCESS:
      return { loading: false, success: true, posterInfo: action.payload };
    case GET_ALL_POSTERS_FAIL:
      return { loading: false, success: false, error: action.payload };
    case POSTER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const approvePosterReducer = (state = {}, action) => {
  switch (action.type) {
    case APPROVE_POSTER_REQUEST:
      return { loading: true };
    case APPROVE_POSTER_SUCCESS:
      return { loading: false, success: true, posterInfo: action.payload };
    case APPROVE_POSTER_FAIL:
      return { loading: false, success: false, error: action.payload };
    case POSTER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const deletePosterReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POSTER_REQUEST:
      return { loading: true };
    case DELETE_POSTER_SUCCESS:
      return { loading: false, success: true, posterInfo: action.payload };
    case DELETE_POSTER_FAIL:
      return { loading: false, success: false, error: action.payload };
    case POSTER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const posterUpdatePictureReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTER_UPDATE_PICTURE_REQUEST:
      return { loading: true };
    case POSTER_UPDATE_PICTURE_SUCCESS:
      return { loading: false, success: true, posterInfo: action.payload };
    case POSTER_UPDATE_PICTURE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
