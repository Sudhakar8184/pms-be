const mongoose = require('mongoose')
let Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose);

var Memberschema = new Schema({
    memberId: {
        type: Number,
        unique: true,
    },
    prefix: {
        type: String,
        trim: true,
        default: ''
    },
    firstName: {
        type: String,
        trim: true,
        default: ''
    },
    lastName: {
        type: String,
        trim: true,
        default: ''
    },
    gender: {
        type: String,
        trim: true,
        default: ''
    },
    phoneNumber: {
        type: String,
        trim: true,
        default: ''
    },
    countryCode: {
        type: String,
        trim: true,
        default: ''
    },
    email: {
        type: String,
        trim: true,
        default: ''
    },
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
    address: {
        type: String,
        trim: true,
        default: ''
    },
    zipCode: {
        type: String,
        trim: true,
        default: ''
    },
    memberDrugs: [
        {
        type: mongoose.Schema.ObjectId,
        ref: "MemberDrugs",
        },
    ],
    dob: {
        type: Date,
        trim: true,
        default: null
    },
},
    {
        timestamps: true
    })

    Memberschema.plugin(AutoIncrement, { inc_field: 'memberId', start_seq: 1000 });

module.exports = mongoose.model('Members', Memberschema)