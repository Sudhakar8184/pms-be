

const { errorResponse } = require('../../lib/errorResponse');
const { successResponse } = require('../../lib/successResponse');
require('../../app/models/members')
const { addMemberOnFile, addMember } = require('../../app/controller/memberController');
const { sendBulkMessages } = require('../../app/controller/whatsappController');

const addMemberOnFileHandler = async(req, res) => {

    try {
        const result = await addMemberOnFile(req)
        successResponse(res, result, 200)
    } catch (err) {
        errorResponse(res, err)
    }
   
}

const addMemberHandler = async(req, res) => {

    try {
        const result = await send(req.body)
        successResponse(res, result, 200)
    } catch (err) {
        errorResponse(res, err)
    }
   
}

const sendMemberMessageHandler = async(req, res) => {

    try {
        const result = await sendBulkMessages(req)
        successResponse(res, result, 200)
    } catch (err) {
        errorResponse(res, err)
    }
   
}

module.exports = {
    addMemberOnFileHandler,
    addMemberHandler,
    sendMemberMessageHandler
}