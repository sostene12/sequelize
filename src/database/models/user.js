'use strict';
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Todo,{ foreignKey: {name:'userId'} });
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    timestamps:true,
  });
  return User;
};