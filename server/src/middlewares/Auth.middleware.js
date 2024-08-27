import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'


const verifyJWT = asyncHandler(async (req , _, next) => {
    try {
        const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        const userToken = token.split(" ")[0]
        if (!userToken) {
            throw new ApiError(401, "Unauthorized request.")
        }

        const decoded = jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decoded?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invaild Access Token user.")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invaid Access Token.")
    }
})

export {
    verifyJWT
}