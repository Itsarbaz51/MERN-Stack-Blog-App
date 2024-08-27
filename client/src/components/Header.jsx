import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

function Header() {
  const [isNavShowing, setIsNaveShowing] = useState(
    window.innerWidth > 800 ? true : false
  );

  const { loginUser } = useSelector((state) => state.auth);

  const closeNavHandle = () => {
    if (window.innerWidth < 800) {
      setIsNaveShowing(false);
    } else {
      setIsNaveShowing(true);
    }
  };

  return (
    <>
      <nav>
        <div className="bg-gray-50 border-b-2 border-gray-200 flex justify-between">
          <div>
            <h3 className="p-2">
              <Link to="/" onClick={closeNavHandle}>
                Blog App
              </Link>
            </h3>
          </div>
          <div>
            {loginUser?.message?.user?._id && isNavShowing && (
              <ul className="bg-gray-50 z-10 absolute right-5 top-16 p-4 shadow-2xl grid gap-3 rounded-md sm:hidden ">
                <li className="transition duration-700 ease-out hover:text-white p-1 hover:bg-black text-center rounded-lg">
                  <Link to="/" onClick={closeNavHandle}>
                    Home
                  </Link>
                </li>
                <li className="transition duration-700 ease-out hover:text-white p-1 hover:bg-black text-center rounded-lg">
                  <Link to={`/profile/${loginUser?.message?.user?._id}`} onClick={closeNavHandle}>
                    {loginUser?.message?.user?.fullName}
                  </Link>
                </li>
                <li className="transition duration-700 ease-out hover:text-white p-1 hover:bg-black text-center rounded-lg">
                  <Link to="/create" onClick={closeNavHandle}>
                    Create Post
                  </Link>
                </li>
                <li className="transition duration-700 ease-out hover:text-white p-1 hover:bg-black text-center rounded-lg">
                  <Link to="/authors" onClick={closeNavHandle}>
                    Authors
                  </Link>
                </li>
                <li className="transition duration-700 ease-out hover:text-white p-1 hover:bg-black text-center rounded-lg">
                  <Link to="/logout" onClick={closeNavHandle}>
                    Logout
                  </Link>
                </li>
              </ul>
            )}
            {loginUser?.message?.user?._id && (
              <ul className=" sm:flex gap-4 md:gap-5 hidden ">
                <li className="transition duration-700 ease-out hover:text-white hover:bg-black p-2">
                  <Link  to="/" onClick={closeNavHandle}>
                    Home
                  </Link>
                </li>
                <li className="transition duration-700 ease-out hover:text-white hover:bg-black p-2">
                  <Link to={`/profile/${loginUser?.message?.user?._id}`} onClick={closeNavHandle}>
                    {loginUser?.message?.user?.fullName || "Not User"}
                  </Link>
                </li>
                <li className="transition duration-700 ease-out hover:text-white hover:bg-black p-2">
                  <Link to="/create" onClick={closeNavHandle}>
                    Create Post
                  </Link>
                </li>
                <li className="transition duration-700 ease-out hover:text-white hover:bg-black p-2">
                  <Link to="/authors" onClick={closeNavHandle}>
                    Authors
                  </Link>
                </li>
                <li className="transition duration-700 ease-out hover:text-white hover:bg-black p-2">
                  <Link to="/logout" onClick={closeNavHandle}>
                    Logout
                  </Link>
                </li>
              </ul>
            )}
            {!loginUser?.message?.user._id && isNavShowing && (
              <ul className="bg-gray-50 z-10 absolute right-5 top-16 p-4 shadow-2xl grid gap-3 rounded-md sm:hidden ">
                <li className="transition duration-700 ease-out hover:text-white p-1 hover:bg-black text-center rounded-lg">
                  <Link to="/" onClick={closeNavHandle}>
                    Home
                  </Link>
                </li>
                <li className="transition duration-700 ease-out hover:text-white hover:bg-black text-center p-2 rounded-lg">
                  <Link to="/register" onClick={closeNavHandle}>
                    Register
                  </Link>
                </li>

                <li className="transition duration-700 ease-out hover:text-white p-1 hover:bg-black text-center rounded-lg">
                  <Link to="/login" onClick={closeNavHandle}>
                    login
                  </Link>
                </li>

                <li className="transition duration-700 ease-out hover:text-white p-1 hover:bg-black text-center rounded-lg">
                  <Link to="/authors" onClick={closeNavHandle}>
                    Authors
                  </Link>
                </li>
              </ul>
            )}
            {!loginUser?.message?.user._id && (
              <ul className="sm:flex gap-4 md:gap-5 hidden ">
                <li className="transition duration-700 ease-out hover:text-white hover:bg-black text-center p-2">
                  <Link to="/" onClick={closeNavHandle}>
                    Home
                  </Link>
                </li>
                <li className="transition duration-700 ease-out hover:text-white hover:bg-black text-center p-2">
                  <Link to="/register" onClick={closeNavHandle}>
                    Register
                  </Link>
                </li>
                <li className="transition duration-700 ease-out hover:text-white hover:bg-black text-center p-2">
                  <Link to="/login" onClick={closeNavHandle}>
                    login
                  </Link>
                </li>

                <li className="transition duration-700 ease-out hover:text-white hover:bg-black text-center p-2">
                  <Link to="/authors" onClick={closeNavHandle}>
                    Authors
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <button
            className="sm:hidden lg:hidden outline-none"
            onClick={() => setIsNaveShowing(!isNavShowing)}
          >
            {isNavShowing ? <IoClose /> : <IoMenuSharp />}
          </button>
        </div>
      </nav>
    </>
  );
}

export default Header;
