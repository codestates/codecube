'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.hasMany(models.user_stacks)
      users.hasMany(models.project_users)
    }
  }
  users.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
      },
    },
    {
      sequelize,
      modelName: 'users',
    }
  )
  return users
}
