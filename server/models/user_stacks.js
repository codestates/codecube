'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class user_stacks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_stacks.belongsTo(models.users, {
        as: 'users',
        foreignKey: 'user_id'
      })
      user_stacks.belongsTo(models.stacks, {
        as: 'stacks',
        foreignKey: 'user_id'
      })
    }
  };
  user_stacks.init({
    user_id: DataTypes.INTEGER,
    stack_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_stacks',
  })
  return user_stacks
}