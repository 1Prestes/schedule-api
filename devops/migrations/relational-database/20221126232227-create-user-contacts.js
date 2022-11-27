'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_contacts', {
      iduser_contact: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(80),
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(20),
        unique: true,
      },
      primary_email: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      primary_phone: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      iduser: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'iduser',
        },
      },
      idcontact: {
        type: Sequelize.UUID,
        references: {
          model: 'contacts',
          key: 'idcontact',
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
    await queryInterface.dropTable('user_contacts');
  }
};
