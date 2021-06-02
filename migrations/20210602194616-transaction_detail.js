'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transaction_detail', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUID
      },
      products_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true
        
      },
      transaction_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
       
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
    return queryInterface.dropTable('transaction_detail');
  }
};