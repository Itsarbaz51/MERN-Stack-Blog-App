import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"
import {baseURL} from "../constants"

const initialState = {
    allPost: [],
    postAuthor: null,
    userPostDetail: null,
    authorPost: [],
    categoriersPosts: [],
    allAuthors: [],
    createPostData: null,
    isLoading: false,
    error: null
}

const postReducers = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // get all Post
        getAllPostsRequiest: (state) => {
            state.isLoading = true,
            state.error = null
        },
        getAllPostsSuccess: (state, action) => {
            state.isLoading = false,
            state.allPost = action.payload
        },
        getAllPostsFail: (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        },

        // get post author
        getPostAuthorRequiest: (state) => {
            state.isLoading = true,
            state.error = null
        },
        getPostAuthorSuccess: (state, action) => {
            state.isLoading = false,
            state.postAuthor = action.payload
        },
        getPostAuthorFail: (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        },

        // get post details
        getPostDetailsRequiest: (state) => {
            state.isLoading = true,
            state.error = null
        },
        getPostDetailsSuccess: (state, action) => {
            state.isLoading = false,
            state.userPostDetail = action.payload
            // localStorage.setItem('userPostDetail', JSON.stringify(action.payload))
        },
        getPostDetailsFail: (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        },

        // get auhtor posts
        getAuthorPostsRequiest: (state) => {
            state.isLoading = true,
            state.error = null
        },
        getAuthorPostsSuccess: (state, action) => {
            state.isLoading = false,
            state.authorPost = action.payload
        },
        getAuthorPostsFail: (state, action) => {
            state.isLoading = false,
            state.error = action.payload;
        },

        // get category posts
        getCategoryPostsRequiest: (state) => {
            state.isLoading = true,
            state.error = null
        },
        getCategoryPostsSuccess: (state, action) => {
            state.isLoading = false,
            state.categoriersPosts = action.payload
        },
        getCategoryPostsFail: (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        },

        // fetch all authors
        getAllAuthorsRequies: (state) => {
            state.isLoading = true,
            state.error = null
        },
        getAllAuthorsSuccess: (state, action) => {
            state.isLoading = false,
            state.allAuthors = action.payload
        },
        getAllAuthorsFail: (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        },
        sendCreatePostRequies : (state) => {
            state.isLoading = true
            state.error = null 
        },
        sendCreatePostSuccess: (state, action) => {
            state.isLoading = false
            state.createPostData = action.payload
        },
        sendCreatePostFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        // delete post
        deletePostRequiest: (state) => {
            state.isLoading = true
            state.error = null
        },
        deletePostSuccess: (state, action) => {
            state.isLoading = false,
            state.allPost = state.allPost.filter((post) => post._id !== action.payload._id)
        },
        deletePostFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})
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

    deletePostRequiest,
    deletePostSuccess,
    deletePostFail

} = postReducers.actions

export default postReducers.reducer

// Error handling
function parserHtmlError(html){
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const errorElement = doc.querySelector('pre') || doc.querySelector('body');
    return errorElement ? errorElement.textContent : 'An error Accurred.';
}

// fetch all posts
export const getAllPosts = () => 
    async (dispatch) =>{
        dispatch(getAllPostsRequiest())
        try {
            const response = await axios.get(`${baseURL}/posts`)
            // console.log("response", response?.data?.message);
            dispatch(getAllPostsSuccess(response?.data?.message))
        } catch (err) {
            // console.log("err", err);
            dispatch(getAllPostsFail(err?.response))
        }
    }

// fetch post author
export const getPostAuthor = (creator) => 
    async (dispatch) =>{
        dispatch(getPostAuthorRequiest())
        try {
            const response = await axios.get(`${baseURL}/users/${creator}`)
            // console.log("response", response);
            dispatch(getPostAuthorSuccess(response?.data?.message))
        } catch (err) {
            // console.log("err", err);
            dispatch(getPostAuthorFail(err?.response))
        }
    }

// fetch post details
export const getPostDetails = (id) =>
    async (dispatch) => {
        dispatch(getPostDetailsRequiest())
        try {
            const response = await axios.get(`${baseURL}/posts/${id}`)
            // console.log("response", response.data);
            dispatch(getPostDetailsSuccess(response.data.message))
        } catch (err) {
            // console.log("err", err);
            dispatch(getPostDetailsFail(err.message))
        }
    }

// fetch author posts
export const getAuthorPost = (id) => 
    async(dispatch) => {
        dispatch(getAuthorPostsRequiest())
        try {
            const response = await axios.get(`${baseURL}/posts/user/${id}`)
            // console.log("response", response);
            dispatch(getAuthorPostsSuccess(response?.data?.message))
        } catch (err) {
            console.log(err);
            dispatch(getAuthorPostsFail(err.message))
        }
    }


// fetch category post
export const getCategoryPosts = (category) => 
    async (dispatch) => {
        dispatch(getCategoryPostsRequiest())
    try {
        const response = await axios.get(`${baseURL}/posts/categories/${category}`)
        // console.log("response", response);
        dispatch(getCategoryPostsSuccess(response.data.message))
    } catch (err) {
        // console.log('err', err);
        dispatch(getCategoryPostsFail(err?.message))
    }
    }

// fetch all authors
export const getAllAuthors = () => 
    async (dispatch) => {
        dispatch(getAllAuthorsRequies())
        try {
            const response = await axios.get(`${baseURL}/users/`)
            // console.log("response", response);
            dispatch(getAllAuthorsSuccess(response.data.message))
        } catch (err) {
            // console.log('err', err);
            dispatch(getAllAuthorsFail(err?.message))
        }
    }

// create post 
export const postCreatePost = (postData, userToken) => 
    async (dispatch ) => {
        dispatch(sendCreatePostRequies())
        try {
            const response = await axios.post(`${baseURL}/posts/createPost`,postData,{withCredentials: true, headers: {Authorization: `Bearer ${userToken}`}})
            console.log("response", response);
            dispatch(sendCreatePostSuccess(response?.data))
        } catch (err) {
            // console.log("err", err);
            dispatch(sendCreatePostFail(err?.response?.data))
        }
    }

// export update post
export const update = () => async (dispatch) => {

}

// delete post 
export const deletePostUser = (id) => 
    async (dispatch) => {
        dispatch(deletePostRequiest())
        try {
            const response = await axios.delete(`${baseURL}/posts/${id}`)
            // console.log("response", response);
            dispatch(deletePostSuccess(response))
        } catch (err) {
            // console.log("err", err);
            if(err.response && err.response.data) {
                const htmlError = err.response.data;
                const errorMessage = parserHtmlError(htmlError)
                dispatch(deletePostFail(errorMessage))
            }
        }
    }