import { useState } from 'react'
import PostItem from '../components/PostItem.jsx'
import {Dumy_Posts} from '../dumyPosts/data.js'
function AuthorPost() {
  const [posts, setPosts] = useState(Dumy_Posts)
  return (
    <section>
      {posts.length > 0 ? <div className='flex flex-wrap justify-center'>
        {
          posts?.map(({id, thumbnail, category, title, description, autherId}) => (
            <PostItem key={id} postId={id} autherId={autherId} thumbnail={thumbnail} category={category} title={title} description={description}  />
          )) 
        }
      </div> : <h2 className=" text-center p-6 md text-[2rem] mb-[3rem] pt-10">No Post Founds</h2> }
    </section>
  )
}

export default AuthorPost