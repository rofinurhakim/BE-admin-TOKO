'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID4,
        default: Sequelize.UUID4
      },
      nama_products: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      deskripsi: {
        type: Sequelize.STRING,
        allowNull: false,
       
      },
      Image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rating: {
        type: Sequelize.INTEGER,

      },
      price: {
        type: Sequelize.INTEGER
      },
      stock: {
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
    return queryInterface.dropTable('products');
  }
};