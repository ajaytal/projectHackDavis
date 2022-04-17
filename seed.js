// ----------------------------------------------------------------------------
const mongoose = require('mongoose');
const Book = require('./models/bookSchema')

main().catch(err => console.log(err, "Mongo connection failed!"))
async function main() {
    await mongoose.connect('mongodb://localhost:27017/bookSchema');
    console.log("Mongo connection open!")
}


// ----------------------------------------------------------------------------

// const p = new Product({
//     name: "Grapefruit",
//     price: 1.99,
//     category: "fruit"
// })

// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(err => {
//         console.log(err)
//     })

// Product.deleteMany({}, () => {console.log("Cleared.")})



// physicalProcessing:Boolean
// onCatalog:       Boolean
// bookTitle:       String
// bookAuthor:      String
// oversize:        Boolean
// condition:       String
// needReplacement: Boolean
// copyCount:       Number
// isbn:            Number
// gradeLevel:      Number
// category:   Stri



const seedBooks = [
    {  
        physicalProcessing: false,
        onCatalog: true,
        bookTitle: "Apple Pie ABC",
        bookAuthor: ["Alison Murray"] ,
        oversize: false,
        condition: "Good",
        needReplacement: false ,
        copyCount: 2,
        isbn: 9781423136941,
        gradeLevel: 2 ,
        category: ["Fiction", "Non-fiction & Poetry", "Animals", "Bugs & Pets"],
        lexile: 260,
        image:"https://s3.amazonaws.com/mm-static-media/books/cover-art/9781423136941.jpeg"
    
    },
    {
        physicalProcessing: false,
        onCatalog: true,
        bookTitle: "Bud, Not buddy",
        bookAuthor: ["Christopher Paul Curtis"],
        oversize: false,
        condition: "Good",
        needReplacement:  false,
        copyCount: 1,
        isbn: 9780385323062,
        gradeLevel: 4,
        category: ["Real Life", "Fiction", "Non-fiction & Poetry"],
        lexile: 950,
        image: "https://s3.amazonaws.com/mm-static-media/books/cover-art/9780385323062.jpeg"
    },
    {
        physicalProcessing: false,
        onCatalog: true,
        bookTitle: "The Very Hungry Caterpillar",
        bookAuthor: ["Eric Carle"] ,
        oversize: false,
        condition:"Good",
        needReplacement: false ,
        copyCount:1 ,
        isbn:9780545151351 ,
        gradeLevel:2 ,
        category: ["Animals", "Bugs & Pets", "Fiction", "Non-fiction & Poetry"],
        lexile: 460,
        image: "https://s3.amazonaws.com/mm-static-media/books/cover-art/9780545151351.jpeg"
    },
    {
        physicalProcessing: false,
        onCatalog: true,
        bookTitle: "Toy Story",
        bookAuthor: ["Alessandro Ferrari"] ,
        oversize: false,
        condition:"New",
        needReplacement: false ,
        copyCount:3,
        isbn:9781532145544 ,
        gradeLevel:2 ,
        category: ["Fiction", "Non-fiction & Poetry"],
        lexile: 510,
        image: "https://s3.amazonaws.com/mm-static-media/books/cover-art/9781532145544.jpeg"
    },
    {
        physicalProcessing: false,
        onCatalog: true,
        bookTitle: "Figures of Play: Greek Drama and Metafictional Poetics",
        bookAuthor: ["Gregory Dobrov"] ,
        oversize: false,
        condition:"Used",
        needReplacement: false ,
        copyCount:1,
        isbn:9780195116588 ,
        gradeLevel:11 ,
        category: ["Reference","Fiction", "Non-fiction & Poetry","Art", "Creativity & Music"],
        lexile: 1550,
        image: "https://s3.amazonaws.com/mm-static-media/books/cover-art/9780195116588.jpeg"
    },
    {
        physicalProcessing: false,
        onCatalog: true,
        bookTitle: "Charlie's Surprise",
        bookAuthor: ["Flying Start Books"] ,
        oversize: false,
        condition:"New",
        needReplacement: false ,
        copyCount:3,
        isbn:9781776850808 ,
        gradeLevel:1 ,
        category: ["Fiction", "Non-fiction & Poetry"],
        lexile: 360,
        image: "https://s3.amazonaws.com/mm-static-media/books/cover-art/fiction_nonfiction_poetry.png"
    },
    {
        physicalProcessing: false,
        onCatalog: true,
        bookTitle: "Harry Potter and the Sorcerer's Stone",
        bookAuthor: ["J. K. Rowling"] ,
        oversize: false,
        condition:"New",
        needReplacement: false ,
        copyCount:1,
        isbn:9780590353403 ,
        gradeLevel:4 ,
        category: ["Fiction", "Non-fiction & Poetry", "Science Fiction & Fantasy"],
        lexile: 880,
        image:"https://s3.amazonaws.com/mm-static-media/books/cover-art/9780590353403.jpeg"
    },
    {
        physicalProcessing: false,
        onCatalog: true,
        bookTitle: "In Cold Blood",
        bookAuthor: ["Truman Capote"] ,
        oversize: false,
        condition:"New",
        needReplacement: false ,
        copyCount:2,
        isbn:9780451154460 ,
        gradeLevel:6,
        category: ["Fiction", "Non-fiction & Poetry"],
        lexile: 1040,
        image: "https://s3.amazonaws.com/mm-static-media/books/cover-art/9780375507908.jpeg"
    }

    ]

 Book.insertMany(seedBooks)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })

