import { DataTypes } from "sequelize";

const Gig = (sequelize) =>
  sequelize.define(
    "Gig",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      seller_clerk_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: "user_account",
          key: "clerk_id",
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category",
          key: "id",
        },
      },
      job_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "job_type",
          key: "id",
        },
      },
      tags: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [], // Đặt giá trị mặc định là mảng rỗng để tránh lỗi khi tags chưa được nhập
        validate: {
          isArray: (value) => Array.isArray(value), // Đảm bảo giá trị là mảng
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      starting_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      delivery_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gig_image: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      gig_video: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "active",
      },
    },
    {
      tableName: "gigs",
      timestamps: false,
    }
  );

export default Gig;