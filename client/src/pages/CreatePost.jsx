import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {postCreatePost} from '../slices/postSlice.js'

function CreatePost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncatrgory");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");

  const { loginUser } = useSelector((state) => state.auth);
  const userToken = loginUser?.message?.accessToken;
  
  const navigate = useNavigate();
  const quillRef = useRef(null)
  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  });
  
  const dispatch = useDispatch();
  const {createPostData, isLoading, error} = useSelector(state => state.posts);
  
  const createPostHandler = (e) => {
    e.preventDefault()
    
    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("thumbnail", thumbnail);
    postData.set("description", description);
    
    dispatch(postCreatePost(postData, userToken));
  }

  useEffect(() => {
    if (createPostData) {
      navigate('/')
    }
  }, [createPostData])


  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
  ];

  const POST_CATEGORY = [
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
  ];
  
  if (isLoading) {
    return (
      <section className="h-screen w-screen flex justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
      </section>
    )
  }
  return (
    <section>
      <div className=" mx-4 md:my-8 sm:mx-24 md:mx-44 bg-slate-50 p-4 rounded-md my-4">
        <h2 className="font-bold text-xl mb-3">Create Post</h2>
        <div className="">
          {error && <p className="bg-red-500 p-1 rounded-md mb-2  text-white">
            {error}
          </p>}
        </div>
        <form className=" grid grid-flow-row gap-3" onSubmit={createPostHandler}> 
          <input
            type="text"
            placeholder="title"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            className="p-1 rounded outline-none"
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-1 rounded outline-none hover:bg-slate-50 "
          >
            {POST_CATEGORY.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill 
          ref={quillRef}
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
            className="h-24"
          
          />
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="png, jpg, jpeg"
            className=" mt-20 md:mt-14"
          />
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-900 text-gray-300 w-16 rounded-md p-1"
          >
            Create
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreatePost;
