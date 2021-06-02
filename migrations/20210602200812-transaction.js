'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transaction', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.VARCHAR
        
      },
      status: {
        type: Sequelize.INTEGER
        
      },
      transaction_id: {
        type: Sequelize.VARCHAR,
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