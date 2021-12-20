'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class project_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      project_users.belongsTo(models.users, {
        as: 'users',
        foreignKey: 'user_id'
      })
      project_users.belongsTo(models.projects, {
        as: 'projects',
        foreignKey: 'project_id'
      })
    }
  };
  project_users.init({
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    join: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'project_users',
  })
  return project_users
}