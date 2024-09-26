"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("smartHorta_esp", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED 
      },
      umidade_solo: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      umidade_ar: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      temperatura_ar: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      luz_ambiente: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      hora_atualizacao: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('NOW'),
        onUpdate: Sequelize.fn('NOW'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("smartHorta_esp");
  }
};