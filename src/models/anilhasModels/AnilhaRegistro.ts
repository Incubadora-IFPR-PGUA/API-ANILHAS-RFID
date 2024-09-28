import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../instances/mysql";
import { AnilhaCadastrada } from "./AnilhaCadastrada";

export class AnilhaRegistro extends Model {
  public id!: number;
  public id_fk_anilha_cadastrada?: number;
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
    id_fk_anilha_cadastrada: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
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
  }
);