"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("anilhas-registros", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      codigo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      entrada: {
        type: Sequelize.DATE,
      },
      saida: {
        type: Sequelize.DATE,
      },
      cadastroId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'anilhas-cadastros',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("anilhas-registros");
  }
};