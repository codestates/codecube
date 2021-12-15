'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    password: DataTypes.STRING,
    user_accepted_project: DataTypes.INTEGER,
    user_completed_porject: DataTypes.INTEGER,
    user_stack: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};