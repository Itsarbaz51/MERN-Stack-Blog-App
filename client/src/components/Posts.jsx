import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import {useDispatch, useSelector} from "react-redux" 
import { getAllPosts } from "../slices/postSlice";

function Posts() {
  const [posts, setPosts] = useState([]);
  const {allPost, isLoading} = useSelector(state => state.posts)
  // console.log(allPost);


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])
  
  useEffect(() => {
    setPosts(allPost ? allPost : []);
  }, [allPost])

  if (isLoading) {
    return (
      <section className="h-screen flex justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
      </section>
    )
  }
  
  return (
    <section>
      {posts?.length > 0 ?  <div className=" text-white bg-slate-200 p-3 flex flex-wrap justify-evenly">
      {posts?.map(
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
    </div> : <h2 className=" text-center p-6 md text-[2rem] mb-[3rem] pt-10">No All Post Founds.</h2> }
    </section>
  );
}

export default Posts;
