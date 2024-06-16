

const successResponse = (res, data, statusCode) => {
    if([200].includes(statusCode)){
        res.statusCode = statusCode;
        res.send({
            success: true,
            data: data
        })
    } else {
        res.send({
            success: false,
            message: data.message || data
        })
    }
   
}

module.exports = {
    successResponse
}