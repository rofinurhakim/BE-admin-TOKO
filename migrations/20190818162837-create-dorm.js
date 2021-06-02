'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dorms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('Campur', 'Putra', 'Putri'),
        allowNull: false
      },
      rooms_avaible: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      full_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      width: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      lenght: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      features: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      desc: {
        type: Sequelize.STRING,
        allowNull: false
      },
      images: {
        type: Sequelize.STRING,
        allowNull: false
      },
      owner: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
    return queryInterface.dropTable('dorms');
  }
};