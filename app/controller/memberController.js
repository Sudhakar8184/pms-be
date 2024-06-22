const XLSX = require('xlsx');
var mongoose = require('mongoose');
const { sendBulkMessages } = require('./whatsappController');
const { calculateEndDate } = require('../../lib/utils');
var Member = mongoose.model('Members')
var Durg = mongoose.model('Durgs')
var MemberDurg = mongoose.model('MemberDurgs')

const addMemberOnFile = async (req) => {
    const filePath = req.file.path;

    // Process Excel file
    const workbook = await XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    for (let val of data) {
        await addMember(val)
    }
    return {
        message: 'File uploaded and processed successfully'
    }
}


const addMember = async (body) => {
    let memberDetails = await Member.find({ memberId: body.memberId }).count();
    let result
    if (!memberDetails) {
        const durgList = body.durgList;
        delete body.durgList
        var member = new Member(body);
        result = await member.save()
        if (result) {
            const member = await Member.findById(result._id);
            let payload = []
            durgList.forEach((durg) => {
                let endValue = null
                if (durg.endDate) {
                    months = durg.endDate.replace('Month', '').trim()
                    endValue = calculateEndDate(new Date(), months)
                }
                payload.push({
                    durgId: durg.durgDetails._id,
                    member: result._id,
                    days: durg.days,
                    endDate: durg.endDate,
                    endVlaue: endValue,
                    effectiveDate: durg.effectiveDate,
                    isActive: 1
                })
            })
            const memberDurg = await MemberDurg.insertMany(payload)
            memberDurg.forEach((ele) => {
                member.memberDurgs.push(ele._id)
            })
           await member.save()
        }
        sendBulkMessages()
    } else {
        throw new Error('Already same memberId exist')
    }
    console.log(body)
    return result
}

const getMember = async (body) => {
    let result = await Member.find({}).sort({
        createdAt: -1
      }).populate({
        path: 'memberDurgs',
        populate: {
          path: 'durgId',
        }
      });

    return result
}

const addDurgOnFile = async (req) => {
    const filePath = req.file.path;

    // Process Excel file
    const workbook = await XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    await Durg.insertMany(data)
    return data
}

const getDurgList = async (req) => {
    const params = req.query.search;
    let durgList;
    if (params) {
        durgList = await Durg.find({ labelName: new RegExp(params, 'i') }).limit(10)
    } else {
        durgList = await Durg.find({}).limit(10)
    }
    return durgList
}

module.exports = {
    addMemberOnFile,
    addMember,
    addDurgOnFile,
    getDurgList,
    getMember
}
