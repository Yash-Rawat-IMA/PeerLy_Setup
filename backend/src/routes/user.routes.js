import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {getRecommendedUser, getMyFriends} from "../controllers/user.controller.js";

const router = express.Router();
// apply auth middleware to all routes
router.use(protectRoute);

router.get("/", getRecommendedUser);
router.get("/friends", getMyFriends);

export default router;