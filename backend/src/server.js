import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.Routes.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
// import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

// app.get("/api/auth/signup", (req, res) => {
//     res.send("Sign Up Route!");
// });

// app.get("/api/auth/login", (req, res) => {
//     res.send("Login Route!");
// });

// app.get("/api/auth/logout", (req, res) => {
//     res.send("Logout Route!");
// });

// middleware
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    console.log(req.url);
    return res.status(200).json({message:"Server working"})
})

app.listen(PORT, () => {
    console.log(`Server is running on the port: ${PORT}`);
    connectDB();
});