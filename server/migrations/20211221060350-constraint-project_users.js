'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('project_users', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'project_users_constraint_userId',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })

    await queryInterface.addConstraint('project_users', {
      fields: ['project_id'],
      type: 'foreign key',
      name: 'project_users_constraint_projectId',
      references: {
        table: 'projects',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'project_users',
      'project_users_constraint_userId'
    )
    await queryInterface.removeConstraint(
      'project_users',
      'project_users_constraint_projectId'
    )
  },
}
