const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const errorHandler = require('../middleware/error_handler');
const uuid = require('uuid')
const { booking, user, dorm, product} = require('../models/');
const { Result } = require('express-validator');
const paginate = require('express-paginate')

const v = new Validator()

exports.store = async (req, res) => {


    console.log('sudah jalan')
    console.log(req.body)

    const Schema = {
        'nama_products': 'string|empty:false',
        'deskripsi': 'string|empty:false',
        'rating': 'number',
        'price': 'number|empty:false',
        'stock': 'number|empty:false'
    }

    const validate = v.validate(req.body, Schema)

    if(validate.length){
        return res.status(400).json({
            status: 'error',
            'message': validate
        })
    }

    const addProduct = await product.create({...req.body, id: uuid.v4()})

    return res.status(201).json({
        status: 'success',
        data: addProduct
    })
    
}


exports.getall = async (req, res) => {
  const productAll = product.findAndCountAll({limit: req.query.limit, offset: req.skip})

  productAll.then(result => {
      console.log(res)

      const itemCount = res.count;
      const pageCount = Math.ceil(result.count / req.query.limit);

      res.status(200).json({
          status: 'success',
          products: result.rows,
          pageCount,
          itemCount,
          pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
      })
  })

  
}

exports.update = async (req, res) => {
    const id = req.params.id;
  
    try {
      return await product.update(req.body, {
        where: {
          id,
        },
      }).then(() => {
        res.json({
          status: true,
          message: `Berhasil melakukan update data ${id}`,
        });
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        error:
          error.message || `Gagal mengubah / mengupdate data dengan id ${id}`,
      });
    }
  };

  exports.destroy = async (req, res) => {
    const id = req.params.id;
  
    try {
      return await product.destroy({
        where: {
          id,
        },
      }).then(() => {
        res.json({
          status: true,
          message: `Berhasil melakukan delete data dengan id ${id}`,
        });
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        error: error.message || `Gagal menghapus data dengan id ${id}`,
      });
    }
  };
