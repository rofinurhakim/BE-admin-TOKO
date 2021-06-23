'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('transactions', {
        transaction_id: {
          type: Sequelize.UUID,
          default: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,  
        },
        user_id: {
          allowNull: false,
          type: Sequelize.STRING,
          foreignKey: true,
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