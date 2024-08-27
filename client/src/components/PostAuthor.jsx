import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { getPostAuthor } from '../slices/postSlice'
import { useEffect, useState } from 'react';
import dumyImg from '../../public/dumyImg/authors.png'

function PostAuthor({creator, createdAt}) {
  const [isPostAuthor, setIsPostAuthor] = useState([])
  
  const dispatch = useDispatch();
  const {postAuthor, isLoading} = useSelector((state) => state.posts)
  
  useEffect(() => {
    if (!postAuthor) {
    dispatch(getPostAuthor(creator))
    }
  }, [creator, dispatch, postAuthor])
  
  
  useEffect(() => {
    if ( postAuthor && postAuthor?._id === creator) {
      setIsPostAuthor(postAuthor)
    }
  }, [postAuthor, creator])

  function TimeAgo(date){
    const now = new Date();
    const created = new Date(date)
    const diffInSeconds = Math.floor((now - created) / 1000)
    const minutes = Math.floor(diffInSeconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`
    }else if (hours > 0){
      return `${hours} hous${hours > 1 ? 's' : ''} ago`
    }else if(minutes > 0){
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    }
  }
// console.log("postAuthor", postAuthor?._id);
// console.log("creator", creator);

  if (isLoading) {
    return (
      <section className="h-screen w-screen flex justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
      </section>
    )
  }

  return (
      <Link to={`/posts/users/${creator}`} className="flex mt-3">
        <div className="content-center w-6 pr-2">
          {isPostAuthor?.avatar && <img className="object-cover rounded-md  w-fit" src={isPostAuthor?.avatar || dumyImg } alt="" />}
        </div>
        <div className="leading-3 mt-2 pl-2">
          {isPostAuthor?.fullName && <h5 className="text-xs">By : {isPostAuthor?.fullName} </h5>}
          <small className="text-gray-400 text-xs">
            {TimeAgo(createdAt)}
          </small>
        </div>
      </Link>
  )
}

export default PostAuthor