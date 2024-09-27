'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('smartHorta_esp', [
      {
        umidade_solo: 10,
        umidade_ar: 12,
        temperatura_ar: 28,
        luz_ambiente: 'Claro',
        hora_atualizacao: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('smartHorta_esp', null, {});
  }
};