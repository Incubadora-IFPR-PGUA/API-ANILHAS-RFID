import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { AnilhaCadastrada } from './AnilhaCadastrada';

export class AnilhaRegistro extends Model {
  public id!: number;
  public anilha_id!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

AnilhaRegistro.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    anilha_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "anilhas_registros",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

AnilhaRegistro.belongsTo(AnilhaCadastrada, { as: 'cadastro', foreignKey: 'anilha_id' });