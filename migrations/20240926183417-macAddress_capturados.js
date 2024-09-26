"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("macAddress_capturados", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_fk_esp_macAdress: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      MAC: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      fabricante: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      data_hora_captura: {
        type: Sequelize.DATE, 
        allowNull: true,
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
    await queryInterface.dropTable("macAddress_capturados");
  }
};