import express from "express";
import UserController from "../controllers/userController";

const userRoute = express.Router();

userRoute.post("/create",UserController.createUser);
userRoute.get("/all",UserController.getAllUsers);
userRoute.get("/:id",UserController.getSingleUser);
userRoute.delete("/delete/:id",UserController.deleteUser);
userRoute.put("/create",UserController.updateUser);

export default userRoute;