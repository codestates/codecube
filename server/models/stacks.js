'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class stacks extends Model {
    static associate(models) {
      stacks.hasMany(models.user_stacks)
    }
  }
  stacks.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: 'stacks',
    }
  )
  return stacks
}
