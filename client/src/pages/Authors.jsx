import { useEffect, useState } from 'react'
import {Link } from 'react-router-dom'
import { useDispatch, useSelector } from'react-redux'
import { getAllAuthors } from '../slices/postSlice'
import dumyAuthors from '../../public/dumyImg/authors.png'


function Authors() {
  const dispatch = useDispatch();
  const [localAllAuthors, setLocalAllAuthors] = useState([])
  const { allAuthors, isLoading } = useSelector(state => state.posts)
  
  useEffect(() => {
    if (allAuthors) {
    dispatch(getAllAuthors())
    }
  }, [dispatch])

  useEffect(() => {
    if (allAuthors) {
      setLocalAllAuthors(allAuthors)
    }
  }, [allAuthors])


  if (isLoading) {
    return (
      <section className="h-screen w-screen flex justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
      </section>
    )
  }

  return (
    <section className='bg-gray-200'>
      { localAllAuthors.length > 0 ? <div className='flex flex-wrap justify-evenly'>
        {
          localAllAuthors?.map(({_id: id, avatar, fullName, post}) => (
            <Link key={id} to={`/posts/users/${id}`} className='flex justify-between bg-white px-5 py-1 m-3 rounded-xl' >
              <div className=' p-1 relative right-3'>
                <img src={avatar || dumyAuthors} alt={`Image of not.`} className=' rounded-full size-8' />
              </div>
              <div className='text-sm'>
                <h4 className='font-bold' >{fullName}</h4>
                <p className='text-gray-500 text-[16px]'>{post}</p>
              </div>
            </Link>
          ))
        }
      </div> : <h2 className=" text-center p-6 md text-[2rem] mb-[3rem] pt-10">No Authors/user found.</h2> }
    </section>
  )
}

export default Authors