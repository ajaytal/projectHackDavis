const mongoose = require('mongoose');

// from productSchema to bookSchema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        default: "N/A"
    },
    phone: {
        type: Number
    },
    apartment: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

// Now we can import this model in our other files by requiring this file
module.exports = User;