'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_contacts', {
      iduser_contact: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(80),
        allowNull: true,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      main_email: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      main_phone: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      user_iduser: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'iduser'
        }
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_contacts')
  }
};
