import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/post.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import cloudinary from "cloudinary";


const createPost = asyncHandler(async (req, res) => {
  let { title, category, description } = req.body;

  if (!title || !category || !description) {
    return res.status(200).json(new ApiError(200, "All fileds are required."));
  }

  const thumbnailPath  = req.file?.path
  if (!thumbnailPath) {
    throw new ApiError(402, "Thumbnail is required.");
  }

  const thumbnailUpload = await uploadOnCloudinary(thumbnailPath);

  const newPost = await Post.create({
    title,
    category,
    description,
    thumbnail: thumbnailUpload?.url,
    creator: req.user?._id,
  });

  // const userId = req.user?._id;
  const userId = req.params.id;

  const currentUser = await User.findById(userId);
  const userPostCount = currentUser.post + 1
  await User.findByIdAndUpdate(userId, {
    post: userPostCount,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newPost, "successfully create post."));
});

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().sort({ updatedAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Successfully fetch all Posts."));
});

const getSinglePost = asyncHandler(async (req, res) => {
const postId = req.params.id;

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found.");
  }

  return res.status(200).json(new ApiResponse(200, post, "Get the post."));
});

const getCatPosts = asyncHandler(async (req, res) => {
  const {category}  = req.params;

  const catPosts = await Post.find({ category }).sort({ createdAt: -1 });

  return res.status(200).json(new ApiResponse(200, catPosts, "Get category."));
});

const getUserPost = asyncHandler(async (req, res) => {
  // const userId = req.user?._id;
  const userId = req.params.id;
  // console.log(userId);
  const posts = await Post.find({ creator: userId }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Fetch user posts successfully."));
});

const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  // console.log(postId);
  if (!postId) {
    throw new ApiError(403, "Post Unavailable.");
  }

  const post = await Post.findById(postId);
  // console.log("post details. :",post);
  const thumbnailfile = post.thumbnail;
  const splitThumbanilArray = thumbnailfile.split("/");
  const image = splitThumbanilArray[splitThumbanilArray.length - 1];
  const imageName = image.split(".")[0];
  await cloudinary.uploader.destroy(imageName);
  const postdele = await Post.findByIdAndDelete(postId);

  const currentUser = await User.findById(req.user?._id)
  // console.log("current user : ", currentUser);
  const userPostCount = currentUser.post -1
  // console.log("user post count : ", userPostCount);
  await User.findByIdAndUpdate(req.user?._id, {posts: userPostCount})

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        
        postdele,
        "Post delete successfully."
      )
    );
});

const postUpdate = asyncHandler(async (req, res) => {
  const {title} = req.body
  // console.log(title);

  const {thumbnail} = req.body
  // console.log(thumbnail);
  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      title,
      thumbnail,
      "Successfully Update Post."
    )
  )
})


export {
  createPost,
  getPosts,
  getSinglePost,
  getCatPosts,
  getUserPost,
  deletePost,
  postUpdate
};
