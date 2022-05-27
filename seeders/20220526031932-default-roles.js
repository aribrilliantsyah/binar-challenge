'use strict';

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
   
    await queryInterface.bulkInsert('role', [
      {
        'name': 'admin',
        'description': 'Can access all features',
        'createdAt': new Date(),
        'updatedAt': new Date(),
      },
      {
        'name': 'member',
        'description': 'Only access own data',
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

    await queryInterface.bulkDelete('role', [
      {
        'name': 'admin'
      },
      {
        'name': 'member'
      }
    ]);
  }
};
