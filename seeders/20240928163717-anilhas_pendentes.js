"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("anilhas_pendentes", [
      {
        nome: "ANILHA NÃO IDENTIFICADA",
        numero_anilha: "ABCDEF1234",
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("anilhas_pendentes", null, {});
  }
};