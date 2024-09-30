

const { errorResponse } = require('../../lib/errorResponse');
const { successResponse } = require('../../lib/successResponse');
require('../../app/models/members')
require('../../app/models/drugs')
require('../../app/models/memberDrugs')
require('../../app/models/user')
const { addMemberOnFile, addMember, addDrugOnFile, getDrugList, getMember, getNotificationList } = require('../../app/controller/memberController');
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
        const {timezone} = req.headers
        const result = await addMember(req.body, timezone)
        successResponse(res, result, 200)
    } catch (err) {
        errorResponse(res, err)
    }
   
}

const getMemberHandler = async(req, res) => {

    try {
        const {timezone} = req.headers
        const result = await getMember(req.body, timezone)
        successResponse(res, result, 200)
    } catch (err) {
        errorResponse(res, err)
    }
   
}

const sendMemberMessageHandler = async(req, res) => {

    try {
        const result = await sendBulkMessages(req)
        successResponse(res, {message: 'message send successfully'}, 200)
    } catch (err) {
        errorResponse(res, err)
    }
   
}

const addDrugOnFileHandler = async(req, res) => {

    try {
        const result = await addDrugOnFile(req)
        successResponse(res, result, 200)
    } catch (err) {
        errorResponse(res, err)
    }
   
}

const getDrugListHandler = async(req, res) => {

    try {
        const result = await getDrugList(req)
        successResponse(res, result, 200)
    } catch (err) {
        errorResponse(res, err)
    }
   
}

const getNotificationListHandler = async(req, res) => {

    try {
        const result = await getNotificationList(req)
        successResponse(res, result, 200)
    } catch (err) {
        errorResponse(res, err)
    }
   
}


module.exports = {
    addMemberOnFileHandler,
    addMemberHandler,
    sendMemberMessageHandler,
    addDrugOnFileHandler,
    getDrugListHandler,
    getMemberHandler,
    getNotificationListHandler
}