import { useEffect, useState } from 'react'
import PostItem from '../components/PostItem.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { getAuthorPost } from '../slices/postSlice.js'
import { useParams } from 'react-router-dom'

function AuthorPost() {
  const {id} = useParams();  
  const dispatch = useDispatch();

  const {authorPost, isLoading} = useSelector(state => state.posts)
  const [authorPosts, setAuthorPosts] = useState([])
  
  useEffect(() => {
    if (id) {
      dispatch(getAuthorPost(id))
    }
  }, [id, dispatch])
  
  useEffect(() => {
    if (authorPost && authorPost?.creator !== id) {
      setAuthorPosts(authorPost)
    }
  }, [authorPost, id]);

  if (isLoading) {
    return (
      <section className="h-screen w-screen flex justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
      </section>
    )
  }
  
  return (
    <section>
      {authorPosts?.length > 0 ?  <div className=" text-white p-3 m-3 flex flex-wrap justify-evenly">
      {authorPosts?.map(
        ({_id: id, thumbnail, category, title, description, creator, createdAt }) => (
          <PostItem
          key={id}
          postId={id}
          thumbnail={thumbnail}
          category={category}
          title={title}
          description={description}
          creator={creator}
          
          createdAt={createdAt}
          />
        )
      )}
    </div> : <h2 className=" text-center p-6 md text-[2rem] mb-[3rem] pt-10">No Authors/User Post Found.</h2> }
    </section>
  );
}

export default AuthorPost