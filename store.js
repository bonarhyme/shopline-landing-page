import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  handleLikeReducer,
  getAllPostsReducer,
  approvePostReducer,
  deletePostReducer,
  createPostReducer,
  editPostReducer,
  getPostReducer,
} from "./reducers/post";

import {
  registerPosterReducer,
  loginPosterReducer,
  getPosterProfileReducer,
  updatePosterProfileReducer,
  getAllPostersReducer,
  approvePosterReducer,
  deletePosterReducer,
  posterUpdatePictureReducer,
} from "./reducers/poster";

const reducer = combineReducers({
  likeHandle: handleLikeReducer,
  posterRegister: registerPosterReducer,
  posterLogin: loginPosterReducer,
  posterProfileGet: getPosterProfileReducer,
  posterProfileUpdate: updatePosterProfileReducer,
  postersAllGet: getAllPostersReducer,
  posterApprove: approvePosterReducer,
  posterDelete: deletePosterReducer,
  posterPicture: posterUpdatePictureReducer,
  postsAllGet: getAllPostsReducer,
  postApprove: approvePostReducer,
  postDelete: deletePostReducer,
  postCreate: createPostReducer,
  postEdit: editPostReducer,
  postGet: getPostReducer,
});

let posterInfoFromStorage = null;

if (typeof window !== "undefined") {
  posterInfoFromStorage = sessionStorage.getItem("posterInfo")
    ? JSON.parse(sessionStorage.getItem("posterInfo"))
    : null;
}

const initialState = {
  posterLogin: {
    posterInfo: posterInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
