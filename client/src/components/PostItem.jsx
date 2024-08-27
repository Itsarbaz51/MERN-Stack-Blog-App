import {Link} from 'react-router-dom'
import PostAuthor from './PostAuthor.jsx'

function PostItem({postId, category, title, description, thumbnail, creator, createdAt}) {
  const shortdescription = description.length > 145 ? description.slice(0, 145) + '...' : description;
  const shortTitle = title.length > 7 ? title.slice(0, 15) + '...' : title;
  return (
    // h-[450px] w-[350px]
    <article className='bg-white text-black p-5 m-4 h-fit w-[350px] rounded-2xl hover:shadow-2xl transition duration-700 ease-in-out hover:scale-105 '>
        <div>
            <img className=' w-full h-full object-cover rounded-lg hover:scale-95 duration-500' src={thumbnail} alt={title} />
        </div> 
        <div className='p-2'>
            <Link to={`/post/${postId}`}>
            <h3 className='text-xl font-bold'>{shortTitle}</h3>
            </Link>
            <p className='text-[10px] text-gray-500' dangerouslySetInnerHTML={{__html: shortdescription}}></p>
            <div className='flex justify-between '>
              <PostAuthor creator={creator} createdAt={createdAt}/>
              <Link to={`/posts/categories/${category}`} className='transition duration-700 ease-in-out hover:bg-black hover:text-white text-black px-1 p-1 mt-6 mb-2 rounded-md text-sm'>{category}</Link>
            </div>
        </div>
    </article>
  )
}

export default PostItem