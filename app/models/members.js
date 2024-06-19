const mongoose = require('mongoose')
let Schema = mongoose.Schema
var Memberschema = new Schema({
    memberId: {
        type: String,
        trim: true,
        default: '',
        unique: true
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
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Members', Memberschema)