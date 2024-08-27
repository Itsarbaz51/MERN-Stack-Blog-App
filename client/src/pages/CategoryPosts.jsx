import { useEffect, useState } from 'react'
import PostItem from '../components/PostItem.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { getCategoryPosts } from '../slices/postSlice.js'
import { useParams } from 'react-router-dom'

function CategoryPosts() {
  const [localCategoryPost, setLocalCategoryPost] = useState([])
  const {categoriersPosts, isLoading} = useSelector(state => state.posts)
  const {category} = useParams()
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (category) {
    dispatch(getCategoryPosts(category));
    }
  }, [dispatch, category]);

  useEffect(() => {
    if (categoriersPosts) {
      setLocalCategoryPost(categoriersPosts)
    }
  }, [categoriersPosts])
  
  
  if (isLoading) {
    return (
      <section className="h-screen w-screen flex justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
      </section>
    )
  }
  return (
    <section>
      {localCategoryPost?.length > 0 ?  <div className=" text-white p-3 m-3 flex flex-wrap justify-evenly">
      {localCategoryPost?.map(
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
    </div> : <h2 className=" text-center p-6 md text-[2rem] mb-[3rem] pt-10">No Category Posts Found.</h2> }
    </section>
  );
}

export default CategoryPosts