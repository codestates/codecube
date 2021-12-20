'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.user_stacks, {
        as: 'user_stacks',
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })
      users.hasMany(models.project_users, {
        as: 'project_users',
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })

    }
  }
  users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'users',
  })
  return users
}