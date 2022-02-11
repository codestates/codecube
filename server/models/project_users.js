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
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      join: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
      modelName: 'project_users',
    }
  )
  return project_users
}
