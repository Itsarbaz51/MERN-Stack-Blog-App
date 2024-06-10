import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncatrgory");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ]
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'indent',
    'align',
    'link', 'image'
  ]

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
  return (
    <section> 
      <div className=" mx-4 md:my-8 sm:mx-24 md:mx-44 bg-slate-50 p-4 rounded-md my-4">
        <h2 className="font-bold text-xl mb-3">Create Post</h2>
        <div className="">
        <p className="bg-red-500 p-1 rounded-md mb-2  text-white">This is error Message</p>
        </div>
        <form className=" grid grid-flow-row gap-3">
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
          <button type="submit"
          className="bg-purple-700 hover:bg-purple-900 text-gray-300 w-16 rounded-md p-1">Create</button>
        </form>
      </div>
    </section>
  );
}

export default CreatePost;
