'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Answers', 'QuestionId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Questions',
          key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Answers', 'QuestionId')
 
  }
};
