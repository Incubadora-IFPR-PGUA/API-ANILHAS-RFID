import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../instances/mysql";

export class AnilhaCadastrada extends Model {
  public id!: number;
  public name!: string;
  public codigo!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

AnilhaCadastrada.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    codigo: {
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
    tableName: "anilhas_cadastros",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);
