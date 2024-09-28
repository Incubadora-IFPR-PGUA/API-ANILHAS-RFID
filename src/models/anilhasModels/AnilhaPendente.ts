import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../instances/mysql";

export class AnilhaPendente extends Model {
  public id!: number;
  public nome!: string;
  public numero_anilha!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

AnilhaPendente.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    numero_anilha: {
      type: DataTypes.STRING(10),
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
    tableName: "anilhas_pendentes",
  }
);
