'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        onDelete: "CASCADE"
      },
      name: {
        type: Sequelize.STRING
      }
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable("categories");
  }
};
