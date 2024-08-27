import { useNavigate } from 'react-router-dom';
import {logout} from '../slices/authSlice'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';


function Logout() {
  
  const dispatch = useDispatch()
  const { loginUser, isLoading } = useSelector(state => state.auth)
  const accToken = loginUser?.message?.accessToken
  const userId = loginUser?.message?.user?._id
  const navigate = useNavigate()

  useEffect( () => {
      dispatch(logout(userId, accToken))
      !loginUser?.message ? navigate('/login') : null 
  }, [dispatch, navigate, userId, accToken, loginUser])

  if (isLoading) {
    return (
      <section className="h-screen w-screen flex justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
      </section>
    )
  }

  return (
    <>
    </>
  )
}

export default Logout