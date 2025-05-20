import { DataTypes } from "sequelize";

const GigPackage = (sequelize) =>
  sequelize.define(
    "GigPackage",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      gig_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "gigs",
          key: "id",
        },
      },
      package_name: {
        type: DataTypes.ENUM('Basic', 'Standard', 'Premium'),
        allowNull: false,
        defaultValue: 'Basic',
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      delivery_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      revisions: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "gig_packages",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["gig_id", "package_name"],
        },
      ],
    }
  );

export default GigPackage;