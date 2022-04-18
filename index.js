const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const fetch = require('node-fetch')

const twilio = require('twilio');

// ----------------------------------------------------------------------------
const mongoose = require('mongoose');
const Books = require('./models/bookSchema');
let failed = false


const { resourceUsage } = require('process');
const { redirect } = require('express/lib/response')

main().catch(err => console.log(err, "Mongo connection failed!"))
async function main() {
    await mongoose.connect('mongodb://localhost:27017/bookSchema');
    console.log("Mongo connection open!")
}
// ----------------------------------------------------------------------------

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true })) //middleware, needed to get req.body properly in app.post /books

app.use(methodOverride('_method')) //middleware, allows us to use things other than GET and POST from HTML forms


// Get page that contains information about all products


app.get('/books', async (req, res) => {

    const books = await Books.find({})
    // console.log("Called GET /books")

    res.render('products/index.ejs', { books, failed })
})

// Get page that allows you to add a new book
app.get('/books/new', (req, res) => {
    console.log("Called GET /books/new")
    res.render('products/new.ejs')
})

app.get('/books/viewall', async (req, res) =>{
    console.log("Called GET /books/viewall")
    const books = await Books.find({})
    res.render('products/viewall.ejs', { books })
})

// Get information about specific book




// Post new product and add it into our database 
// This is where we do our ISBN Algorithm where we fetch data using ISBN and return all the details about the book like category, lexile, grade level, author, picture, etc.
app.post('/books', async (req, res) => {
    console.log("Called POST /books")


    const response = req.body
    const phoneNum = response.phonenumber
    const fullname = response.fullname
    const isbnVal = response.isbnVal
    if (phoneNum > 0) {
        
        // ! IMPORTANT ! ---> If you'd like to implement the twilio function, follow these instructions (for you guys reading this github repo)
        // set usingTwilioAPI to true
        // get a number (you can use a trial accnt), and then find the accountSid, authToken, and the twilioNum as required.
        let usingTwilioAPI = false
        const accountSid = "yourAccountSidHere"; // our old one (de-activated): "AC0ba3d0b6fe1af3ada7e31d142f2e63f1"
        const authToken = "yourAuthTokenHere"; // our old one (de-activated): "c7267b690b9b000211402e56288fea31"
        let twilioNum = "yourNumberHere" // our old one (de-activated), please follow similar format: "+12166161839"

        const client = require('twilio')(accountSid, authToken);
        console.log(`fullname: ${fullname}, user phonenumber: ${phoneNum}`)
        console.log(`from: twilio, to: ${phoneNum}`)
        console.log(`For book ${isbnVal}`)
        console.log("Calling twilio now")

        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
        var date = new Date();
        let monthLater = date.addDays(30)


        console.log(monthLater);
        const Books_Found = await Books.find({})

        let objectID = 1
        let currentCount = 0
        let bookName = ""
        // yes we know this could've been implemented better using the other methods from mongoose but we didn't realize it existed at the time of the hackathon
        for (book of Books_Found) {
            if (book.isbn == isbnVal) {
                objectID = book._id.toString()
                currentCount = book.copyCount
                bookName = book.bookTitle
                
                console.log(`Found - ${objectID}, Bookname - ${bookName}`)
            }
        }
        
        await Books.findByIdAndUpdate(objectID, {"copyCount": currentCount-1})
        if(currentCount-1 <= 0){
            await Books.findByIdAndDelete(objectID)
            console.log("Count reached 0, removing from database")
        }
        
        
        // again, if you want to use twilio (yes, you, the reader of this github repo), then put this as true and follow instructions from above
        if(usingTwilioAPI){
        
            console.log(`Updated copy count from ${currentCount} to ${currentCount-1}`)
            let theMessage = `Hi ${fullname}! Thank you for your checkout for "${bookName}", ISBN: ${isbnVal}. Please come return before ${monthLater}`

            await client.messages
            .create({
               body: theMessage,
               from: twilioNum,
               to: `+1${phoneNum}`
             })
            .then(message => console.log(message.sid));
        }

        res.redirect('/books')
        return
    }

    let isbn = parseInt(response.isbn)
    let copycount = parseInt(response.copycount);
    let bookCondition = response.condition;

    console.log(`isbn: ${isbn}, type: ${typeof (isbn)}`)

    const bookData = await isbnParser(isbn)
    console.log(`! bookData = ${bookData}`)

    let physicalProcessing = false // form later
    let onCatalog = true // form later
    let bookTitle = bookData.data.work.title
    let bookAuthor = bookData.data.work.authors
    let overSize = false // form later
    let condition = bookCondition // form later
    let needReplacement = false // form later
    let copyCount = copycount // form later
    let lexile = bookData.data.work.measurements.english.lexile
    let gradeLevel = lexileToGrade(lexile)
    let category = bookData.data.work.categories;
    let image = bookData.data.published_work.cover_art_url

    const newBook = await new Books({
        "physicalProcessing": physicalProcessing,
        "onCatalog": onCatalog,
        "bookTitle": bookTitle,
        "bookAuthor": bookAuthor,
        "overSize": overSize,
        "condition": condition,
        "needReplacement": needReplacement,
        "copyCount": copyCount,
        "lexile": lexile,
        "isbn": isbn,
        "gradeLevel": gradeLevel,
        "category": category,
        "image": image
    })
    let id = await newBook.save()

    const Books_Found = await Books.find({})
    let objectID = 1
    for (book of Books_Found) {
        if (book.isbn == isbn) {
            objectID = book._id.toString()
            console.log(`Found - ${objectID}`)
        }
    }
    console.log(`ID of new added entry: ${objectID}`)
    res.redirect(`/books/${objectID}`)
})

// Get information about specific book
app.post('/books/isbnSearch', async (req, res) => {
    console.log(`isbn = ${req.body.isbn}`)

    const Books_Found = await Books.find({})
    let isbn = parseInt(req.body.isbn)
    let objectID = 1
    for (book of Books_Found) {
        if (book.isbn == isbn) {
            objectID = book._id.toString()
            console.log(`Found - ${objectID}`)
        }
    }
    failed = false
    if (objectID == 1) {
        console.log("Invalid isbn!")
        res.redirect('/books')
        failed = true
        return
    }
    failed = false
    console.log(`Final objectID = ${objectID}`)
    res.redirect(`/books/${objectID}`)

})

app.get('/books/:isbn', async (req, res) => {

    const bookID = req.params.isbn;
    console.log(`Mongo ObjectID: ${bookID}`)
    const book = await Books.findById(bookID)

    res.render('products/details.ejs', { book })
})

app.use('*', (req, res) => {
    res.redirect('/books')
})

// Running server
app.listen(3000, () => { console.log("Server is up and running on port 3000!") })

// Functions!
function isbnParser(isbn) {
    let url = `https://atlas-fab.lexile.com/free/books/${isbn}`;
    const options = {
        headers: {
            accept: "application/json; version=1.0"
        }
    };
    console.log("-----Fetching by ISBN...-----")
    return fetch(url, options)
        .then(res => res.json())
        .then(res => {
            const usefulData = res.data.work.measurements.english
            let lexile = usefulData.lexile
            console.log(`Lexile: ${lexile}, Grade: ${lexileToGrade(lexile)}`)
            console.log("-----Out of the fetch, got the lexile-----")
            return res
        })
        .catch(a => {
            console.log("-----FAILED FETCH, POSSIBLE INVALID ISBN-----")
        })
}

function lexileToGrade(lexile) {
    if (lexile <= 165) return 0
    else if (lexile <= 425) return 1
    else if (lexile <= 645) return 2
    else if (lexile <= 850) return 3
    else if (lexile <= 950) return 4
    else if (lexile <= 1030) return 5
    else if (lexile <= 1095) return 6
    else if (lexile <= 1155) return 7
    else if (lexile <= 1205) return 8
    else if (lexile <= 1250) return 9
    else if (lexile <= 1295) return 10
    else if (lexile <= 2000) return 11
    else if (lexile <= 2000) return 12
}
