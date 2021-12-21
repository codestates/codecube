'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projects', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      image: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      start: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      done: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('projects')
  },
}
