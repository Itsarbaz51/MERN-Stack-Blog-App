import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    // console.log(user);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token."
    );
  }
};

const userRegister = asyncHandler(async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  if (
    [fullName, email, password, confirmPassword].some(
      (filed) => filed?.trim() == ""
    )
  ) {
    throw new ApiError(401, "All fileds are required.");
  }

  const userExsits = await User.findOne({
    $or: [{ email }],
  });

  if (userExsits) {
   throw new ApiError(401, "User already exsits with email.");
  }

  if (password.length < 6) {
    throw new ApiError(401, "Password must be 6 charactore.");
  }

  if (password != confirmPassword) {
    throw new ApiError(401, "Password not same.");
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(401, "Something went worng.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User successfully Register."));
});

const userlogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    throw new ApiError(401, "Email & Password is required.")

  }

  const user = await User.findOne({
    $or: [{ email }],
  });

  if (!user) {
    throw new ApiError(404, "User not Found.")
  }

  const isPasswordValid = await user.comeparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const userlogin = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: userlogin,
          accessToken,
          refreshToken,
        },
        "User successfully logged In"
      )
    );
});

const userLogout = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken: ", options)
    .cookie("refreshToken: ", options)
    .json(new ApiResponse(200, {}, "User successfully logout."));
});

const author = asyncHandler(async (req, res) => {
  const userId = req?.params.id;
  const user = await User?.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User Not Found.")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "successfully get user profile."));
});

const authors = asyncHandler(async (req, res) => {
  const allAuthors = await User.find().select("-password");
  if (!allAuthors) {
    throw new ApiError(404, "Authors not found.")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allAuthors, "all authors fetch successfully."));
});

const changeAvatar = asyncHandler(async (req, res) => {
  const localAvatarPath = req.file?.path;
  if (!localAvatarPath) {
    throw new ApiError(401, "Avatar is required.")
  }

  const userId = await User.findById(req.user?._id);
  if (!userId) {
    throw new ApiError(404, "User not Found.")
  }
  

  if (req.file?.avatar) {
    const avatarPathUrl = userId.avatar;
    const avatarSplit = avatarPathUrl.split("/" || "-" || "_" || ".");
    const avatarName = avatarSplit[avatarSplit.length - 1];
    const avatarNameSplit = avatarName.split(".")[0];
    await cloudinary.uploader.destroy(avatarNameSplit);
  }

  const avatar = await uploadOnCloudinary(localAvatarPath);

  if (!avatar.url) {
    throw new ApiError(401, "Error while uploading on avatar.")
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar Change Successfully."));
});

const editUser = asyncHandler(async (req, res) => {
  const { fullName, email, currentPassword, newPassword, confirmPassword } =
    req.body;

  if (
    [!fullName || !email || !currentPassword || !newPassword].some((field) => field?.trim() == "")
  ) {
    throw new ApiError(401, "All fields are required.")
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(401, "User not found.")
  }

  const emailExsits = await User.findOne({ email });
  // console.log(emailExsits);
  if (emailExsits && emailExsits._id != req.user?._id) {
    throw new ApiError(401, "Email already Exist.")
  }

  const checkPasswordValidOrNot = await user.comeparePassword(currentPassword);
  // console.log(checkPasswordValidOrNot);
  if (!checkPasswordValidOrNot) {
    throw new ApiError(401, "Invaild Password.")
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  if (newPassword !== confirmPassword) {
    throw new ApiError(401, "password do not match.")
  }

  const newUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
        newPassword,
      },
    },
    { new: true }
  ).select("-newPassword");

  return res
    .status(200)
    .json(new ApiResponse(200, newUser, "successfully update user details."));
});

export {
  userRegister,
  userlogin,
  userLogout,
  author,
  authors,
  changeAvatar,
  editUser,
};
