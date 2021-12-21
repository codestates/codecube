'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    static associate(models) {
      projects.belongsTo(models.users)
    }
  }
  projects.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      start: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      done: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'projects',
    }
  )
  return projects
}
