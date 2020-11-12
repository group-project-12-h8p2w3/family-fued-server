'use strict';

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Answers', 'QuestionId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Questions'
        },
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Answers, QuestionId')
 
  }
};
