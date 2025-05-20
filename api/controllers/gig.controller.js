import { models } from "../models/Sequelize-mysql.js";
import { Op } from "sequelize";

// Tạo gig
export const createGig = async (req, res, next) => {
  try {
    const {
      seller_clerk_id,
      category_id,
      job_type_id,
      title,
      description,
      starting_price,
      delivery_time,
      gig_image,
      city,
      country,
      tags = [],
    } = req.body;
    if (!seller_clerk_id || !title) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: seller_clerk_id or title",
      });
    }

    // Kiểm tra định dạng tags
    if (!Array.isArray(tags)) {
      return res.status(400).json({
        success: false,
        message: "Tags must be an array",
      });
    }
    const gig = await models.Gig.create({
      seller_clerk_id,
      category_id,
      job_type_id,
      title,
      description,
      starting_price,
      delivery_time,
      gig_image,
      city,
      country,
      tags,
    });
    console.log(`Gig created: id=${gig.id}`);
    return res
      .status(201)
      .json({ success: true, message: "Gig created successfully", gig });
  } catch (error) {
    console.error("Error creating gig:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error creating gig",
      error: error.message,
    });
  }
};

// Lấy tất cả gig (phân trang và lọc)
export const getAllGigs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      category_id,
      sub_category_id,
      status,
      min_price,
      max_price,
      city,
      country,
      sort_by = "created_at",
      sort_order = "DESC",
    } = req.query;
    const offset = (page - 1) * limit;
    const where = {};
    if (category_id) where.category_id = category_id;
    if (sub_category_id) where.sub_category_id = sub_category_id;
    if (status) where.status = status;
    if (city) where.city = city;
    if (country) where.country = country;
    if (min_price || max_price) {
      where.starting_price = {};
      if (min_price) where.starting_price[Op.gte] = parseFloat(min_price);
      if (max_price) where.starting_price[Op.lte] = parseFloat(max_price);
    }

    const gigs = await models.Gig.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort_by, sort_order]],
      include: [
        { model: models.Category, attributes: ["id", "name"] },
        {
          model: models.SubCategory,
          attributes: ["id", "name"],
          required: false,
        },
        { model: models.JobType, attributes: ["id", "job_type"] },
        {
          model: models.GigPackage,
          attributes: [
            "id",
            "package_name",
            "price",
            "delivery_time",
            "revisions",
          ],
        },
        { model: models.Review, attributes: ["id", "rating", "comment"] },
      ],
    });

    return res.status(200).json({
      success: true,
      total: gigs.count,
      pages: Math.ceil(gigs.count / limit),
      data: gigs.rows,
    });
  } catch (error) {
    console.error("Error fetching gigs:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching gigs",
      error: error.message,
    });
  }
};

// Lấy gig theo ID
export const getGigById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const gig = await models.Gig.findByPk(id);
    const gig = await models.Gig.findByPk(id, {
      include: [
        { model: models.Category, attributes: ["id", "name"] },
        {
          model: models.SubCategory,
          attributes: ["id", "name"],
          required: false,
        },
        { model: models.JobType, attributes: ["id", "job_type"] },
        {
          model: models.GigPackage,
          attributes: [
            "id",
            "package_name",
            "price",
            "delivery_time",
            "revisions",
          ],
        },
        {
          model: models.GigExtra,
          attributes: ["id", "title", "price", "extra_delivery_time"],
        },
        { model: models.GigFaq, attributes: ["id", "question", "answer"] },
        {
          model: models.Review,
          attributes: ["id", "rating", "comment", "reviewer_clerk_id"],
        },
        {
          model: models.User,
          as: "seller",
          attributes: ["clerk_id", "first_name", "last_name", "email"],
        },
      ],
    });

    if (!gig) {
      return res.status(404).json({ success: false, message: "Gig not found" });
    }
    return res.status(200).json({ success: true, gig });
  } catch (error) {
    console.error("Error fetching gig:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching gig",
      error: error.message,
    });
  }
};

// Cập nhật gig
export const updateGig = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      category_id,
      job_type_id,
      title,
      description,
      starting_price,
      delivery_time,
      gig_image,
      city,
      country,
      status,
      tags = [],
    } = req.body;
    const gig = await models.Gig.findByPk(id);

    if (!gig) {
      return res.status(404).json({ success: false, message: "Gig not found" });
    }
    // Kiểm tra định dạng tags
    if (!Array.isArray(tags)) {
      return res.status(400).json({
        success: false,
        message: "Tags must be an array",
      });
    }
    await gig.update({
      category_id,
      job_type_id,
      title,
      description,
      starting_price,
      delivery_time,
      gig_image,
      city,
      country,
      status,
      tags,
    });
    console.log(`Gig updated: id=${id}`);
    return res
      .status(200)
      .json({ success: true, message: "Gig updated successfully", gig });
  } catch (error) {
    console.error("Error updating gig:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error updating gig",
      error: error.message,
    });
  }
};

// Cập nhật trạng thái gig
export const updateGigStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['active', 'inactive', 'draft'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid or missing status' });
    }

    const gig = await models.Gig.findByPk(id);
    if (!gig) {
      return res.status(404).json({ success: false, message: 'Gig not found' });
    }

    // Kiểm tra quyền
    if (gig.seller_clerk_id !== req.user.clerk_id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized to update this gig' });
    }

    await gig.update({ status });
    console.log(`Gig status updated: id=${id}, status=${status}`);
    return res.status(200).json({ success: true, message: 'Gig status updated successfully', data: gig });
  } catch (error) {
    console.error('Error updating gig status:', error.message);
    return res.status(500).json({ success: false, message: 'Error updating gig status', error: error.message });
  }
};

// Xóa gig
export const deleteGig = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gig = await models.Gig.findByPk(id);
    if (!gig) {
      return res.status(404).json({ success: false, message: "Gig not found" });
    }
    await gig.destroy();
    console.log(`Gig deleted: id=${id}`);
    return res
      .status(200)
      .json({ success: true, message: "Gig deleted successfully" });
  } catch (error) {
    console.error("Error deleting gig:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error deleting gig",
      error: error.message,
    });
  }
};

// Tìm kiếm gig
export const searchGigs = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required field: keyword" });
    }
    // const gigs = await models.Gig.findAll({
    //   where: {
    //     title: {
    //       [Op.like]: `%${keyword}%`,
    //     },
    //   },
    // });
    const gigs = await models.Gig.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { "$tags::text": { [Op.like]: `%${keyword}%` } }, // Tìm kiếm trong mảng tags
        ],
      },
      include: [
        { model: models.Category, attributes: ["id", "name"] },
        {
          model: models.SubCategory,
          attributes: ["id", "name"],
          required: false,
        },
        { model: models.JobType, attributes: ["id", "job_type"] },
      ],
    });
    return res.status(200).json({ success: true, gigs });
  } catch (error) {
    console.error("Error searching gigs:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error searching gigs",
      error: error.message,
    });
  }
};
