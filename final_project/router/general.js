const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Task 1 - Get the book list available in the shop
public_users.get('/', function (req, res) {
    res.send(JSON.stringify(books, null, 4));
});

// Task 2 -  Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) {
      res.send(JSON.stringify(book, null, 4));
    } else {
      res.status(404).json({ message: "Book not found" });
    }
});

// Task 3 - Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const result = [];
    Object.keys(books).forEach(isbn => {
      if (books[isbn].author === author) {
        result.push({ isbn, ...books[isbn] });
      }
    });
    res.send(JSON.stringify(result, null, 4));
});

// Task 4 -  Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const result = [];
    Object.keys(books).forEach(isbn => {
      if (books[isbn].title === title) {
        result.push({ isbn, ...books[isbn] });
      }
    });
    res.send(JSON.stringify(result, null, 4));
});

// Task 5 -  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book && book.reviews) {
      res.send(JSON.stringify(book.reviews, null, 4));
    } else {
      res.status(404).json({ message: "No reviews found for this ISBN" });
    }
});

// Task 6 - Register
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


// Task 10 - Get all books using Promise callback
public_users.get('/', function (req, res) {
    let getBooks = new Promise((resolve, reject) => {
      if (books) {
        resolve(books);
      } else {
        reject("No books found");
      }
    });
  
    getBooks
      .then((data) => {
        res.send(JSON.stringify(data, null, 4));
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
});

// Task 11 - Get book details based on ISBN using Promise callback
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    let getBookByISBN = new Promise((resolve, reject) => {
      if (books[isbn]) {
        resolve(books[isbn]);
      } else {
        reject("Book not found");
      }
    });
  
    getBookByISBN
      .then((book) => {
        res.send(JSON.stringify(book, null, 4));
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
});

// Task 12 - Get book details based on author using Promise Callback
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.toLowerCase();
    let getBooksByAuthor = new Promise((resolve, reject) => {
      const result = [];
      Object.keys(books).forEach(isbn => {
        if (books[isbn].author.toLowerCase() === author) {
          result.push({ isbn, ...books[isbn] });
        }
      });
      resolve(result);
    });
  
    getBooksByAuthor
      .then((result) => {
        res.send(JSON.stringify(result, null, 4));
      })
      .catch((err) => {
        res.status(500).json({ message: "Error retrieving books by author" });
      });
});

//Task 13 - Get books by title using Promise callback

public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase();
    let getBooksByTitle = new Promise((resolve, reject) => {
      const result = [];
      Object.keys(books).forEach(isbn => {
        if (books[isbn].title.toLowerCase() === title) {
          result.push({ isbn, ...books[isbn] });
        }
      });
      resolve(result);
    });
  
    getBooksByTitle
      .then((result) => {
        res.send(JSON.stringify(result, null, 4));
      })
      .catch((err) => {
        res.status(500).json({ message: "Error retrieving books by title" });
      });
});



module.exports.general = public_users;