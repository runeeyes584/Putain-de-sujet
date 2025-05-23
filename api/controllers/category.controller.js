import { models } from '../models/Sequelize-mysql.js';

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim() === '') {
      const error = new Error("Category name is required and must be a non-empty string.");
      error.status = 400;
      return next(error);
    }
    const trimmedName = name.trim();
    const newCategory = await models.Category.create({ name: trimmedName });
    console.log(`Category created: id=${newCategory.id}`);
    res.status(201).json({ success: true, message: 'Category created successfully', category: newCategory });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const err = new Error(`Category name '${req.body.name}' already exists.`);
      err.status = 409;
      return next(err);
    }
    console.error('Error creating category:', error.message);
    next(error);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await models.Category.findAll();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await models.Category.findByPk(id);
    if (!category) {
      const error = new Error('Category not found');
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.error('Error fetching category by ID:', error.message);
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim() === '') {
      const error = new Error("Category name is required and must be a non-empty string.");
      error.status = 400;
      return next(error);
    }
    const trimmedName = name.trim();
    const category = await models.Category.findByPk(id);
    if (!category) {
      const error = new Error('Category not found');
      error.status = 404;
      return next(error);
    }
    category.name = trimmedName;
    await category.save();
    console.log(`Category updated: id=${id}`);
    res.status(200).json({ success: true, message: 'Category updated successfully', category });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const err = new Error(`Category name '${req.body.name}' already exists.`);
      err.status = 409;
      return next(err);
    }
    console.error('Error updating category:', error.message);
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    const category = await models.Category.findByPk(categoryId);
    if (!category) {
      const error = new Error('Category not found');
      error.status = 404;
      return next(error);
    }

    const gigCount = await models.Gig.count({ where: { category_id: categoryId } });
    const searchHistoryCount = await models.UserSearchHistory.count({ where: { category_id: categoryId } });

    if (gigCount > 0 || searchHistoryCount > 0) {
      const error = new Error(`Cannot delete category because it is currently used by ${gigCount} gig(s) and ${searchHistoryCount} search history record(s).`);
      error.status = 409;
      return next(error);
    }

    await category.destroy();
    console.log(`Category deleted: id=${categoryId}`);
    res.status(204).send();
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      const err = new Error("Cannot delete category due to database constraints (referenced by other records).");
      err.status = 409;
      return next(err);
    }
    console.error('Error deleting category:', error.message);
    next(error);
  }
};
