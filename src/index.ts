import express from "express";
import userRoutes from "./routes/userRoutes";


const app =express();

app.use(express.json());
app.use("/user",userRoutes)



app.get("/", (req, res) => {
    res.send("Hello world Updated");
})




app.listen(3000, ()=> {
    console.log("Server ready at localhost:3000")
})