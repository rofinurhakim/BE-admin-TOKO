const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Validator = require("fastest-validator");
const uuid = require("uuid");
const errorHandler = require('../middleware/error_handler');
const { transaction, user, transactions_details, product } = require('../models');
const paginate = require("express-paginate");
const { Op } = require("sequelize");


// transaction.hasMany(transaction_details, {
//   foreignKey: 'transaction_id'
// });

const v = new Validator();
exports.store = async (req, res) => {
    
   
    const { products } = req.body;

    const Schema = {
          user_id: "string|empty:false",
          products: "array|min:1",
          status: "number|empty:false",
      };

      const validate = v.validate(req.body, Schema);

      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }

      console.log(req.body)

      try {
        const addTransaction = await transaction.create({
          user_id: req.body.user_id,
          status: req.body.status,
          transaction_id: uuid.v4(),
        });
        if (addTransaction) {
          const transaction_detail_data = await products.map( async (item) => {
            let data_list = [];
            await transactions_details.create({
                product_id: item.id,
                transaction_id: addTransaction.transaction_id,
                qty: item.quantity,
                price: item.price,
                totalPrice: item.quantity * item.price,
                id: uuid.v4()
            }).then(data => data_list.push(data));

          })
          
          return res.status(201).json({
            status: "success",
            data: addTransaction,
            data_detail: transaction_detail_data
          }); 
        }
      } catch (err) {
          return errorHandler(res, 500, 'Internal Server Error', err);
      }
}

exports.getById = async (req, res) => {
   
      const { id } = req.params 
      const TransactionByUser = await transaction.findAll({
          where: {
            user_id: id,
            // transaction_id: id
          },
          include: transactions_details
        })
     
      return res.status(201).json({
        status: "success",
        data: TransactionByUser,
      });
}

exports.getByIdTransaction = async (req, res) => {
    console.log(req.query)

    const Schema = {
        transaction_id: "string|empty:false",
      };

      const validate = v.validate(req.query, Schema);

      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }
      let detailTransaction = await transaction_detail.findAll({
          where : {
            transaction_id: req.query.transaction_id
          }
      })

      let item = [], transaction_data
      const transactionData = await transaction.findOne({where: {
        transaction_id : req.query.transaction_id
      }})

      const userData = await user.findOne({where: {
            id: transactionData.user_id
      }})

      console.log(detailTransaction)
      console.log(transactionData)
      console.log(userData)

      let statusOrder
            if(transactionData.status == 1){
                statusOrder = "Belum Dibayar"
            } else if(transactionData.status == 2) {
                statusOrder = "Sudah Dibayar"
            } else if(transactionData.status == 3) {
                statusOrder = "Belum Dikirim"
            } else if(transactionData.status == 4) {
                statusOrder = "Sudah Dikirim"
            } else if(transactionData.status == 5) {
                statusOrder = "Sudah Diterima"
            } else {
                statusOrder = "status Tidak Diketahui"
            }

      transaction_data = {
          id_transaksi: req.query.transaction_id,
          nama_lengkap: userData.nama_lengkap,
          email: userData.email,
          waktu_pesanan: transactionData.createdAt,
          status: statusOrder
      }

      if(detailTransaction){
         detailTransaction.map((data, index) => {
                item.push({    
                    qty: data.qty,
                    price: data.price,
                    totalPrice: data.totalPrice
                })
         })
      }
      return res.status(200).json({
        status: "success",
        data: {
            transaction_data,
            item
        }
      });
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
      user_id: {
        [Op.like]: `%${search}%`,
      },
    };
  }

  const transactionAll = transaction.findAndCountAll({
    where: condition,
    order: [[orderby, orderdir]],
    limit: limit,
    offset: offset,
  });

  transactionAll.then((result) => {
    const itemCount = res.count;
    const pageCount = Math.ceil(result.count / limit);

    res.status(200).json({
      status: "success",
      transaction: result.rows,
      pageCount,
      itemCount,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
    });
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

  const deleteTransaction = transaction.destroy({
    where: {
      id: req.params.id,
    },
  });

  deleteTransaction.then((result) => {
    res.status(200).json({
      status: "success",
      message: "Transaction berhasil dihapus ",
    });
  });
};