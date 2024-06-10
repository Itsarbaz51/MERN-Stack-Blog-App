import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="bg-slate-100 hover:shadow-2xl hover:shadow-slate-300 p-4 m-3  rounded-3xl">
      <ul className="text-center p-2 flex flex-wrap justify-evenly gap-3 ">
        <li className="hover:bg-black hover:text-white rounded hover:inline-block p-2">
          <Link to="/posts/categories/Agriclture">Agriclture</Link>
        </li>
        <li className=" hover:bg-black hover:text-white rounded hover:inline-block p-2">
          <Link to="/posts/categories/Business">Business</Link>
        </li>
        <li className="hover:bg-black hover:text-white rounded hover:inline-block p-2">
          <Link to="/posts/categories/Education">Education</Link>
        </li>
        <li className=" hover:bg-black hover:text-white rounded hover:inline-block p-2">
          <Link to="/posts/categories/Entertainment">Entertainment</Link>
        </li>
        <li className=" hover:bg-black hover:text-white rounded hover:inline-block p-2">
          <Link to="/posts/categories/Art">Art</Link>
        </li>
        <li className=" hover:bg-black hover:text-white rounded hover:inline-block p-2">
          <Link to="/posts/categories/Invester">Invester</Link>
        </li>
        <li className=" hover:bg-black hover:text-white rounded hover:inline-block p-2">
          <Link to="/posts/categories/Uncotegorized">Uncotegorized</Link>
        </li>
        <li className=" hover:bg-black hover:text-white rounded hover:inline-block p-2">
          <Link to="/posts/categories/Weather">Weather</Link>
        </li>
      </ul>
      <div className="text-center border-t-2 pt-2">
        <small>All Rights Reserved &copy; Copyright, @_devArbaz</small>
      </div>
      </div>
    </footer>
  );
}

export default Footer;