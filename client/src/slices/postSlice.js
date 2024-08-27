import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../constants";

const initialState = {
  allPost: [],
  postAuthor: null, 
  // localStorage.getItem('postAuthor') ? JSON.parse(localStorage.getItem('postAuthor')) : null,
  userPostDetail: null,
  authorPost: [],
  // localStorage.getItem('authorPosts') ? JSON.parse(localStorage.getItem('authorPosts')) : null,
  categoriersPosts: [],
  allAuthors: [],
  createPostData: null,
  postUpdated: null,
  deletePostByUser: null,
  getAuthorProfile: null,
  changeAvatar: null,
  updateProfile: null,
  isLoading: false,
  error: null,
};

const postReducers = createSlice({
  name: "posts",
  initialState,
  reducers: {

    // get all Post
    getAllPostsRequiest: (state) => {
      state.isLoading = true
      state.error = null
    },
    getAllPostsSuccess: (state, action) => {
      state.isLoading = false
      state.allPost = action.payload
    },
    getAllPostsFail: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    // get post author
    getPostAuthorRequiest: (state) => {
      state.isLoading = true
      state.error = null
    },
    getPostAuthorSuccess: (state, action) => {
      state.isLoading = false
      state.postAuthor = action.payload
      // localStorage.setItem('postAuthor', JSON.stringify(action.payload))
    },
    getPostAuthorFail: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    // get post details
    getPostDetailsRequiest: (state) => {
      state.isLoading = true
      state.error = null
    },
    getPostDetailsSuccess: (state, action) => {
      state.isLoading = false
      state.userPostDetail = action.payload
    },
    getPostDetailsFail: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    // get auhtor posts
    getAuthorPostsRequiest: (state) => {
      state.isLoading = true
      state.error = null
    },
    getAuthorPostsSuccess: (state, action) => {
      state.isLoading = false
      state.authorPost = action.payload
      // localStorage.setItem('authorPosts', JSON.stringify(action.payload))
    },
    getAuthorPostsFail: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    // get category posts
    getCategoryPostsRequiest: (state) => {
      state.isLoading = true
      state.error = null
    },
    getCategoryPostsSuccess: (state, action) => {
      state.isLoading = false
      state.categoriersPosts = action.payload
    },
    getCategoryPostsFail: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    // fetch all authors
    getAllAuthorsRequies: (state) => {
      state.isLoading = true
      state.error = null;
    },
    getAllAuthorsSuccess: (state, action) => {
      state.isLoading = false
      state.allAuthors = action.payload
    },
    getAllAuthorsFail: (state, action) => {
      state.isLoading = false 
      state.error = action.payload
    },
    // fetch create post
    sendCreatePostRequies: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    sendCreatePostSuccess: (state, action) => {
      state.isLoading = false;
      state.createPostData = action.payload;
    },
    sendCreatePostFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Post update
    postUpdateRequies: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    postUpdateSuccess: (state, action) => {
      state.isLoading = false;
      state.postUpdated = action.payload;
    },
    postUpdateFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // delete post
    deletePostRequiest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deletePostSuccess: (state, action) => {
      state.isLoading = false
      state.deletePostByUser = action.payload
    },
    deletePostFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // get auhtor/user account details
    getAuthorAccountRequiest: (state) => {
      state.isLoading = true
      state.error = null
    },
    getAuthorAccountSuccess: (state, action) => {
      state.isLoading = false;
      state.getAuthorProfile = action.payload;
    },
    getAuhtorAccountFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // change author avatar
    changeAvatarRequiest: (state) => {
      state.isLoading = true
      state.error = null;
    },
    changeAvatarSuccess: (state, action) => {
      state.isLoading = false;
      state.changeAvatar = action.payload;
    },
    changeAvatarFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // fetch update profile
    updateAuthorProfileRequiest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateAuthorProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.updateProfile = action.payload;
    },
    updateAuthorProfileFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const {
  getAllPostsRequiest,
  getAllPostsSuccess,
  getAllPostsFail,

  getPostAuthorRequiest,
  getPostAuthorSuccess,
  getPostAuthorFail,

  getPostDetailsRequiest,
  getPostDetailsSuccess,
  getPostDetailsFail,

  getAuthorPostsRequiest,
  getAuthorPostsSuccess,
  getAuthorPostsFail,

  getCategoryPostsRequiest,
  getCategoryPostsSuccess,
  getCategoryPostsFail,

  getAllAuthorsRequies,
  getAllAuthorsSuccess,
  getAllAuthorsFail,

  sendCreatePostRequies,
  sendCreatePostSuccess,
  sendCreatePostFail,

  postUpdateRequies,
  postUpdateSuccess,
  postUpdateFail,

  deletePostRequiest,
  deletePostSuccess,
  deletePostFail,

  getAuthorAccountRequiest,
  getAuthorAccountSuccess,
  getAuhtorAccountFail,

  changeAvatarRequiest,
  changeAvatarSuccess,
  changeAvatarFail,

  updateAuthorProfileRequiest,
  updateAuthorProfileSuccess,
  updateAuthorProfileFail,
} = postReducers.actions;

export default postReducers.reducer;

// Error handling
function parserHtmlError(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const errorElement = doc.querySelector("pre") || doc.querySelector("body");
  return errorElement ? errorElement.textContent : "An error Accurred.";
}

// fetch all posts
export const getAllPosts = () => async (dispatch) => {
  dispatch(getAllPostsRequiest());
  try {
    const response = await axios.get(`${baseURL}/posts`);
    dispatch(getAllPostsSuccess(response?.data?.message));
  } catch (err) {
    if (err.response && err.response.data) {
      const htmlError = err.response.data;
      const errorMessage = parserHtmlError(htmlError);
      dispatch(getAllPostsFail(errorMessage));
    }
  }
};

// fetch post author
export const getPostAuthor = (creator) => async (dispatch) => {
  dispatch(getPostAuthorRequiest());
  try {
    const response = await axios.get(`${baseURL}/users/${creator}`);
    dispatch(getPostAuthorSuccess(response?.data?.message));
  } catch (err) {
    if (err.response && err.response.data) {
      const htmlError = err.response.data;
      const errorMessage = parserHtmlError(htmlError);
      dispatch(getPostAuthorFail(errorMessage));
    }
  }
};

// fetch post details
export const getPostDetails = (id) => async (dispatch) => {
  dispatch(getPostDetailsRequiest());
  try {
    const response = await axios.get(`${baseURL}/posts/${id}`);
    dispatch(getPostDetailsSuccess(response.data.message));
  } catch (err) {
    if (err.response && err.response.data) {
      const htmlError = err.response.data;
      const errorMessage = parserHtmlError(htmlError);
      dispatch(getPostDetailsFail(errorMessage));
    }
  }
};

// fetch user/author posts
export const getAuthorPost = (id) => async (dispatch) => {
  dispatch(getAuthorPostsRequiest());
  try {
    const response = await axios.get(`${baseURL}/posts/user/${id}`,);
    dispatch(getAuthorPostsSuccess(response?.data?.message));
  } catch (err) {
    if (err.response && err.response.data) {
      const htmlError = err.response.data;
      const errorMessage = parserHtmlError(htmlError);
      dispatch(getAuthorPostsFail(errorMessage));
    }
  }
};

// fetch category post
export const getCategoryPosts = (category) => async (dispatch) => {
  dispatch(getCategoryPostsRequiest());
  try {
    const response = await axios.get(`${baseURL}/posts/categories/${category}`);
    dispatch(getCategoryPostsSuccess(response.data.message));
  } catch (err) {
    const htmlError = err.response.data;
    const errorMessage = parserHtmlError(htmlError);
    dispatch(getCategoryPostsFail(errorMessage));
  }
};

// fetch all authors
export const getAllAuthors = () => async (dispatch) => {
  dispatch(getAllAuthorsRequies());
  try {
    const response = await axios.get(`${baseURL}/users/`);
    dispatch(getAllAuthorsSuccess(response.data.message));
  } catch (err) {
    const htmlError = err.response.data;
    const errorMessage = parserHtmlError(htmlError);
    dispatch(getAllAuthorsFail(errorMessage));
  }
};

// create post
export const postCreatePost = (postData, userToken) => async (dispatch) => {
  dispatch(sendCreatePostRequies());
  try {
    const response = await axios.post(`${baseURL}/posts/createPost`, postData, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${userToken}` },
    });
    dispatch(sendCreatePostSuccess(response?.data));
  } catch (err) {
    const htmlError = err.response.data;
    const errorMessage = parserHtmlError(htmlError);
    dispatch(sendCreatePostFail(errorMessage));
  }
};

// export update post
export const updatePostUser = (id, postData, userToken) => async (dispatch) => {
  dispatch(postUpdateRequies());
  console.log(id, postData, userToken);
  try {
    const response = await axios.patch(`${baseURL}/posts/${id}`, postData, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${userToken}` },
    });
    dispatch(postUpdateSuccess(response?.data));
  } catch (err) {
    const htmlError = err.response.data;
    const errorMessage = parserHtmlError(htmlError);
    dispatch(postUpdateFail(errorMessage));
  }
};

// delete post by user
export const deletePostUser = (id, userToken) => async (dispatch) => {
  dispatch(deletePostRequiest());
  try {
    const response = await axios.delete(`${baseURL}/posts/${id}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${userToken}` },
    });
    dispatch(deletePostSuccess(response.data));
  } catch (err) {
    if (err.response && err.response.data) {
      const htmlError = err.response.data;
      const errorMessage = parserHtmlError(htmlError);
      dispatch(deletePostFail(errorMessage));
    }
  }
};

// get author/user account
export const getAuthor = (id) => async (dispatch) => {
  dispatch(getAuthorAccountRequiest());
  try {
    const response = await axios.get(`${baseURL}/users/${id}`);
    dispatch(getAuthorAccountSuccess(response.data.message));
  } catch (err) {
    if (err.response && err.response.data) {
      const htmlError = err.response.data;
      const errorMessage = parserHtmlError(htmlError);
      dispatch(getAuhtorAccountFail(errorMessage));
    }
  }
};

// send post avtar file
export const changeAvatarFile = (formData, userToken) => async (dispatch) => {
    dispatch(changeAvatarRequiest());
    try {
      const response = await axios.patch(
        `${baseURL}/users/changeAvatar`,
        formData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      console.log(response);
      
      dispatch(changeAvatarSuccess(response.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
        const htmlError = err.response.data;
        const errorMessage = parserHtmlError(htmlError);
        dispatch(changeAvatarFail(errorMessage));
      }
    }
  };

// edit author/user account
export const updateAuthorAccount = (formData) => async (dispatch) => {
    dispatch(updateAuthorProfileFail());
    // console.log("authorData", data);
    
    try {
      const response = await axios.patch(
        `${baseURL}/users/edit-user`,
        formData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem('loginUser') && JSON.parse(localStorage.getItem('loginUser')).message.accessToken}` },
        }
      );
      dispatch(updateAuthorProfileSuccess(response.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
        const htmlError = err.response.data;
        const errorMessage = parserHtmlError(htmlError);
        dispatch(updateAuthorProfileFail(errorMessage));
      }
    }
  };
