import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import {changeAvatarFile} from "../slices/postSlice.js"
import dumy from "../../public/dumyImg/authors.png"
import { useDispatch, useSelector } from "react-redux";
import { getAuthor } from "../slices/postSlice.js";
import {updateAuthorAccount} from '../slices/postSlice.js'

function UserProfile() {
  const [avatar, setAvatar] = useState("");
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  
  const {getAuthorProfile, changeAvatar, updateProfile, isLoading,  error} = useSelector(state => state.posts);
  const [localAuthorProfile, setLocalAuthorProfile] = useState('')
  const [localUpdateProfile, setLocalUpdateProfile] = useState('')
  const [isTuch, setIsTuch] = useState(false);
  const dispatch = useDispatch();
  const id = useParams();
  const userId = id?.id;

  const {loginUser} = useSelector(state => state.auth)
  const userToken = loginUser?.message?.accessToken;
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!userToken) {
      navigate('/login')
    }
  })

 
  // get user/author profile
  useEffect(() => {
  if(localAuthorProfile?.avatar) {
    setAvatar(localAuthorProfile?.avatar)
  }
  }, [localAuthorProfile])

  useEffect(() => {
    if (getAuthorProfile) {
      setLocalAuthorProfile(getAuthorProfile)
    }
  }, [getAuthorProfile])

  useEffect(() => {
    if (!getAuthorProfile) {
      dispatch(getAuthor(userId))
    } else {
      setFormData({
        fullName: localAuthorProfile?.fullName || '',
        email: localAuthorProfile?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    }
  },[dispatch, localAuthorProfile])
  
// change avatar 
const handleChangeAvatar = (e) => {
  e.preventDefault();
  setIsTuch(false);

  const formData = new FormData();
  formData.append('avatar', avatar);

  dispatch(changeAvatarFile(formData, userToken))
  setAvatar('')
  
}

useEffect(() => {
  if (changeAvatar) {
    setAvatar(changeAvatar?.avatar)
  }
}, [changeAvatar])

// update user profile
const updateAuthorDetailsHandle  = (e) => {
  e.preventDefault();

  dispatch(updateAuthorAccount(formData))
}

useEffect(() => {
  if (localUpdateProfile?._id) {
    navigate('/logout')
  }
}, [localUpdateProfile, navigate])

useEffect(() => {
  if (updateProfile) {
    setLocalUpdateProfile(updateProfile)
  }
}, [updateProfile])

const inputChangeHandler = (e) => {
  setFormData({...formData, [e.target.name]: e.target.value})
}

if (isLoading) {
  return (
    <section className="h-screen flex justify-center items-center">
        <h1 className="text-3xl">Loading...</h1>
    </section>
  )
}
  
  return (
    <section className="">
      <div className=" text-center md:mt-12 mt-3 ">
        <Link
          to={`/myPost/${userId}`}
          className="bg-gray-100 p-2 font-serif rounded-md hover:bg-slate-300 text-sm"
        >
          My posts
        </Link>

        <div>
          <div className="">
            <div className="flex justify-center mt-7">
              <img
                src={avatar || dumy}
                alt="not avatar"
                className="rounded-full border-4 size-36 md:size-48 border-gray-100"
              />
            </div>
            {/* Form to update Avatar */}
            <form>
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="png, jpg, jpeg"
                className="hidden"
                onChange={e => setAvatar(e.target.files[0])}
              />
              <label htmlFor="avatar"
              className={`flex justify-center items-center cursor-pointer ml-24 relative bottom-10 text-[25px] md:bottom-14 md:ml-36  ${isTuch ? 'hidden' : ''}`} 
               onClick={() => setIsTuch(true)}>
                <CiEdit />
              </label>
            </form>
            {isTuch && <button 
            className={`ml-28 relative bottom-10 text-[25px] md:bottom-14 md:ml-36`}
            onClick={handleChangeAvatar}>
              <FaCheckCircle />
            </button>}
          </div>

          <h1 className="relative bottom-3 font-bold"> {loginUser?.message?.user?.fullName}</h1>

          {/* form to update user details */}
          <form className="flex flex-col m-9 md:mx-52" onSubmit={updateAuthorDetailsHandle}>
          {error && <p className="bg-red-500 rounded mb-3 text-[15px] p-1 sm:text-xs text-white">{error}</p>}
            <input type="text" value={formData?.fullName} placeholder="Full Name" onChange={inputChangeHandler} 
            className="p-2 mb-2 rounded-lg outline-none" name="fullName"
            />
            <input type="text" value={formData?.email} placeholder="Email" onChange={inputChangeHandler} 
            className="p-2 mb-2 rounded-lg outline-none" name="email"
            />
            <input type="text" value={formData?.currentPassword} placeholder="Current Password" onChange={inputChangeHandler} 
            className="p-2 mb-2 rounded-lg outline-none" name="currentPassword"
            />
            <input type="text" value={formData?.newPassword} placeholder="New Password" onChange={inputChangeHandler} 
            className="p-2 mb-2 rounded-lg outline-none" name="newPassword"
            />
            <input type="text" value={formData?.confirmPassword} placeholder="Confirm Password" onChange={inputChangeHandler} 
            className="p-2 mb-2 rounded-lg outline-none" name="confirmPassword"
            />
            <button className="bg-purple-700 rounded-md text-[17px] text-white text-center w-fit p-2 hover:bg-purple-800">Update details</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
