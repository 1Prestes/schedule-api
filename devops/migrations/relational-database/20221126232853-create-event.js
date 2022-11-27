'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      idevent: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      initial_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      final_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      place: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      iduser: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'iduser',
        },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  }
};
