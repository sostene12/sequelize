import models from "../database/models"
const { User } = models;

class UserController{
    static async getAllUsers(req,res){
        try {
            const users = await User.find();
            res.status(200).json({status:"success",data:users.toJSON()});
        } catch (error) {
            res.status(500).json({status:"error",error:error.message});
        }
    }

    static async getSingleUser(req,res){
        try {
            const user = await User.findByPk(req.params.id);
            console.log(user);
            res.status(200).json({status:"success",data:user.toJSON()});
        } catch (error) {
            res.status(500).json({status:"error",error:error.message});
        }
    }
    static async createUser(req,res){
        try {
            const {firstName,lastName,email} = req.body;
           const user = await User.create({firstName,lastName,email}) ;
           res.status(201).json({status:"success",data:user.toJSON()});
        } catch (error) {
            res.status(500).json({status:"error",error:error.message});
        }
    }

    static async updateUser(req,res){
        try {
            
        } catch (error) {
            
        }
    }

    static async deleteUser(req,res){
        try {
            
        } catch (error) {
            
        }
    }

}

export default UserController;