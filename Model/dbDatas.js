const mongoose = require('mongoose');

const datasSchema = mongoose.Schema({
    exp_date: {type: Date, default: Date.now, expires: 50400},  
    deviceID: String,
    sensor: String,
    voltage: Number,
    current: Number,
    power: Number,
    timestamp: String,
});

module.exports = mongoose.model('datas', datasSchema);