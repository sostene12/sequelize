'use strict';
import  { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:{name:'userId'}});
    }
  }
  Todo.init({
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};