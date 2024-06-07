import { Link } from "react-router-dom"
import Avatar from '../images/avatar1.jpg'

function AuthorPost() {
  return (
      <Link>
      <div className="flex mt-3">
        <div className="content-center w-6 mr-2">
          <img className="object-cover rounded-md  w-screen " src={Avatar} alt="" />
        </div>
        <div className="leading-4 ">
          <h5 className="text-xs">By: Arbaz</h5>
          <small className="text-gray-400 text-xs">Just Now</small>
        </div>
      </div>
      </Link>
  )
}

export default AuthorPost