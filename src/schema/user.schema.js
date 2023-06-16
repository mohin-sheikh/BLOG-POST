const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    user_name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    mobileNumber: {
        type: String,
        unique: true,
        default: ""
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model('USER', userSchema);