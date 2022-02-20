const mongoose = require('mongoose');
exports.userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    },
});
