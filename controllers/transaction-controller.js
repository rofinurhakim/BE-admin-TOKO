const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const errorHandler = require('../middleware/error_handler');
const uuid = require('uuid')
const transaction = require('../models/transaction');

const v = new Validator()

exports.store = async (req, res) => {


    console.log('sudah jalan')
    console.log(req.body)

    const Schema = {
        'user_id': 'varchar|empty:false',
        'status': 'number|empty:false',
        
    }

    const validate = v.validate(req.body, Schema)

    if(validate.length){
        return res.status(400).json({
            status: 'error',
            'message': validate
        })
    }

    const addTransaction = await transaction.create({...req.body, id: uuid.v4()})

    return res.status(201).json({
        status: 'success',
        data: addTransaction
    })
    
}


exports.getall = async (req, res) => {


    const TransactionAll = await transaction.findAll()

    return res.json({
        status: 'success',
        data: TransactionAll
    })
}