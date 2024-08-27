import { configureStore, combineReducers} from "@reduxjs/toolkit";
// import {persistStore, persistReducer} from 'redux-persist'
// import storage from "redux-persist/lib/storage";


import authReducers from "../slices/authSlice.js";
import postReducers from "../slices/postSlice.js";

// const rootReducer = combineReducers({
//   auth: authReducers,
//   posts: postReducers,
// });

// const persistConfig = {
//   key: 'root',
//   storage
//   // whitelist: ['auth', 'posts']
// }

// const persistedReducer  = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  // reducer: persistedReducer,
  reducer: {
    auth: authReducers,
    posts: postReducers
  }
})

// export const persistor = persistStore(store)

