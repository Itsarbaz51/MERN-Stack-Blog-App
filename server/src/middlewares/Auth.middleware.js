import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'


const verifyJWT = asyncHandler(async (req , _, next) => {
    // console.log(req.cookies?.accessToken);
    try {
        const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request.")
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // console.log("decoded.",decoded._id);
        const user = await User.findById(decoded?._id).select("-password -refreshToken")
        // console.log("user details", user);

        if (!user) {
            throw new ApiError(401, "Invaild Access Token user.")
        }
        req.user = user
        // console.log(user);
        next()
    } catch (error) {
        throw new ApiError(401, error.message || "Invaid Access Token.")
    }
})

export {
    verifyJWT
}