'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('user_stacks', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'user_stacks_constraint_userId',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })

    await queryInterface.addConstraint('user_stacks', {
      fields: ['stackId'],
      type: 'foreign key',
      name: 'user_stacks_constraint_stackId',
      references: {
        table: 'stacks',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'user_stacks',
      'user_stacks_constraint_userId'
    )
    await queryInterface.removeConstraint(
      'user_stacks',
      'user_stacks_constraint_stackId'
    )
  },
}
