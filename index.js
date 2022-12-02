const express=require("express");
const connection = require("./config/db");
const userRoutes = require("./routes/user.routes");
const app=express();
app.use(express.json());
app.get("/",(req,res)=>
{
    res.send("Homepage")
})
app.use("/user",userRoutes);
app.listen(process.env.PORT,async()=>
{
    try{
        await connection
        console.log("Connection established")
    }
    catch{
console.log("Disconnected")
    }
    console.log("Running on port http://localhost:8080")
})