'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('macAddress_capturados', [
      {
        id_fk_esp_macAdress: 1,
        MAC: '24-FE-9A-06-42-CB',
        fabricante: 'CyberTAN Technology Inc.',
        data_hora_captura: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('macAddress_capturados', null, {});
  }
};