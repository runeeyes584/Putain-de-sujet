import { models } from "../models/Sequelize-mysql.js";

export const getDashboardSummary = async (req, res, next) => {
  try {
    const totalUsers = await models.User.count();
    const totalGigs = await models.Gig.count();
    res.json({ totalUsers, totalGigs });
  } catch (err) {
    next(err);
  }
}; 