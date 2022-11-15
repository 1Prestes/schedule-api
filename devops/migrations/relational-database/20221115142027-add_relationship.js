'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user_contacts', 'idcontact', {
      type: Sequelize.UUID,
      references: {
        model: 'contacts',
        key: 'idcontact'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_contacts');
  }
};
