const mongoose = require('mongoose')
let Schema = mongoose.Schema
var Durgschema = new Schema({
    ndc: {
        type: String,
        trim: true,
        unique: true
    },
    labelName:{
        type: String,
        trim: true, 
    },
    genericProductId:{
        type: String,
        trim: true, 
    },
    genericName:{
        type: String,
        trim: true, 
    },
    manufacturerName:{
        type: String,
        trim: true,
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Durgs', Durgschema)