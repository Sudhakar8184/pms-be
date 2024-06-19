const mongoose = require('mongoose')
let Schema = mongoose.Schema
var MemberDurgschema = new Schema({
    membersId:
        {type: Schema.Types.ObjectId, ref: 'Members'},
    durgId:
        {type: Schema.Types.ObjectId, ref: 'Durgs'},
    days: {
        type: String,
        trim: true,
        default: ''
    },
    lastTrigged: {
        type: Date,
        trim: true,
        default: null
    },
    endDate: {
        type: Date,
        trim: true,
        default: null
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('MemberDurgs', MemberDurgschema)