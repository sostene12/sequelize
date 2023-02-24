import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./database/models"

import userRoute from "./routes/userRoute"

dotenv.config();
const app = express();

app.use(express.json());

( async () => await sequelize.sync({ force: true,alter:true }));

const connectDb = async () =>{
    try {
        await sequelize.authenticate();
        console.log("Database connected!")
    } catch (error) {
        console.log(error);
    }
}


const port = process.env.PORT || 3000;

app.listen(port,() =>{
    console.log(`app is listening on port: ${port}`)
});

connectDb();

app.use("/user",userRoute);