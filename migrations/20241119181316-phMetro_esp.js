'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('phMetro_esp', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ph: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      escala: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_hora_atualizacao: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      id_fk_esp_macAdress: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "macAddress_esp",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('phMetro_esp');
  },
};
