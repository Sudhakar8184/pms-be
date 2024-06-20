const XLSX = require('xlsx');
var mongoose = require('mongoose');
const { sendBulkMessages } = require('./whatsappController');
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
    for (let val of data){
        await addMember(val)
    }
    return {
        message: 'File uploaded and processed successfully'
    }
}


const addMember = async (body) => {
    let memberDetails = await Member.find({ memberId: body.memberId }).count();
    let result
    if(!memberDetails){
        const durgList = body.durgList;
        delete body.durgList
        let payload =[]
        var member = new Member(body);
        result = await member.save()
        if(result){
            let payload =[]
            durgList.forEach((durg)=>{
                payload.push({
                    durgId: durg.durgDetails._id,
                    membersId: result._id,
                    days: durg.days,
                    endDate: durg.endDate
                })
            })
            await MemberDurg.insertMany(payload) 
        }
        sendBulkMessages()
    } else {
        throw new Error('Already same memberId exist')
    }
      console.log(body)
    return result
}


const addDurgOnFile = async (req) => {
    const filePath = req.file.path;

    // Process Excel file
    const workbook = await XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    // for (let val of data){
    //     await addMember(val)
    // }
    await Durg.insertMany(data)
    return data
}

const getDurgList = async (req) => {
    const params =   req.query.search;
    let durgList;
    if(params){
         durgList = await Durg.find({labelName: new RegExp(params,'i')}).limit( 10 )
    } else {
        durgList = await Durg.find({}).limit( 10 )
    }
    return durgList
}

module.exports = {
    addMemberOnFile,
    addMember,
    addDurgOnFile,
    getDurgList
}
