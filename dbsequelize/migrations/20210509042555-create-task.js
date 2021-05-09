'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      incharge: {
        type: Sequelize.STRING
      },
      section: {
        type: Sequelize.STRING
      },
      gang: {
        type: Sequelize.STRING
      },
      task: {
        type: Sequelize.STRING
      },
      compliance: {
        type: Sequelize.STRING
      },
      grievance: {
        type: Sequelize.STRING
      },
      contractual: {
        type: Sequelize.STRING
      },
      machine: {
        type: Sequelize.STRING
      },
      updatedDt: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('tasks');
  }
};