import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

function Header() {
  const [isNavShowing, setIsNaveShowing] = useState(
    window.innerWidth > 800 ? true : false
  );

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
        <div className="bg-slate-50 rounded w-screen  flex justify-between p-3">
          <div>
            <h3>
              <Link to="/" onClick={closeNavHandle}>
                Blog App
              </Link>
            </h3>
          </div>
          <div>
            {isNavShowing && (
              <ul className="bg-gray-50 z-10 absolute right-5 top-16 p-4 shadow-2xl grid gap-3 underline rounded-md sm:hidden ">
                <li>
                  <Link to="/profile/arbaz" onClick={closeNavHandle}>
                    Arbaz
                  </Link>
                </li>
                <li>
                  <Link to="/create" onClick={closeNavHandle}>
                    Create Post
                  </Link>
                </li>
                <li>
                  <Link to="/authors" onClick={closeNavHandle}>
                    Authors
                  </Link>
                </li>
                <li>
                  <Link to="/logout" onClick={closeNavHandle}>
                    Logout
                  </Link>
                </li>
              </ul>
            )}
            <ul className="sm:flex gap-4 md:gap-5 hidden ">
              <li>
                <Link to="/profile/arbaz" onClick={closeNavHandle}>
                  Arbaz
                </Link>
              </li>
              <li>
                <Link to="/create" onClick={closeNavHandle}>
                  Create Post
                </Link>
              </li>
              <li>
                <Link to="/authors" onClick={closeNavHandle}>
                  Authors
                </Link>
              </li>
              <li>
                <Link to="/logout" onClick={closeNavHandle}>
                  Logout
                </Link>
              </li>
            </ul>
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
