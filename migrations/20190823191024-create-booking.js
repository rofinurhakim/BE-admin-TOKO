'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dorm_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'dorms',
          key: 'id'
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      price: {
        type: Sequelize.INTEGER
      },
      date_entries: {
        type: Sequelize.DATE
      },
      duration: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('bookings');
  }
};