'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class user_stacks extends Model {
    static associate(models) {
      user_stacks.belongsTo(models.users)
      user_stacks.belongsTo(models.stacks)
    }
  }
  user_stacks.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stack_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'user_stacks',
    }
  )
  return user_stacks
}
