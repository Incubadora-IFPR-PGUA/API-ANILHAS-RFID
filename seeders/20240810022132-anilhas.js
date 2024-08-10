'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('anilhas', [
      {
        nome: 'Anilha A',
        codigo: 'AAA123',
        entrada: '2024-08-20 23:31:18',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Anilha B',
        codigo: 'BBB123',
        entrada: '2024-08-20 23:31:18',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Anilha C',
        codigo: 'CCC123',
        entrada: '2024-08-20 23:31:18',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('anilhas', null, {});
  }
};