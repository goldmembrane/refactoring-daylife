'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('daily_schedules', 'start'),
    await queryInterface.addColumn('daily_schedules', 'start', Sequelize.STRING),
    await queryInterface.removeColumn('daily_schedules', 'end'),
    await queryInterface.addColumn('daily_schedules', 'end', Sequelize.STRING),
    await queryInterface.addColumn('daily_schedules', 'date', Sequelize.STRING)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
