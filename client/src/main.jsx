import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout'
import ErrorPage from './pages/ErrorPage'
import Register from './pages/Register'
import Login from './pages/Login'
import Logout from './pages/Logout'
import CreatePost from './pages/CreatePost'
import CategoryPosts from './pages/CategoryPosts'
import AuthorPosts from './pages/AuthorPosts'
import Authors from './pages/Authors'
import Dashboard from './pages/Dashboard'
import DeletePost from './pages/DeletePost'
import Home from './pages/Home'
import EditPost from './pages/EditPost'
import PostDetails from './pages/PostDetails'
import UserProfile from './pages/UserProfile'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
    path='/'
    element={<Layout/>}
    errorElement={<ErrorPage />}>
      <Route index={true} element={<Home/>} />
      <Route path='register' element={<Register/>} />
      <Route path='login' element={<Login/>} />
      <Route path='logout' element={<Logout/>} />
      <Route path='myPost/:id' element={<Dashboard/>} />
      <Route path='post/:id/delete' element={<DeletePost/>} />
      <Route path='posts/users/:id' element={<AuthorPosts/>} />
      <Route path='authors' element={<Authors/>} />
      <Route path='posts/categories/:category' element={<CategoryPosts/>} />
      <Route path='post/:id/edit' element={<EditPost/>} />
      <Route path='post/:id' element={<PostDetails/>} />
      <Route path='create' element={<CreatePost/>} />
      <Route path='profile/:id' element={<UserProfile/>} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
 