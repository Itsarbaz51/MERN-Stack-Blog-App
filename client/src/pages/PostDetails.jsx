import PostAuthor from "../components/PostAuthor.jsx"
import { Link, useParams } from "react-router-dom";
import DeletePost from "./DeletePost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {getPostDetails} from '../slices/postSlice.js'


function PostDetails() {

  const {id} = useParams()  
  const dispatch = useDispatch()
  const [localUserPostDetails, setLocalLocalUserPostDetails] = useState('')
  const {loginUser} = useSelector(state => state?.auth)
  const {userPostDetail, isLoading} = useSelector(state => state?.posts)

  useEffect(() => {
    dispatch(getPostDetails(id));
  }, [id, dispatch])
  
  useEffect(() => {
      setLocalLocalUserPostDetails(userPostDetail);
  }, [userPostDetail])

  if (isLoading) {
    return (
      <section className="h-screen w-screen flex justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
      </section>
    )
  }

  return (
    <section>
      <div className="bg-slate-200 pl-7 pr-7 pb-4 m-6 text-xs rounded sm:ml-16 sm:mr-16 md:ml-32 md:mr-32">
        <div className="flex justify-between mb-3 text-black p-1 text-xs border-b-[1px] border-gray-950"> 
           <PostAuthor creator={localUserPostDetails?.creator} createdAt={localUserPostDetails?.createdAt}/>
          { loginUser?.message?.user?._id === localUserPostDetails?.creator && <div className="mt-[25px] text-[10px] md:text-xs">
            <Link to={`/post/${localUserPostDetails?._id}/edit`} className="bg-purple-600 px-2 py-1 text-gray-200 hover:bg-purple-700 rounded-md"
            >Edit</Link>
            <DeletePost postId={id}/>
          </div>}
        </div>
        <h1 className="mb-2 font-bold text-2xl">Title : {localUserPostDetails?.title}</h1>
        <div className="flex justify-center">
          <img src={localUserPostDetails?.thumbnail} alt="" className="mb-2" />
        </div>
        <p dangerouslySetInnerHTML={{__html: localUserPostDetails?.description}}></p>
        </div>
    </section>
  );
}

export default PostDetails;