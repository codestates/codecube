'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wait_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  wait_users.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    comment_text: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'wait_users',
  });
  return wait_users;
};