const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Validator = require("fastest-validator");
const uuid = require("uuid");
const errorHandler = require('../middleware/error_handler');
const { transaction, user, transaction_detail, product } = require('../models');


const v = new Validator();
exports.store = async (req, res) => {
    
    // kita butuh id, user_id, status
    // id digenerate uuid
    // user_id nanti kita kirim, status

    const Schema = {
        user_id: "string|empty:false",
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
      const addTransaction = await transaction.create({
        user_id: req.body.user_id,
        status: req.body.status,
        transaction_id: uuid.v4(),
      });
    
      return res.status(201).json({
        status: "success",
        data: addTransaction,
      });

    
}



exports.getById = async (req, res) => {
    
    
    // kita tangkap paramater
    // kalo ada idnya kita balikkin orderannya sesuai yang punya siapa
    console.log(req.query)

    const Schema = {
        user_id: "string|empty:false",
      };

      const validate = v.validate(req.query, Schema);

      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }

      console.log(req.body)
      const TransactionByUser = await transaction.findAll({where: {
          user_id: req.query.user_id
      }})

      const dataUser = await user.findOne({ where: {
          id: req.query.user_id
      }})

      console.log(dataUser)
      console.log(TransactionByUser)
      let finalTransactionData = []

      if(TransactionByUser){
        TransactionByUser.map((item, index) => {
            
            let statusOrder
            if(item.status == 1){
                statusOrder = "Belum Dibayar"
            } else if(item.status == 2) {
                statusOrder = "Sudah Dibayar"
            } else if(item.status == 3) {
                statusOrder = "Belum Dikirim"
            } else if(item.status == 4) {
                statusOrder = "Sudah Dikirim"
            } else if(item.status == 5) {
                statusOrder = "Sudah Diterima"
            } else {
                statusOrder = "status Tidak Diketahui"
            }
            
            finalTransactionData.push({
                transaction_id: item.transaction_id,
                user_id: item.user_id,
                nama_lengkap: dataUser.nama_lengkap,
                email: dataUser.email,
                status: statusOrder,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            })
          })
      } 


      return res.status(201).json({
        status: "success",
        data: finalTransactionData,
      });

    
}


exports.getByIdTransaction = async (req, res) => {

 // kita tangkap paramater
    // kalo ada idnya kita balikkin orderannya sesuai yang punya siapa
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


      // temukan semua item
      let detailTransaction = await transaction_detail.findAll({
          where : {
            transaction_id: req.query.transaction_id
          }
      })


      let item = [], transaction_data

      // temukan detail transaksi
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

      // cetak detail transaction

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

 const getDataProduk = async (produk) => {

       const data = await product.findOne({
           where: {
               id: produk
           }
       })

       console.log(data)
       return data
 }