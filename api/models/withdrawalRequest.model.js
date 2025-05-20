import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const WithdrawalRequest = sequelize.define('WithdrawalRequest', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clerk_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    processed_at: {
      type: DataTypes.DATE,
    },
    transaction_id: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'withdrawal_requests',
    timestamps: false,
    indexes: [
      {
        fields: ['clerk_id'],
      },
    ],
  });

  return WithdrawalRequest;
};