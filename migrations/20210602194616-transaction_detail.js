''use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transaction_details', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUID4
      },
      product_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      transaction_id: {
        type: Sequelize.STRING,
        allowNull: false,       
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('transaction_details');
  }
};