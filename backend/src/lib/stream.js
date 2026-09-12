import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.error("Stream API Key or Secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

//upsert the user in stream
export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]); //upsert-create or update the user
        return userData;
    } catch (error) {
        console.error(`Error upserting the user data ${error}`);
    }
}

export const generateStreamToken = async (userId) => {
    try {
        // ensure userId is a string
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.log("Error generating stream token: ", error);
    }
}