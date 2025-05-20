import { models } from '../models/Sequelize-mysql.js';

const handleError = (res, error, status = 500) => {
  console.error(error);
  res.status(status).json({ error: error.message || 'Internal Server Error' });
};

// Get wallet by clerk_id
export const getWalletByClerkId = async (req, res) => {
  try {
    const { clerk_id } = req.params;
    if (!req.user || (req.user.clerk_id !== clerk_id && req.user.user_role !== 'admin')) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const wallets = await models.Wallet.findAll({ where: { clerk_id } });
    res.json(wallets);
  } catch (error) {
    handleError(res, error);
  }
};

// Update wallet balance (admin-only)
export const updateWalletBalance = async (req, res) => {
  try {
    const { clerk_id } = req.params;
    const { balance, currency } = req.body;
    if (!req.user || req.user.user_role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    if (balance < 0 || !currency) {
      return res.status(400).json({ error: 'Invalid balance or currency' });
    }
    const wallet = await models.Wallet.findOne({ where: { clerk_id, currency } });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }
    await wallet.update({ balance, last_updated: new Date() });
    res.json(wallet);
  } catch (error) {
    handleError(res, error);
  }
};