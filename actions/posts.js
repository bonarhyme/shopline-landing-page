import axios from "axios";

import {
  HANDLE_LIKE_REQUEST,
  HANDLE_LIKE_SUCCESS,
  HANDLE_LIKE_FAIL,
  GET_ALL_POSTS_FAIL,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  APPROVE_POST_REQUEST,
  APPROVE_POST_SUCCESS,
  APPROVE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
} from "../constants/posts";
import { appData } from "../variables/data";

export const handleLikeAction = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: HANDLE_LIKE_REQUEST,
    });

    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${appData.serverUrl}/post/like/${postId}`,

      config
    );
    dispatch({
      type: HANDLE_LIKE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HANDLE_LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllPosts =
  (pageNumber, category, keyword) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ALL_POSTS_REQUEST,
      });
      const { posterLogin } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${posterLogin?.posterInfo}`,
        },
      };

      const { data } = await axios.get(
        `${
          appData.serverUrl
        }/post/get-all-posts-every/?pageNumber=${pageNumber}&category=${
          category || ""
        }&keyword=${keyword || ""}`,
        config
      );

      dispatch({
        type: GET_ALL_POSTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_POSTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const approvePost = (postId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPROVE_POST_REQUEST,
    });
    const { posterLogin } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${posterLogin?.posterInfo}`,
      },
    };

    const { data } = await axios.put(
      `${appData.serverUrl}/post/approve-post/${postId}`,
      {},
      config
    );

    dispatch({
      type: APPROVE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPROVE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deletePost = (postId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_POST_REQUEST,
    });
    const { posterLogin } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${posterLogin?.posterInfo}`,
      },
    };

    const { data } = await axios.delete(
      `${appData.serverUrl}/post/delete-post/${postId}`,

      config
    );

    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPost =
  (coverImage, title, markdown, category, subTitle) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_POST_REQUEST,
      });
      const { posterLogin } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${posterLogin?.posterInfo}`,
        },
      };

      const fData = new FormData();

      fData.append("coverImage", coverImage);
      fData.append("title", title);
      fData.append("subTitle", subTitle);
      fData.append("markdown", markdown);
      fData.append("category", category);

      const { data } = await axios.post(
        `${appData.serverUrl}/post/create-post`,
        fData,
        config
      );

      dispatch({
        type: CREATE_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_POST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editPost =
  (coverImage, title, markdown, category, subTitle, postId) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_POST_REQUEST,
      });
      const { posterLogin } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${posterLogin?.posterInfo}`,
        },
      };

      const { data } = await axios.put(
        `${appData.serverUrl}/post/update-post/${postId}`,
        { coverImage, title, markdown, category, subTitle },
        config
      );

      dispatch({
        type: EDIT_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_POST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getPost = (slug) => async (dispatch) => {
  try {
    dispatch({
      type: GET_POST_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${appData.serverUrl}/post/get-single-post/${slug}`,

      config
    );

    dispatch({
      type: GET_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
