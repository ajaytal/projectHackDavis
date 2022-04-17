const mongoose = require('mongoose');

// from productSchema to bookSchema
const bookSchema = new mongoose.Schema({
    physicalProcessing: {
        type: Boolean,
        default: false
    }, 
    onCatalog: {
        type: Boolean,
        default: true
    },
    bookTitle: {
        type: String,
        default: 'Untilted Book'
    },
    bookAuthor: {
        type: Array,
        default: 'Unknown Author'
    },
    oversize: {
        type: Boolean,
        default: false
    },
    condition: {
        type: String,
    },
    needReplacement: {
        type: Boolean,
        default: false
    },
    copyCount: {
        type: Number
        // default: 1
    },
    isbn: {
        type: Number,
        required: true,
        default: 0
    },
    gradeLevel: {
        type: Number,
        default: 0
    },
    category: {
        type: Array,
        default: "Unknown"
    },
    lexile: {
        type: Number,
        default: 0
    }, 
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2017/03/28/01/42/attention-2180765_960_720.png"
    }
    // price: {
    //     type: Number,
    //     requried: true,
    //     min: 0
    // },
    // tag: {
    //     type: String,
    //     lowercase: true,
    //     enum: ["fruit", "vegetable", "dairy"]
    // }
})


const Book = mongoose.model('Book', bookSchema)

// Now we can import this model in our other files by requiring this file
module.exports = Book;