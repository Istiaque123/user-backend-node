const mongoose = require("mongoose");

const authTokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
    },

    timeStemp : {
        type: Date,
        required: true
    }
});

const AuthTokenModel = mongoose.model('Auth_Token', authTokenSchema);

module.exports = AuthTokenModel;