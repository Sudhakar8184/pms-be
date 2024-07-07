const XLSX = require('xlsx');
var mongoose = require('mongoose');
const { sendBulkMessages } = require('./whatsappController');
const { calculateEndDate, calculateNextTriggedDate } = require('../../lib/utils');
const { startOfDay, endOfDay, format } = require('date-fns');
var Member = mongoose.model('Members')
var Drug = mongoose.model('Drugs')
var MemberDrug = mongoose.model('MemberDrugs')

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
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        let memberDetails = await Member.find({ memberId: body.memberId }).count();
        let member
        if (!memberDetails || body._id) {
            const memberDrugs = body.memberDrugs;
            delete body.memberDrugs
            // member = new Member(body);
            // member = await member.save({session})
            const member = await Member.findOneAndUpdate({ memberId: body.memberId }, { $set: body }, { session, upsert: true, new: true, setDefaultsOnInsert: true })
            if (member) {
                let memberDrugList = member.memberDrugs
                for (drug of memberDrugs) {
                    let endValue = null
                    let nextTrigged = null
                    let existingData
                    drug.effectiveDate = startOfDay(drug.effectiveDate)
                    if (drug._id) {
                        existingData = await MemberDrug.findOne({ _id: drug._id })
                    }
                    if (existingData) {
                        if (existingData.endDate != drug.endDate) {
                            months = drug.endDate.match(/\d+/gmi)
                            if (months && months.length)
                                endValue = calculateEndDate(drug.effectiveDate, Number(months[0]))
                        } else {
                            endValue = existingData.endValue 
                        }
                        if (format(existingData.effectiveDate, 'MM/dd/yyyy') != format(drug.effectiveDate, 'MM/dd/yyyy')) {
                            let days = drug.days > 3 ? drug.days - 3 : drug.days;
                            nextTrigged = calculateNextTriggedDate(drug.effectiveDate, days)
                        } else {
                            if (existingData.days != drug.days) {
                                let days = drug.days > 3 ? drug.days - 3 : drug.days;
                                nextTrigged = calculateNextTriggedDate(drug.effectiveDate, days)
                            } else {
                                nextTrigged = existingData.nextTrigged
                            }
                        }
                       
                    } else {
                        if (drug.endDate) {
                            months = drug.endDate.match(/\d+/gmi)
                            if (months && months.length)
                                endValue = calculateEndDate(drug.effectiveDate, Number(months[0]))
                        }
                        if (drug.effectiveDate) {
                            let days = drug.days > 3 ? drug.days - 3 : drug.days;
                            nextTrigged = calculateNextTriggedDate(drug.effectiveDate, days)
                        }
                    }

                    let payload = {
                        drug: drug.drug._id,
                        member: member._id,
                        days: drug.days,
                        endDate: drug.endDate,
                        endValue: endValue,
                        effectiveDate: drug.effectiveDate,
                        isActive: drug.isActive,
                        nextTrigged
                    }
                    if (drug._id) {
                        payload._id = drug._id
                    }
                    const memberDrugDetails = await MemberDrug.findOneAndUpdate({ member: payload.member, drug: payload.drug }, { $set: payload }, { session, upsert: true, new: true, setDefaultsOnInsert: true })
                    if (!drug._id) {
                        memberDrugList.push(memberDrugDetails._id)
                    }
                }
                await Member.updateOne({ _id: member._id }, { $set: { memberDrugs: memberDrugList } }, { session, upsert: true })
                await session.commitTransaction();
                session.endSession();
            }
            sendBulkMessages()
        } else {
            throw new Error('Already same memberId exist')
        }
        console.log(body)
        return member
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err
    }
}

const getMember = async (body) => {
    let member = await Member.find({}).sort({
        createdAt: -1
    }).populate({
        path: 'memberDrugs',
        populate: {
            path: 'drug',
        }
    });

    return member
}

const addDrugOnFile = async (req) => {
    const filePath = req.file.path;

    // Process Excel file
    const workbook = await XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    await Drug.insertMany(data)
    return data
}

const getDrugList = async (req) => {
    const params = req.query.search;
    let drugList;
    if (params) {
        drugList = await Drug.find({ labelName: new RegExp(params, 'i') }).limit(10)
    } else {
        drugList = await Drug.find({}).limit(10)
    }
    return drugList
}


const getNotificationList = async (req) => {
    const params = req.query.search;
    let member = await Member.find({}).sort({
        createdAt: -1
    }).populate({
        path: 'memberDrugs',
        match: { nextTrigged: { $gte: startOfDay(new Date(params)), $lt: endOfDay(new Date(params)) }, isActive: 1 },
        populate: {
            path: 'drug',
        }
    });
    member = member.filter((ele) => ele.memberDrugs.length)

    return member
}

module.exports = {
    addMemberOnFile,
    addMember,
    addDrugOnFile,
    getDrugList,
    getMember,
    getNotificationList
}
