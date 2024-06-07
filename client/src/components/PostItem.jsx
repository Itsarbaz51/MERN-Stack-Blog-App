import React from 'react'
import {Link} from 'react-router-dom'
import AuthorPost from '../components/AuthorPost.jsx'

function PostItem({postId, category, title, description, thumbnail}) {
  const shortdescription = description.length > 145 ? description.substr(0, 145) + '...' : description;
  const shortTitle = title.length > 7 ? title.substr(0, 7) + '...' : title;

  return (
    <article className='bg-white text-black p-5 m-4 h-[450px] w-[350px] rounded-2xl hover:shadow-2xl  hover:scale-105 duration-300'>
        <div>
            <img className='object-cover w-screen rounded-lg hover:scale-95 duration-500' src={thumbnail} alt={title} />
        </div> 
        <div className='p-2'>
            <Link to={`/post/${postId}`}>
            <h3 className='text-xl font-bold'>{shortTitle}</h3>
            </Link>
            <p className='text-[10px] text-gray-500'>{shortdescription}</p>
            <div className='flex justify-between '>
              <AuthorPost/>
              <Link to={`/posts/categories/${category}`} className='bg-gray-200 hover:bg-gray-300 text-gray-400 p-1 mt-6 mb-2 rounded-md text-sm'>{category}</Link>
            </div>
        </div>
    </article>
  )
}

export default PostItem