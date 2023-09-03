import express from "express";
import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes";
import authRoutes from "./routes/authRoutes";
import { authenticateToken } from "./middlewares/authMiddlewares";


const app =express();

app.use(express.json());
app.use("/user",userRoutes)
app.use("/tweet", authenticateToken,tweetRoutes)
app.use("/auth", authRoutes);



app.get("/", (req, res) => {
    res.send("Hello world Updated");
})




app.listen(3000, ()=> {
    console.log("Server ready at localhost:3000")
})