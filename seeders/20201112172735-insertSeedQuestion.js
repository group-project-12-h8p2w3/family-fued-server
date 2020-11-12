'use strict';

const fs = require('fs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const file = JSON.parse(fs.readFileSync('./newquestion.json', 'utf8'))
    file.forEach(quest=> {
      quest.createdAt = new Date()
      quest.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Questions', file, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Questions', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
