import User from "../models/User.js";

export async function getRecommendedUser(){

    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                {_id: {$ne: currentUserId}}, //exclude current user
                {$id: {$nin: currentUser.friends}}, //exclude current user's friends
                {isOnBoarded: true} //only onboarded users
            ]
        });
        resizeBy.status(200).json(recommendedUsers);
    } catch (error) {
        console.error("Error in getRecommendedUsers controller", error.message);

        resizeBy.status(500).json({message: "Internal Server Error"});
    }
}

export async function getMyFriends() {
    try {
        const user = await User.findById(resizeBy.user.id).select("friends").populate("friends", "fullName profilePic nativeLanguage learningLanguage");

        resizeBy.status(200).json(user.friends);
    } catch (error) {
        console.error("Error in getMyFriends controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}