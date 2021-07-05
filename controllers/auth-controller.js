const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const uuid = require('uuid')
const Validator = require("fastest-validator");
const paginate = require("express-paginate");
const { Op } = require("sequelize");

const errorHandler = require('../middleware/error_handler');
const { user } = require('../models');
const v = new Validator();


exports.register = async (req, res) => {
    const err = validationResult(req);

    
    if (!err.isEmpty()) {
        return errorHandler(res, 422, 'Error Input', err.errors);
    }

    const { password } = req.body;
    const passwordHashed = bcrypt.hashSync(password, 10);

    try {
        let userData = await user.create(
            {...req.body, password: passwordHashed, id: uuid.v4() }
            // Object.assign(req.body, {password: passwordHashed})
        );
        if (userData) {
            const dataReturn = await user.authorize(userData.id);
            return res.status(201).json(dataReturn);
        }

    } catch (err) {
        return errorHandler(res, 500, 'Internal Server Error', err);
    }
    const addUsers = await product.create({
      nama_lengkap: req.body.nama_lengkap,
      email: req.body.email,
      password: req.body.password,
      id: uuid.v4(),
    });
  
    return res.status(201).json({
      status: "success",
      data: addUsers,
    });  

}

exports.login = async (req, res) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
        return errorHandler(res, 422, 'Error Input', err.errors);
    }

    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Masukan email dan password'
        });
    }

    // const User = user;
    try {
        const userData = await user.authenticate(email, password);
        if (userData) {
            const dataReturn = await user.authorize(userData.id);
            return res.status(200).json(dataReturn);
        }

        return errorHandler(res, 422, 'Login failed', 'Email or password wrong');
    } catch (err) {
        return errorHandler(res, 500, 'Internal Server Error', err);
    }
}


 


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
      nama_lengkap: {
        [Op.like]: `%${search}%`,
      },
    };
  }

  const UsersAll = user.findAndCountAll({
    where: condition,
    order: [[orderby, orderdir]],
    limit: limit,
    offset: offset,
  });

  UsersAll.then((result) => {
    const itemCount = res.count;
    const pageCount = Math.ceil(result.count / limit);

    res.status(200).json({
      status: "success",
      user: result.rows,
      pageCount,
      itemCount,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
    });
  });
};

exports.getone = async (req, res) => {
  const { id } = req.params;

  const getUsers = product.findOne({
    attributes: ["nama_lengkap", "password", "email"],
    where: {
      id,
    },
  });

  getUsers.then((result) => {
    res.status(200).json({
      status: "success",
      user: result,
    });
  });
};

exports.update = async (req, res) => {
  const { id } = req.params;

  const Schema = {
    nama_lengkap: "string|empty:false",
    email: "string|empty:false",
    password: "number|empty:false",
   
  };

  const validate = v.validate(req.body, Schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const updateUsers = await user.update(
    {
      nama_lengkap: req.body.nama_lengkap,
      password: req.body.password,
      email: req.body.email
    },
    {
      where: {
        id,
      },
    }
  );

  return res.status(200).json({
    status: "success",
    data: updateUsers,
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

  const deleteUsers = user.destroy({
    where: {
      id: req.params.id,
    },
  });

  deleteUsers.then((result) => {
    res.status(200).json({
      status: "success",
      message: "Users berhasil dihapus ",
    });
  });
};
