import { models } from '../models/Sequelize-mysql.js';
import { sequelize } from '../models/Sequelize-mysql.js';

const handleError = (res, error, status = 500) => {
  console.error(error);
  res.status(status).json({ error: error.message || 'Internal Server Error' });
};

// Create a withdrawal request
export const createWithdrawalRequest = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { clerk_id, amount, currency, payment_method } = req.body;
    if (!req.user || req.user.clerk_id !== clerk_id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    if (!amount || amount <= 0 || !currency || !payment_method) {
      return res.status(400).json({ error: 'Invalid amount, currency, or payment method' });
    }
    const wallet = await models.Wallet.findOne({ where: { clerk_id, currency }, transaction });
    if (!wallet || wallet.balance < amount) {
      await transaction.rollback();
      return res.status(400).json({ error: 'Insufficient balance' });
    }
    await wallet.update({ balance: wallet.balance - amount, last_updated: new Date() }, { transaction });
    const withdrawal = await models.WithdrawalRequests.create({
      clerk_id,
      amount,
      currency,
      payment_method,
      status: 'pending',
    }, { transaction });
    await transaction.commit();
    res.status(201).json(withdrawal);
  } catch (error) {
    await transaction.rollback();
    handleError(res, error);
  }
};

// Get withdrawal requests by clerk_id
export const getWithdrawalRequestsByClerkId = async (req, res) => {
  try {
    const { clerk_id } = req.params;
    if (!req.user || (req.user.clerk_id !== clerk_id && req.user.user_role !== 'admin')) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const withdrawals = await models.WithdrawalRequests.findAll({ where: { clerk_id } });
    res.json(withdrawals);
  } catch (error) {
    handleError(res, error);
  }
};

// Update withdrawal request status (admin-only)
export const updateWithdrawalRequest = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { status, transaction_id } = req.body;
    if (!req.user || req.user.user_role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const withdrawal = await models.WithdrawalRequests.findByPk(id, { transaction });
    if (!withdrawal) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Withdrawal request not found' });
    }
    if (withdrawal.status !== 'pending') {
      await transaction.rollback();
      return res.status(400).json({ error: 'Withdrawal request already processed' });
    }
    if (status === 'rejected') {
      const wallet = await models.Wallet.findOne({
        where: { clerk_id: withdrawal.clerk_id, currency: withdrawal.currency },
        transaction,
      });
      await wallet.update(
        { balance: wallet.balance + withdrawal.amount, last_updated: new Date() },
        { transaction }
      );
    }
    await withdrawal.update(
      { status, transaction_id, processed_at: status === 'approved' ? new Date() : null },
      { transaction }
    );
    await transaction.commit();
    res.json(withdrawal);
  } catch (error) {
    await transaction.rollback();
    handleError(res, error);
  }
};