'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("posts_categories", {
      postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'post_id',
        onDelete: 'CASCADE',
        references: {
          model: 'blog_posts',
          key: 'id',
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        field: 'category_id',
        primaryKey: true,
        onDelete: 'CASCADE',
        references: {
          model: 'categories',
          key: 'id',
        },
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("posts_categories");

  }
};
