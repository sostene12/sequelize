import models from "../database/models"
const { Todo } = models;

class TodoController{
    static async getAllTodos(req,res){
        try {
            const todos = await Todo.findAll();
            res.status(200).json({status:"success",data:todos});
        } catch (error) {
            res.status(500).json({status:"error",error:error.message});
        }
    }

    static async getSingleTodo(req,res){
        try {
            const todo = await Todo.findByPk(req.params.id);
            res.status(200).json({status:"success",data:todo.toJSON()});
        } catch (error) {
            res.status(500).json({status:"error",error:error.message});
        }
    }
    static async createTodo(req,res){
        try {
            let  { text } = req.body;
           const todo = await Todo.create({text,userId:req.user.id}) ;
           res.status(201).json({status:"success",data:todo.toJSON()});
        } catch (error) {
            res.status(500).json({status:"error",error:error.message});
        }
    }

    static async updateTodo(req,res){
        try {
            const updatedTodo = await Todo.upsert({id:req.params.id,...req.body});
            res.status(200).json({status:"success",data:updatedTodo});
        } catch (error) {
            res.status(500).json({status:"error",error:error.message});
        }
    }

    static async deleteTodo(req,res){
        try {
            await Todo.destroy({where:{id:req.params.id}});
            res.status(200).json({status:"success",message:"deleted"})
        } catch (error) {
            res.status(500).json({status:"error",error:error.message});
        }
    }

    static async getUserTodos(req,res){
        try {
            const myTodos = await Todo.findAll({where:{userId:req.user.id}});
            return res.status(200).json({status:"success",data:myTodos});
        } catch (error) {
            res.status(500).json({status:"error",error:error.message});
        }
    }
}

export default TodoController;