import bcrypt from "bcrypt";
import dotenv from "dotenv";

import models from "../database/models"
import jwt from "jsonwebtoken";
const { User } = models;
dotenv.config();

class UserController{
    static async getAllUsers(req,res){
        try {
            const users = await User.findAll();
            res.status(200).json({status:"success",data:users});
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
            let  { firstName,lastName,email,password } = req.body;
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password,salt);
           const user = await User.create({firstName,lastName,email,password}) ;
           const token = jwt.sign({id:user.id},process.env.JWT_SECRET);
           res.status(201).json({status:"success",data:user.toJSON(),token});
        } catch (error) {
            res.status(500).json({status:"error",error:error.message});
        }
    }

    static async updateUser(req,res){
        try {
            const updatedUser = await User.upsert({id:req.params.id,...req.body});
            // const [updatedUser] = await User.update({...req.body},{where:{id:req.params.id}});
            res.status(200).json({status:"success",data:updatedUser});
        } catch (error) {
            res.status(500).json({status:"error",error:error.message});
        }
    }

    static async deleteUser(req,res){
        try {
            await User.destroy({where:{id:req.params.id}});
            res.status(200).json({status:"success",message:"deleted"})
        } catch (error) {
            res.status(500).json({status:"error",error:error.message});
        }
    }

    static async login(req,res){
        try {
            const user = await User.findOne({where:{email:req.body.email}});
            const match = await bcrypt.compare(req.body.password,user.password);
            if(match){
                const token = jwt.sign({id:user.id},process.env.JWT_SECRET);
                return res.status(201).json({status:"success",data:user.toJSON(),token});
            }
        } catch (error) {
            res.status(500).json({status:"error",error:error.message});
        }

    }

}

export default UserController;