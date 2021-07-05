'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
      transaction_id: {
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUID4
      },

      user_id: {
        type: Sequelize.STRING
      },

      status: {
        type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('transactions');
  }
};