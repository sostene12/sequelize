import express from "express";
import TodoController from "../controllers/todoController";
import { verifyToken } from "../middlewares/verify";

const todoRoute = express.Router();

todoRoute.post("/create",verifyToken,TodoController.createTodo);
todoRoute.get("/all",TodoController.getAllTodos);
todoRoute.get("/:id",TodoController.getSingleTodo);
todoRoute.delete("/delete/:id",TodoController.deleteTodo);
todoRoute.put("/update/:id",TodoController.updateTodo);
todoRoute.get("/mine/myTodos",verifyToken,TodoController.getUserTodos);

export default todoRoute;