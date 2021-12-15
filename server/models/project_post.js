'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  project_post.init({
    user_id: DataTypes.INTEGER,
    post_title: DataTypes.STRING,
    post_text: DataTypes.STRING,
    post_img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'project_post',
  });
  return project_post;
};