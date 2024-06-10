import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {Dumy_Posts} from '../dumyPosts/data'

function Dashboard() {
  const [posts, setPosts] = useState(Dumy_Posts || [])
  // const shortTitle = ;
  return (
    <section>
      {
        posts.length ? <div className='md:m-24'>
          {
            posts.map(post => {
              return <article key={post.id} className='flex justify-between items-center bg-slate-50 p-2 m-5 text-xs md:text-lg rounded-lg'>
                <div className=' flex p-2'>
                  <div className='w-[80px]'>
                    <img src={post.thumbnail} alt="not" className=' object-cover w-screen rounded-md '/>
                  </div>
                  <h5 className='p-1 font-bold'>{post?.title.length > 15 ? post.title.slice(0, 15) + '...' : post.title}</h5>
                </div>
                <div className=' m-2'>
                  <Link to={`/post/${post.id}`} className='bg-slate-100 p-1 rounded mr-2 hover:bg-gray-950 hover:text-white md:text-xs' >View</Link>
                  <Link to={`/post/${post.id}/edit`} className="bg-purple-700 rounded mr-2 text-[17px] p-1 text-white text-center hover:bg-purple-800">Edit</Link>
                  <Link to={`/post/${post.id}/delete`} className="bg-red-500 rounded text-[15px] p-1 sm:text-xs text-white" >delete</Link>
                </div>
              </article>
            })
          }
        </div> : <h2 className=" text-center p-6 md text-[2rem] mb-[3rem] pt-10">You have no posts</h2> 
      }
    </section>
  )
}

export default Dashboard