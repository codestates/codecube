'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class project_users extends Model {
    static associate(models) {
      project_users.belongsTo(models.users)
      project_users.belongsTo(models.projects)
    }
  }
  project_users.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      join: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'project_users',
    }
  )
  return project_users
}
