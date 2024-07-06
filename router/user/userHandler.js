const { login, register } = require("../../app/controller/userController")
const { errorResponse } = require("../../lib/errorResponse")
const { successResponse } = require("../../lib/successResponse")
require('../../app/models/user');


const loginHandler = async(req, res) => {
    try {
        const result = await login(req)
        successResponse(res, result, 200)
    } catch (err) {
        errorResponse(res, err)
    }
}



const registerHandler = async (req, res) => {
    try {
        const result = await register(req)
        successResponse(res, result, 200)
    } catch (err) {
        errorResponse(res, err)
    }
}

module.exports = {
    loginHandler,
    registerHandler
}