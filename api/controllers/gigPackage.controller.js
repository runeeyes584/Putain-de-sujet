import { models } from '../models/Sequelize-mysql.js';

const handleError = (res, error, status = 500) => {
  console.error(error);
  res.status(status).json({ error: error.message || 'Internal Server Error' });
};

// Create a gig package
export const createGigPackage = async (req, res) => {
  try {
    const { gig_id, package_name, description, price, delivery_time, revisions } = req.body;
    const gig = await models.Gig.findByPk(gig_id);
    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }
    if (!req.user || req.user.clerk_id !== gig.seller_clerk_id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    if (!package_name || !price || !delivery_time) {
      return res.status(400).json({ error: 'Package name, price, and delivery time are required' });
    }
    const gigPackage = await models.GigPackage.create({
      gig_id,
      package_name,
      description,
      price,
      delivery_time,
      revisions,
    });
    res.status(201).json(gigPackage);
  } catch (error) {
    handleError(res, error);
  }
};

// Get gig packages by gig_id
export const getGigPackagesByGigId = async (req, res) => {
  try {
    const { gig_id } = req.params;
    const packages = await models.GigPackage.findAll({ where: { gig_id } });
    res.json(packages);
  } catch (error) {
    handleError(res, error);
  }
};

// Update a gig package
export const updateGigPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { package_name, description, price, delivery_time, revisions } = req.body;
    const gigPackage = await models.GigPackage.findByPk(id, {
      include: [{ model: models.Gig, attributes: ['seller_clerk_id'] }],
    });
    if (!gigPackage) {
      return res.status(404).json({ error: 'Gig package not found' });
    }
    if (!req.user || req.user.clerk_id !== gigPackage.Gig.seller_clerk_id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await gigPackage.update({ package_name, description, price, delivery_time, revisions });
    res.json(gigPackage);
  } catch (error) {
    handleError(res, error);
  }
};

// Delete a gig package
export const deleteGigPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const gigPackage = await models.GigPackage.findByPk(id, {
      include: [{ model: models.Gig, attributes: ['seller_clerk_id'] }],
    });
    if (!gigPackage) {
      return res.status(404).json({ error: 'Gig package not found' });
    }
    if (!req.user || req.user.clerk_id !== gigPackage.Gig.seller_clerk_id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await gigPackage.destroy();
    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
};