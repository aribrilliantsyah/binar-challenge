'use strict';
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    let defaultPass = bcrypt.hashSync('rahasia', salt);
    await queryInterface.bulkInsert('user_game', [
      {
        'uid': uuidv4(),
        'email': 'admin@ch.com',
        'username': 'adminganteng',
        'password': defaultPass,
        'token': '',
        'role_id': 1,
        'createdAt': new Date(),
        'updatedAt': new Date(),
      },
      {
        'uid': uuidv4(),
        'email': 'member@ch.com',
        'username': 'member1',
        'password': defaultPass,
        'token': '',
        'role_id': 2,
        'createdAt': new Date(),
        'updatedAt': new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('user_game', [
      {
        'username': 'adminganteng',
      },
      {
        'username': 'member1',
      }
     ]);
  }
};
