'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('projects', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'projects_constraint_userId',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'projects',
      'projects_constraint_userId'
    )
  },
}
