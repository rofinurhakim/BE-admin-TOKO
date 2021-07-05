const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const errorHandler = require("../middleware/error_handler");
const uuid = require("uuid");
const { booking, user, dorm, product } = require("../models/");
const { Result } = require("express-validator");
const paginate = require("express-paginate");
const { Op } = require("sequelize");

const v = new Validator();

exports.store = async (req, res) => {
  const filesUpload = req.files;

  let images = [];

  if (filesUpload.length) {
    filesUpload.map((item) => {
      images.push(`uploads/${item.filename}`);
    });
  } else {
    images.push(`uploads/no-image.png`);
  }

  const Schema = {
    nama_products: "string|empty:false",
    deskripsi: "string|empty:false",
    price: "string|empty:false",
    stock: "string|empty:false",
  };

  const validate = v.validate(req.body, Schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const addProduct = await product.create({
    nama_products: req.body.nama_products,
    deskripsi: req.body.deskripsi,
    price: req.body.price,
    stock: req.body.stock,
    image: images.toString(),
    id: uuid.v4(),
  });

  return res.status(201).json({
    status: "success",
    data: addProduct,
  });
};

exports.getall = async (req, res) => {
  let page = req.query.page ? req.query.page : 1;
  let limit = req.query.limit ? req.query.limit : 10;
  let offset = (page - 1) * limit;
  let search = req.query.search ? req.query.search : "";
  let condition = null;
  let orderby = req.query.orderby ? req.query.orderby : "createdAt";
  let orderdir = req.query.orderdir ? req.query.orderdir : "desc";

  if (search) {
    condition = {
      nama_products: {
        [Op.like]: `%${search}%`,
      },
    };
  }

  const productAll = product.findAndCountAll({
    where: condition,
    order: [[orderby, orderdir]],
    limit: limit,
    offset: offset,
  });

  productAll.then((result) => {
    const itemCount = res.count;
    const pageCount = Math.ceil(result.count / limit);

    res.status(200).json({
      status: "success",
      products: result.rows,
      pageCount,
      itemCount,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
    });
  });
};

exports.getone = async (req, res) => {
  const { id } = req.params;

  const getProduct = product.findOne({
    attributes: ["id","nama_products", "price", "stock", "deskripsi", "image"],
    where: {
      id,
    },
  });

  getProduct.then((result) => {
    res.status(200).json({
      status: "success",
      product: result,
    });
  });
};

exports.update = async (req, res) => {
  const { id } = req.params;

  const Schema = {
    nama_products: "string|empty:false",
    deskripsi: "string|empty:false",
    price: "string|empty:false",
    stock: "string|empty:false",
  };

  const validate = v.validate(req.body, Schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const updateProduct = await product.update(
    {
      nama_products: req.body.nama_products,
      deskripsi: req.body.deskripsi,
      price: req.body.price,
      stock: req.body.stock,
    },
    {
      where: {
        id,
      },
    }
  );

  return res.status(200).json({
    status: "success",
    data: updateProduct,
  });
};

exports.destroy = async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({
      status: "failed",
      message: "No ID are present on request parameters",
    });
    return;
  }

  const deleteProduct = product.destroy({
    where: {
      id: req.params.id,
    },
  });

  deleteProduct.then((result) => {
    res.status(200).json({
      status: "success",
      message: "Produk berhasil dihapus ",
    });
  });
};