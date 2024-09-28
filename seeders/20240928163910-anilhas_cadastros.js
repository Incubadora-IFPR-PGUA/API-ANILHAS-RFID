"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("anilhas_cadastros", [
      {
        nome: "CORUJA BURAQUEIRA",
        numero_anilha: "AAA000BCDE",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("anilhas_cadastros", null, {});
  }
};