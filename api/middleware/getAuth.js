import { models } from "../models/Sequelize-mysql.js";

export const authenticateAndLoadUser = async (req, res, next) => {
  if (!req.auth || !req.auth.userId) {
    console.error("authenticateAndLoadUser: req.auth.userId is missing. Clerk authentication might have failed.");
    
    // Optional fallback bằng token nếu cần
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      const err = new Error("Unauthorized: No Clerk user ID or token provided");
      err.status = 401;
      return next(err);
    }

    req.auth = { userId: token }; // Giả lập nếu token là userId
    console.warn("Fallback: using token as Clerk user ID (not secure in production)");
  }

  const clerkId = req.auth.userId;

  try {
    const user = await models.User.findOne({
      where: { clerk_id: clerkId },
      attributes: ['id', 'clerk_id', 'user_roles']
    });

    if (!user) {
      const err = new Error("User not found in application database.");
      err.status = 401;
      return next(err);
    }

    req.user = user.toJSON();
    console.log(`✅ User ${clerkId} authenticated with roles:`, req.user.user_roles);
    next();
  } catch (error) {
    console.error("❌ Error loading user from DB:", error);
    const err = new Error("Failed to load user from database.");
    err.status = 500;
    next(err);
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user || !Array.isArray(req.user.user_roles)) {
    const err = new Error("User role data is missing or invalid.");
    err.status = 500;
    return next(err);
  }

  if (!req.user.user_roles.includes("admin")) {
    const err = new Error("Forbidden: Admin access required.");
    err.status = 403;
    return next(err);
  }

  console.log(`✅ Admin access granted to ${req.user.clerk_id}`);
  next();
};

export const isSeller = (req, res, next) => {
  if (!req.user || !Array.isArray(req.user.user_roles)) {
    const err = new Error("User role data is missing or invalid.");
    err.status = 500;
    return next(err);
  }

  if (!req.user.user_roles.includes("employer")) {
    const err = new Error("Forbidden: Seller (employer) access required.");
    err.status = 403;
    return next(err);
  }

  console.log(`✅ Seller access granted to ${req.user.clerk_id}`);
  next();
};
