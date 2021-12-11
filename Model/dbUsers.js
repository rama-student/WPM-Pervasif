const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    deviceID: [String],
});

module.exports = mongoose.model('users', userSchema);