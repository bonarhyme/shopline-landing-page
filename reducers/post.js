import {
  HANDLE_LIKE_REQUEST,
  HANDLE_LIKE_SUCCESS,
  HANDLE_LIKE_FAIL,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAIL,
  APPROVE_POST_REQUEST,
  APPROVE_POST_SUCCESS,
  APPROVE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_RESET,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  EDIT_POST_RESET,
  GET_POST_RESET,
} from "../constants/posts";

import { POSTER_LOGOUT } from "../constants/poster";

export const handleLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case HANDLE_LIKE_REQUEST:
      return {
        loading: true,
      };

    case HANDLE_LIKE_SUCCESS:
      return {
        loading: false,
        success: true,
        serverReply: action.payload,
      };
    case HANDLE_LIKE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case POSTER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const getAllPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_POSTS_REQUEST:
      return {
        loading: true,
      };

    case GET_ALL_POSTS_SUCCESS:
      return {
        loading: false,
        success: true,
        serverReply: action.payload,
      };
    case GET_ALL_POSTS_FAIL:
      return { loading: false, success: false, error: action.payload };
    case POSTER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const approvePostReducer = (state = {}, action) => {
  switch (action.type) {
    case APPROVE_POST_REQUEST:
      return {
        loading: true,
      };

    case APPROVE_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        serverReply: action.payload,
      };
    case APPROVE_POST_FAIL:
      return { loading: false, success: false, error: action.payload };
    case POSTER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return {
        loading: true,
      };

    case DELETE_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        serverReply: action.payload,
      };
    case DELETE_POST_FAIL:
      return { loading: false, success: false, error: action.payload };
    case POSTER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return {
        loading: true,
      };

    case CREATE_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        serverReply: action.payload,
      };
    case CREATE_POST_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CREATE_POST_RESET:
      return {};
    case POSTER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const editPostReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_POST_REQUEST:
      return {
        loading: true,
      };

    case EDIT_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        serverReply: action.payload,
      };
    case EDIT_POST_FAIL:
      return { loading: false, success: false, error: action.payload };

    case EDIT_POST_RESET:
      return {};

    case POSTER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const getPostReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_POST_REQUEST:
      return {
        loading: true,
      };

    case GET_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        serverReply: action.payload,
      };
    case GET_POST_FAIL:
      return { loading: false, success: false, error: action.payload };
    case GET_POST_RESET:
      return {};
    case POSTER_LOGOUT:
      return {};
    default:
      return state;
  }
};
