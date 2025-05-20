import { DataTypes } from "sequelize";

const SubCategory = (sequelize) => 
  sequelize.define(
    "SubCategory",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "SubCategories",
      timestamps: false,
      indexes: [
        {
          fields: ["category_id"],
        },
      ],
    }
  );

  export default SubCategory;
