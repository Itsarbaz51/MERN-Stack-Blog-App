import React, { useState } from "react";
import {Link} from 'react-router-dom'

function Register() {
  const [userData, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
        <form className="flex flex-col p-2">
          <p className="bg-red-500 rounded mb-3 text-[15px] p-1 sm:text-xs text-white">This is error Message</p>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={userData.name}
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
          className="bg-purple-700 rounded-md text-[17px] text-white text-center w-fit p-2 hover:bg-purple-800">Register</button>
        </form>
        <small className="text-[15px] text-gray-500 flex justify-center">Already have an account? <Link to='/login' className="text-blue-800 ml-1"> sign in</Link></small>
      </div>
    </section>
  );
}

export default Register;
