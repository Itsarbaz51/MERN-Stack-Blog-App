import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";

import Avatar from "../images/avatar15.jpg";

function UserProfile() {
  const [avatar, setAvatar] = useState(Avatar);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setCnfirmPassword] = useState("");

  return (
    <section className="">
      <div className=" text-center md:mt-12 mt-3 ">
        <Link
          to={`/myPost/arbaz`}
          className="bg-gray-100 p-2 font-serif rounded-md  hover:bg-slate-300 text-sm"
        >
          My posts
        </Link>

        <div>
          <div className="">
            <div className="flex justify-center mt-7">
              <img
                src={avatar}
                alt="not"
                className="rounded-full border-4 border-gray-100"
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
              />
              <label htmlFor="avatar" className="hidden">
                <CiEdit />
              </label>
            </form>
            <button className="relative left-10 bottom-7 text-purple-700">
              <FaCheckCircle />
            </button>
          </div>

          <h1 className="relative bottom-3 font-bold"> Arbaz</h1>

          {/* form to update user details */}
          <form className="flex flex-col m-9 md:mx-52">
          <p className="bg-red-500 rounded mb-3 text-[15px] p-1 sm:text-xs text-white">This is error Message</p>
            <input type="text" value={name} placeholder="Full Name" onChange={e => setName(e.target.value)} 
            className="p-2 mb-2 rounded-lg outline-none"
            />
            <input type="text" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} 
            className="p-2 mb-2 rounded-lg outline-none"
            />
            <input type="text" value={currentPassword} placeholder="Current Password" onChange={e => setCurrentPassword(e.target.value)} 
            className="p-2 mb-2 rounded-lg outline-none"
            />
            <input type="text" value={newPassword} placeholder="New Password" onChange={e => setNewPassword(e.target.value)} 
            className="p-2 mb-2 rounded-lg outline-none"
            />
            <input type="text" value={confirmPassword} placeholder="Confirm Password" onChange={e => setCnfirmPassword(e.target.value)} 
            className="p-2 mb-2 rounded-lg outline-none"
            />
            <button className="bg-purple-700 rounded-md text-[17px] text-white text-center w-fit p-2 hover:bg-purple-800">Update details</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
