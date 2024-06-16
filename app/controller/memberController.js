const XLSX = require('xlsx');
var mongoose = require('mongoose');
var Member = mongoose.model('Members')

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
        var member = new Member(body);
        result = await member.save()
    } else {
        throw new Error('already same memberId exist')
    }
      console.log(body)
    return result
}

module.exports = {
    addMemberOnFile,
    addMember
}