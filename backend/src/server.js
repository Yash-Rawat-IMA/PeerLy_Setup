import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.Routes.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.Routes.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
// import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on the port: ${PORT}`);
    connectDB();
});