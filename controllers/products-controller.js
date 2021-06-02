const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const errorHandler = require('../middleware/error_handler');
const uuid = require('uuid')
const products = require('../models/products');

const v = new Validator()

exports.store = async (req, res) => {


    console.log('sudah jalan')
    console.log(req.body)

    const Schema = {
        'nama_product': 'string|empty:false',
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

    const addProduct = await products.create({...req.body, id: uuid.v4()})

    return res.status(201).json({
        status: 'success',
        data: addProduct
    })
    
}


exports.getall = async (req, res) => {


    const productAll = await products.findAll()

    return res.json({
        status: 'success',
        data: productAll
    })
}