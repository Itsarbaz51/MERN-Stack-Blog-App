import { Router } from "express";
import {
    createPost,
    getPosts,
    getSinglePost,
    getCatPosts,
    getUserPost,
    deletePost,
    postUpdate,
} from "../controllers/post.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";


const postRouter = Router();

postRouter.route("/createpost").post( verifyJWT,
    upload.single("thumbnail"),createPost);

postRouter.route("/:id").delete(verifyJWT, deletePost);
postRouter.route("/:id").patch(verifyJWT,
     upload.single('thumbnail'),postUpdate)

postRouter.route("/").get(getPosts);
postRouter.route("/:id").get(getSinglePost);
postRouter.route("/categories/:category").get(getCatPosts);
postRouter.route("/user/:id").get(getUserPost);

export { postRouter };
