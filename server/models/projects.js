'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      projects.hasMany(models.user_stacks, {
        as: 'user_stacks',
        foreignKey: 'projecyt_id',
        onDelete: 'CASCADE'
      })
    }
  };
  projects.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.TEXT,
    start: DataTypes.STRING,
    done: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'projects',
  })
  return projects
}