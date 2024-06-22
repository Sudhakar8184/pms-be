const mongoose = require('mongoose')
let Schema = mongoose.Schema
var MemberDurgschema = new Schema({
    member:
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
        type: String,
        trim: true,
        default: null
    },
    endValue: {
        type: Date,
        trim: true,
        default: null
    },
    effectiveDate: {
        type: Date,
        trim: true,
        default: null
    },
    isActive: {
        type: Number,
    },
    deletedAt: {
        type: Date,
        trim: true,
        default: null
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('MemberDurgs', MemberDurgschema)