'use strict';

const fs = require('fs')
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const data = JSON.parse(fs.readFileSync('./newanswer.json', 'utf8'))
    data.forEach(answ=> {
      answ.createdAt = new Date()
      answ.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Answers', data, {})
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
    await queryInterface.bulkDelete('Answers', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
