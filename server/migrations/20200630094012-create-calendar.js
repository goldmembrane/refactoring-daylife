'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('calendars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      start_time: {
        type: Sequelize.TIME
      },
      end_date: {
        type: Sequelize.DATE
      },
      end_time: {
        type: Sequelize.TIME
      },
      is_repeat: {
        type: Sequelize.STRING
      },
      is_done: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('calendars');
  }
};