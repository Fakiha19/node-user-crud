const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    address:String,
    contact_num:String,
    interest:String,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
