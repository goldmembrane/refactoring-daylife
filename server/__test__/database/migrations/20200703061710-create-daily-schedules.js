'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('daily_schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      is_done: {
        type: Sequelize.BOOLEAN
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      start: {
        type: Sequelize.STRING
      },
      end: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('daily_schedules');
  }
};