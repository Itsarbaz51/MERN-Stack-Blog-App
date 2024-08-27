import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/post.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import cloudinary from "cloudinary";


const createPost = asyncHandler(async (req, res) => {
  const { title, category, description } = req.body;

  if (!title || !category || !description) {
    throw new ApiError(401, "All fileds are required.");
  }

  const thumbnailPath  = req.file?.path;
  
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

  const userId = req.user?._id;
  // const userId = req.params.id;

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
  const userId = req.params.id;
  const posts = await Post.find({ creator: userId }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Fetch user posts successfully."));
});

const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  // console.log("postId", postId);
  if (!postId) {
    throw new ApiError(403, "Post Unavailable.");
  }

  const post = await Post.findById(postId);
  const thumbnailfile = post.thumbnail;
  const splitThumbanilArray = thumbnailfile.split("/");
  const image = splitThumbanilArray[splitThumbanilArray.length - 1];
  const imageName = image.split(".")[0];
  await cloudinary.uploader.destroy(imageName);
  const postdele = await Post.findByIdAndDelete(postId);
  
  const userId = req.user._id;
  // console.log("userid",userId);
  const currentUser = await User.findById(userId)
  const userPostCount = currentUser.post -1
  await User.findByIdAndUpdate(userId, {posts: userPostCount})
  
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

  let updatedPost;
  const postId = req.params.id;
  console.log(postId);
  const { title, description, category } = req.body;

  if ([title, description, category].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All field are required !");
  }

  if (!req.file) {
    updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          title,
          description,
          category,
        },
      },
      {
        new: true,
      },
    );
  } else {
    const thumbnailLocalFilePath = req.file.path;

    if (!thumbnailLocalFilePath) {
      throw new ApiError(400, "Thumnail file missing");
    }

    const post = await Post.findById(postId);
    const thumbnailfile = post.thumbnail;
    const splitThumbanilArray = thumbnailfile.split("/");
    const image = splitThumbanilArray[splitThumbanilArray.length - 1];
    const imageName = image.split(".")[0];
    await cloudinary.uploader.destroy(imageName);

    if (thumbnailLocalFilePath.size > 2000000) {
      throw new ApiError(400, "Thumbnail should be less then 2mb ");
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalFilePath);

    if (!thumbnail) {
      throw new ApiError(400, "Error while uploading thumbnail! ");
    }

    updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          title,
          description,
          category,
          thumbnail: thumbnail.url,
        },
      },
      {
        new: true,
      },
    );
  }

  if (!updatedPost) {
    throw new ApiError(400, "Couldn't update post. ");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Post updated Successfully...", updatedPost));
});


export {
  createPost,
  getPosts,
  getSinglePost,
  getCatPosts,
  getUserPost,
  deletePost,
  postUpdate
};
