'use strict';
//pake yg ini ya 
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions_details', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUID4
      },

      product_id: {
        type: Sequelize.STRING
      },

      transaction_id: {
        type: Sequelize.STRING
      },

      qty: {
        type: Sequelize.INTEGER
      },

      price: {
        type: Sequelize.INTEGER
      },

      totalPrice: {
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
    return queryInterface.dropTable('transactions_details');
  }
};