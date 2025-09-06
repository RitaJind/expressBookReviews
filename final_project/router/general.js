const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }
  
    // Check if username already exists
    if (users.some(user => user.username === username)) {
      return res.status(409).json({ message: "Username already exists." });
    }
    users.push({ username, password });
    return res.status(200).json({ message: "User successfully registered. Now you can login." });
});

// Get all books using Promise
public_users.get('/', function (req, res) {
    let getBooks = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(books);
      }, 6000);
    });
  
    getBooks.then((data) => {
      res.send(JSON.stringify(data, null, 4));
    });
});

// Get book details based on ISBN using Async/Await
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    let getBookByISBN = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(books[isbn]);
      }, 6000);
    });
  
    const book = await getBookByISBN;
    if (book) {
      res.send(JSON.stringify(book, null, 4));
    } else {
      res.status(404).json({ message: "Book not found" });
    }
});

// Get book details based on author using Promise
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.toLowerCase();
    let getBooksByAuthor = new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = [];
        Object.keys(books).forEach(isbn => {
          if (books[isbn].author.toLowerCase() === author) {
            result.push({ isbn, ...books[isbn] });
          }
        });
        resolve(result);
      }, 6000);
    });
  
    getBooksByAuthor.then((result) => {
      res.send(JSON.stringify(result, null, 4));
    });
});


//Get books by title using Async/Await

public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    let getBooksByTitle = new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = [];
        Object.keys(books).forEach(isbn => {
          if (books[isbn].title === title) {
            result.push({ isbn, ...books[isbn] });
          }
        });
        resolve(result);
      }, 6000);
    });
  
    const result = await getBooksByTitle;
    res.send(JSON.stringify(result, null, 4));
});

//Get books by title using Async/Await

public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title.toLowerCase();
    let getBooksByTitle = new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = [];
        Object.keys(books).forEach(isbn => {
          if (books[isbn].title.toLowerCase().includes(title)) {
            result.push({ isbn, ...books[isbn] });
          }
        });
        resolve(result);
      }, 6000);
    });
  
    const result = await getBooksByTitle;
    res.send(JSON.stringify(result, null, 4));
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book && book.reviews) {
      res.send(JSON.stringify(book.reviews, null, 4));
    } else {
      res.status(404).json({ message: "No reviews found for this ISBN" });
    }
});

module.exports.general = public_users;