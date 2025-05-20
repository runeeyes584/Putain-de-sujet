import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Wallet = sequelize.define('Wallet', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clerk_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    currency: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'user_wallet',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['clerk_id', 'currency'],
      },
    ],
  });

  return Wallet;
};