import React from "react";
import { Link } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

function Header() {

  return (
    <>
      <nav>
        <div className="flex justify-between border-b-2 p-3 m-2">
          <div>
            <h3>
              <Link to="/" >Blog App</Link>
            </h3>
          </div>
          <div className="hidden sm:flex">
            <ul className="flex md:gap-8  rounded-sm sm:gap-3">
              <li>
                <Link to="/profile/arbaz">Arbaz</Link>
              </li>
              <li>
                <Link to="/create">Create Post</Link>
              </li>
              <li>
                <Link to="/authors">Authors</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
          <button
            className="sm:hidden hover:bg-slate-100 hover:rounded"
          >
            <IoMenuSharp /> 
          </button>
        </div>
      </nav>
    </>
  );
}

export default Header;
