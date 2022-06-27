'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'example@example.com',
      password:'123456',
      firstName:'nghi',
      lastName:'nghi',
      address:'VN',
      gender:'1',
      typeRole:'ROLE',
      keyRole:'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize)  {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
