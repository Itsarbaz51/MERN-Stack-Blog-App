import { Router } from "express";
import {
  userRegister,
  userlogin,
  author,
  authors,
  changeAvatar,
  editUser,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(userlogin);
router.route("/").get(verifyJWT, author);
router.route("/").get(authors);
router
  .route("/changeAvatar")
  .patch(verifyJWT, upload.single("avatar"), changeAvatar);
router.route("/edit-user").patch(verifyJWT, editUser);

export { router };
