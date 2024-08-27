import { Router } from "express";
import {
  userRegister,
  userlogin,
  author,
  authors,
  changeAvatar,
  editUser,
  userLogout,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(userlogin);
router.route("/logout").post(verifyJWT, userLogout);
router.route("/:id").get(author);
router.route("/").get(authors);
router
  .route("/changeAvatar")
  .patch(verifyJWT, upload.single("avatar"), changeAvatar);
router.route("/edit-user").patch(verifyJWT, editUser);

export { router };
