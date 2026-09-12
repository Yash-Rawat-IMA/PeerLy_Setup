import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecommendedUser, getMyFriends, sendFriendRequest, acceptFriendRequest, getFriendRequests, getOutgoingRequests } from "../controllers/user.controller.js";

const router = express.Router();
// apply auth middleware to all routes
router.use(protectRoute);

router.get("/", getRecommendedUser);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);

router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);

router.get("/outgoing-friend-requests", getOutgoingRequests);

//more functionalities like rejecting a requests

export default router;