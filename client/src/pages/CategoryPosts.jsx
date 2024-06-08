import React, { useState } from 'react'
import { Dumy_Posts } from '../dumyPosts/data'
import PostItem from '../components/PostItem'

function CategoryPosts() {
  const [posts, setPosts] = useState(Dumy_Posts)
  return (
    <section>
      {posts.length > 0 ? <div className=" flex flex-wrap justify-center">
        {
          posts.map(({id, title, thumbnail, category, description, authorId}) => (
            <PostItem 
            key={id}
            postId={id}
            title={title}
            thumbnail={thumbnail}
            category={category}
            autherId={authorId}
            description={description} />
          ))
        }
      </div> : <h2 className=" text-center p-6 md text-[2rem] mb-[3rem] pt-10">No Post Founds</h2> }
    </section>
  )
}

export default CategoryPosts