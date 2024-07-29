import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../slices/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const [userData, setUserdata] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const { registerUser, error} = useSelector(state => state.auth)
  const navigate = useNavigate();

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    dispatch(register(userData));
    setUserdata("");
  };
  
  
  useEffect(() => {
    registerUser?.message ? navigate('/login') : null
  });
  
  if (registerUser?.data) {
    alert("Register Success.");
  }
  const changeInputHandle = (e) => {
    setUserdata((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <section className="flex justify-center  bg-slate-300">
      <div className="bg-slate-100 rounded center md:w-[500px] my-44 p-4 h-fit min-w-fit ">
        <h1 className="font-bold ms-2 ">Sign Up</h1>
        <form className="flex flex-col p-2" onSubmit={handleSubmitRegister}>
          { error?.error &&
            <p className="bg-red-500 rounded mb-3 text-[15px] p-1 sm:text-xs text-white">
              {error?.error}
            </p>
          }
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={userData.fullName}
            onChange={changeInputHandle}
            className="p-2 mb-2 rounded-lg outline-none"
            
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandle}
            className="p-2 mb-2 rounded-lg outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandle}
            className="p-2 mb-2 rounded-lg outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={changeInputHandle}
            className="p-2 mb-2 rounded-lg outline-none"
          />
          <button
            type="submit"
            className="bg-purple-700 rounded-md text-[17px] text-white text-center w-fit p-2 hover:bg-purple-800"
          >
            Register
          </button>
        </form>
        <small className="text-[15px] text-gray-500 flex justify-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-800 ml-1">
            {" "}
            sign in
          </Link>
        </small>
      </div>
    </section>
  );
}

export default Register;
