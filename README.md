# projectHackDavis

**HackDavis Project**: "Children's Library", date: 04/17/2022 - 04/18/2022, Time: 24 hours

Stack: HTML(EJS) / CSS, JavaScript, Node.js, Express.js, MongoDB & Mongoose, Twilio API, and Fetch API.

Goal: To create a web application where librarians can add/view books via simply the ISBN number. Children can view/checkout books via simply the ISBN number. Shows the book's image, reading level, lexile, category, quantity available, condition, etc.


_How to run_:
- `npm install` to install all dependencies
- Run `mongod` and `mongo` on powershell after you have it installed 
- Run `seed.js` to seed the database with a few books (completely optional)
- `node index.js` to run the server
- Go to http://localhost:3000/books/
- _Note: to use Twilio API, you need to set up your own trial account. Instructions available on `index.js` and setting up account instructions can be found online (takes around ~3-5 minutes to set up, $0.)
