import React, { useState } from 'react'
import {Link } from 'react-router-dom'
import Avatar1 from '../images/avatar1.jpg'
import Avatar2 from '../images/avatar2.jpg'
import Avatar3 from '../images/avatar3.jpg'
import Avatar4 from '../images/avatar4.jpg'
import Avatar5 from '../images/avatar5.jpg'

const authorsDumyData = [
  {id: 1, avatar: Avatar1, name: 'Arbaz', posts: 3},
  {id: 2, avatar: Avatar2, name: 'Sameer', posts: 2},
  {id: 3, avatar: Avatar3, name: 'Sohail', posts: 4},
  {id: 4, avatar: Avatar4, name: 'Taiyab', posts: 5},
  {id: 5, avatar: Avatar5, name: 'Akram', posts: 1},
]

function Authors() {
  const [authors, setAuthors] = useState(authorsDumyData)

  return (
    <section>
      { authors.length ? <div className='flex flex-wrap justify-evenly m-2 my-24'>
        {
          authors?.map(({id, avatar, name, posts}) => (
            <Link key={id} to={`posts/users/${id}`} className='flex justify-between bg-slate-50 px-5 py-1 m-3 rounded-xl' >
              <div className=' p-1 relative right-3'>
                <img src={avatar} alt={`Image of ${name}`} className=' rounded-full size-8' />
              </div>
              <div className='text-sm'>
                <h4 className='font-bold' >{name}</h4>
                <p className='text-gray-500 text-[16px]'>{posts}</p>
              </div>
            </Link>
          ))
        }
      </div> : <h2 className=" text-center p-6 md text-[2rem] mb-[3rem] pt-10">No Post Founds</h2> }
    </section>
  )
}

export default Authors