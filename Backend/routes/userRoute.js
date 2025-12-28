import express from "express";
import authUser from "../middleware/auth.js";
import { getUserProfile } from "../controllers/userController.js";

import {
    loginUser,
    registerUser,
    adminLogin,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/profile", authUser, getUserProfile);

export default userRouter;
