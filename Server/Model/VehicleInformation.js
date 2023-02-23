const mongoose = require('mongoose');
//create schema to hold structuring of content
const Schema = mongoose.Schema;

const carShema = new Schema({
    make_model:{
        type: String,
        require: true,
    },
    price:{
        type: String,
        require: true,
    },
    year:{
        type: Number,
        require: true,
    },
    engine:{
        type: String,
        require: true,
    }
});

//Export schema to be used in other files
modue.exports = mongoose.model("VehicleInformation", carShema);