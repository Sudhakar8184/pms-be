const mongoose = require('mongoose')
let Schema = mongoose.Schema
var MemberDrugschema = new Schema({
    member:
        {type: Schema.Types.ObjectId, ref: 'Members'},
    drug:
        {type: Schema.Types.ObjectId, ref: 'Drugs'},
    days: {
        type: Number,
        trim: true,
    },
    lastTrigged: {
        type: Date,
        trim: true,
        default: null
    },
    nextTrigged: {
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
        type: Boolean,
    },
    deletedAt: {
        type: Date,
        trim: true,
        default: null
    },
    triggerCount: {
        type: Number,
        trim: true,
        default: 0
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('MemberDrugs', MemberDrugschema)