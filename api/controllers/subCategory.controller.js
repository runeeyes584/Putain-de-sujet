import { models } from "../models/Sequelize-mysql.js";

// Tạo subcategory
export const createSubCategory = async (req, res, next) => {
  try {
    const { category_id, name, description } = req.body;

    if (!category_id || !name) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: category_id or name",
      });
    }

    // Kiểm tra category_id hợp lệ
    const category = await models.Category.findByPk(category_id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const subCategory = await models.SubCategory.create({
      category_id,
      name,
      description,
    });

    console.log(`SubCategory created: id=${subCategory.id}`);
    return res.status(201).json({
      success: true,
      message: "SubCategory created successfully",
      data: subCategory,
    });
  } catch (error) {
    console.error("Error creating subcategory:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error creating subcategory",
      error: error.message,
    });
  }
};

// Lấy tất cả subcategory
export const getAllSubCategories = async (req, res, next) => {
  try {
    const { category_id, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const where = category_id ? { category_id } : {};

    const subCategories = await models.SubCategory.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{ model: models.Category, attributes: ["id", "name"] }],
    });

    return res.status(200).json({
      success: true,
      total: subCategories.count,
      pages: Math.ceil(subCategories.count / limit),
      data: subCategories.rows,
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching subcategories",
      error: error.message,
    });
  }
};

// Lấy subcategory theo ID
export const getSubCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subCategory = await models.SubCategory.findByPk(id, {
      include: [{ model: models.Category, attributes: ["id", "name"] }],
    });

    if (!subCategory) {
      return res
        .status(404)
        .json({ success: false, message: "SubCategory not found" });
    }

    return res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    console.error("Error fetching subcategory:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching subcategory",
      error: error.message,
    });
  }
};

// Cập nhật subcategory
export const updateSubCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category_id, name, description } = req.body;

    const subCategory = await models.SubCategory.findByPk(id);
    if (!subCategory) {
      return res
        .status(404)
        .json({ success: false, message: "SubCategory not found" });
    }

    if (category_id) {
      const category = await models.Category.findByPk(category_id);
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
    }

    await subCategory.update({
      category_id: category_id || subCategory.category_id,
      name: name || subCategory.name,
      description:
        description !== undefined ? description : subCategory.description,
    });

    console.log(`SubCategory updated: id=${id}`);
    return res.status(200).json({
      success: true,
      message: "SubCategory updated successfully",
      data: subCategory,
    });
  } catch (error) {
    console.error("Error updating subcategory:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error updating subcategory",
      error: error.message,
    });
  }
};

// Xóa subcategory
export const deleteSubCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subCategory = await models.SubCategory.findByPk(id);

    if (!subCategory) {
      return res
        .status(404)
        .json({ success: false, message: "SubCategory not found" });
    }

    // Kiểm tra xem subcategory có gigs liên quan không
    const gigCount = await models.Gig.count({ where: { subcategory_id: id } });
    if (gigCount > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete subcategory with associated gigs",
      });
    }

    await subCategory.destroy();
    console.log(`SubCategory deleted: id=${id}`);
    return res
      .status(200)
      .json({ success: false, message: "SubCategory deleted successfully" });
  } catch (error) {
    console.error("Error deleting subcategory:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error deleting subcategory",
      error: error.message,
    });
  }
};
