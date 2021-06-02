const fetchData = (allError) => {
    console.log(allError);
    return {
        field: allError[0].param,
        msg: allError[0].msg
    }
}

const errrHandler = (res, errStatus, message, data) => {
    if (typeof data == 'object') {
        data = fetchData(data);
    }

    return res.status(errStatus).send({
        statusCode: errStatus,
        message,
        data
    });
}

module.exports = errrHandler;
