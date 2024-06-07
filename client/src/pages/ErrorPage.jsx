import React from 'react'
import {Link} from 'react-router-dom'

function ErrorPage() {
  return (
    <section className='flex justify-center text-center sm:text-2xl '>
      <div className='absolute top-[50%]'>
        <Link className='bg-slate-500 p-2 rounded text-white text-sm hover:bg-slate-600'>Go Back Home Page</Link>
        <h2 className='mt-3 font-bold'>Page Not Found</h2>
      </div>
    </section>
  )
}

export default ErrorPage