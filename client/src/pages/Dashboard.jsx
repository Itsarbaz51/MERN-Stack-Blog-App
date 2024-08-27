import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import DeletePost from '../pages/DeletePost'
import { getAuthorPost } from '../slices/postSlice.js'

function Dashboard() {
  const [localAuthorPosts, setLocalAuthorPosts] = useState('')
  const {loginUser} = useSelector(state => state.auth) 
  
  const userId = useParams()
  const id = userId?.id
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {authorPost, isLoading} = useSelector(state => state.posts);
  
  const userToken = loginUser?.message?.accessToken;
  useEffect(() => {
    if (!userToken) {
      navigate('/login')
    }
  });
  
  useEffect(() => {
    if (id) {
      dispatch(getAuthorPost(id))
    }
  }, [dispatch, id]);
  

  useEffect(() => {
    setLocalAuthorPosts(authorPost)
  }, [authorPost])
  

  if (isLoading) {
    return (
      <section className="h-screen flex justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
      </section>
    )
  }

  return (
    <section>
      {
        localAuthorPosts?.length ? <div className='md:m-24'>
          {
            localAuthorPosts?.map(post => {
              return <article key={post.id} className='flex justify-between items-center bg-slate-50 p-2 m-5 text-xs md:text-lg rounded-lg'>
                <div className=' flex p-2'>
                  <div className='w-[80px]'>
                    <img src={post?.thumbnail} alt="not" className=' object-cover w-screen rounded-md '/>
                  </div>
                  <h5 className='p-1 font-bold'>{post?.title.length > 15 ? post?.title.slice(0, 15) + '...' : post.title}</h5>
                </div>
                <div className=' m-2'>
                  <Link to={`/post/${post?._id}`} className='bg-slate-100 p-1 rounded mr-2 hover:bg-gray-950 hover:text-white md:text-xs' >View</Link>
                  <Link to={`/post/${post?._id}/edit`} className="bg-purple-700 rounded mr-2 text-[17px] p-1 text-white text-center hover:bg-purple-800">Edit</Link>
                  <DeletePost postId={post?._id} />
                </div>
              </article>
            })
          }
        </div> : <h2 className=" text-center p-6 md text-[2rem] mb-[3rem] pt-10">You have no posts</h2> 
      }
    </section>
  )
}

export default Dashboard;