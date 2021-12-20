'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class stacks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      stacks.hasMany(models.user_stacks, {
        as: 'user_stacks',
        foreignKey: 'stack_id',
        onDelete: 'CASCADE'
      })
    }
  }
  stacks.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'stacks',
    }
  )
  return stacks
}
