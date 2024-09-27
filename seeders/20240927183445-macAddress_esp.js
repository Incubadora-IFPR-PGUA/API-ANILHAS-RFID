'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('macAddress_esp', [
      {
        cliente_id: null,
        latitude: '-25.5889157',
        longitude: '-48.5637434',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('macAddress_esp', null, {});
  }
};