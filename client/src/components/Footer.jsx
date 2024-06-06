import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="bg-slate-400 p-4 m-3 rounded-3xl">
      <ul className="text-center p-2  gap-3 xl:flex xl:justify-between ">
        <li className="hover:bg-slate-200 rounded hover:inline-block p-2">
          <Link to="/posts/categories/Agriclture">Agriclture</Link>
        </li>
        <li className="hover:bg-slate-200 rounded hover:inline-block p-2">
          <Link to="/posts/categories/Business">Business</Link>
        </li>
        <li className="hover:bg-slate-200 rounded hover:inline-block p-2">
          <Link to="/posts/categories/Education">Education</Link>
        </li>
        <li className="hover:bg-slate-200 rounded hover:inline-block p-2">
          <Link to="/posts/categories/Entertainment">Entertainment</Link>
        </li>
        <li className="hover:bg-slate-200 rounded hover:inline-block p-2">
          <Link to="/posts/categories/Art">Art</Link>
        </li>
        <li className="hover:bg-slate-200 rounded hover:inline-block p-2">
          <Link to="/posts/categories/Invester">Invester</Link>
        </li>
        <li className="hover:bg-slate-200 rounded hover:inline-block p-2">
          <Link to="/posts/categories/Uncotegorized">Uncotegorized</Link>
        </li>
        <li className="hover:bg-slate-200 rounded hover:inline-block p-2">
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