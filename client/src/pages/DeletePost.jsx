import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom";
import {deletePostUser} from "../slices/postSlice.js"

function DeletePost({postId: id}) {
  const {loginUser} = useSelector(state => state.auth)
  const userToken = loginUser?.message?.accessToken;
  const [localStoreDeletePostByUser, setLocalStoreDeletePostByUser] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate('/login')
    }
  });

  const removePost = () => {
    dispatch(deletePostUser(id, userToken))
  }

  useEffect(() => {
  //   if(id && userToken){
      removePost();
  //   }
  },[id, userToken])
  const {deletePostByUser, isLoading} = useSelector(state => state.posts);

  useEffect(() => {
    setLocalStoreDeletePostByUser(deletePostByUser)
  },[deletePostByUser]);


  useEffect(( ) => {
    if (localStoreDeletePostByUser?.statusCode == 200 || localStoreDeletePostByUser?.data === "Post delete successfully.") {
      navigate('/')
    }
  })

  if (isLoading) {
    return (
      <section className="h-screen w-screen flex justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
      </section>
    )
  }

  return (
    <Link onClick={removePost} className=" ml-4 bg-red-600 px-2 py-1 text-gray-200 hover:bg-red-700 rounded-md">Delete</Link>
  )
}

export default DeletePost