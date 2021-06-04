const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const errorHandler = require('../middleware/error_handler');
const uuid = require('uuid')
const { booking, user, dorm, product} = require('../models/');

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


    const productAll = await product.findAll()

    return res.json({
        status: 'success',
        data: productAll
    })
}