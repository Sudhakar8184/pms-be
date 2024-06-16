

const errorResponse = (res, error) => {
    const statusCode = error.statusCode || 500
        res.status(statusCode).send({
            success: false,
            error: error.message || error
        })
   
}

module.exports = {
    errorResponse
}