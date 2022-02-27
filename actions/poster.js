import {
  POSTER_REGISTER_REQUEST,
  POSTER_REGISTER_SUCCESS,
  POSTER_REGISTER_FAIL,
  POSTER_LOGIN_REQUEST,
  POSTER_LOGIN_SUCCESS,
  POSTER_LOGIN_FAIL,
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
  POSTER_UPDATE_PICTURE_SUCCESS,
  POSTER_UPDATE_PICTURE_FAIL,
  POSTER_UPDATE_PICTURE_REQUEST,
} from "../constants/poster";
import axios from "axios";
import { appData } from "../variables/data";

export const registerPoster =
  (name, email, username, password) => async (dispatch) => {
    try {
      dispatch({
        type: POSTER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${appData.serverUrl}/poster/register`,
        {
          name,
          email,
          username,
          password,
        },
        config
      );
      dispatch({
        type: POSTER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POSTER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const loginPoster = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: POSTER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${appData.serverUrl}/poster/login`,
      {
        username,
        password,
      },
      config
    );
    dispatch({
      type: POSTER_LOGIN_SUCCESS,
      payload: data,
    });

    if (typeof window !== "undefined") {
      sessionStorage.setItem("posterInfo", JSON.stringify(data.token));
    }
  } catch (error) {
    dispatch({
      type: POSTER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutPosterNow = () => (dispatch) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("posterInfo");
    localStorage.removeItem("post");
    document.location.href = "/";
  }
};

export const getPosterProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POSTER_PROFILE_REQUEST,
    });
    const { posterLogin } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${posterLogin?.posterInfo}`,
      },
    };
    const { data } = await axios.get(
      `${appData.serverUrl}/poster/get-poster-profile`,
      config
    );

    dispatch({
      type: POSTER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POSTER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePosterProfile =
  (email, name, picture) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTER_PROFILE_UPDATE_REQUEST,
      });
      const { posterLogin } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${posterLogin?.posterInfo}`,
        },
      };
      const { data } = await axios.put(
        `${appData.serverUrl}/poster/update-profile`,
        { email, name, picture },
        config
      );
      dispatch({
        type: POSTER_PROFILE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POSTER_PROFILE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });

      if (typeof window !== "undefined") {
        sessionStorage.removeItem("posterInfo");
        document.location.href = "/";
      }
    }
  };

export const getAllPosters = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_POSTERS_REQUEST,
    });
    const { posterLogin } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${posterLogin?.posterInfo}`,
      },
    };
    const { data } = await axios.get(
      `${appData.serverUrl}/poster/get-all-posters`,
      config
    );

    dispatch({
      type: GET_ALL_POSTERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_POSTERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const approvePoster = (path, posterId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPROVE_POSTER_REQUEST,
    });
    const { posterLogin } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${posterLogin?.posterInfo}`,
      },
    };
    const { data } = await axios.put(
      `${appData.serverUrl}/poster/approve-poster/${path}`,
      { posterId },
      config
    );

    dispatch({
      type: APPROVE_POSTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPROVE_POSTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deletePoster = (posterId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_POSTER_REQUEST,
    });
    const { posterLogin } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${posterLogin?.posterInfo}`,
      },
    };
    const { data } = await axios.delete(
      `${appData.serverUrl}/poster/delete-poster/${posterId}`,
      config
    );

    dispatch({
      type: DELETE_POSTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_POSTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Update poster PICTURE
export const updatePosterPicture = (image) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POSTER_UPDATE_PICTURE_REQUEST,
    });
    const {
      posterLogin: { posterInfo },
    } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: ` Bearer ${posterInfo.token}`,
      },
    };

    const fData = new FormData();

    fData.append("image", image);

    const { data } = await axios.put(
      `${appData.serverUrl}/poster/update-picture`,
      fData,
      config
    );
    dispatch({
      type: POSTER_UPDATE_PICTURE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POSTER_UPDATE_PICTURE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
