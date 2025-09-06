const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//Task 7 - only registered users can login
regd_users.post("/login", (req,res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }
  
    // Check if user exists and password matches
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }
  
    // Generate JWT token
    let accessToken = jwt.sign({ username }, "access", { expiresIn: 60 * 60 });
  
    // Save token in session
    req.session.authorization = { accessToken, username };
  
    return res.status(200).json({ message: "User successfully logged in." });
});

// Task 8 - Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.session.authorization?.username;
  
    // Check if user is logged in
    if (!username) {
      return res.status(401).json({ message: "User not logged in." });
    }
  
    // Check if review is provided
    if (!review) {
      return res.status(400).json({ message: "Review is required as a query parameter." });
    }
  
    // Check if book exists
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found." });
    }
  
    // Add or update review
    if (!books[isbn].reviews) {
      books[isbn].reviews = {};
    }
    books[isbn].reviews[username] = review;
  
    return res.status(200).json({ message: "Review added/updated successfully." });
});

// Task - 9 
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization?.username;
  
    // Check if user is logged in
    if (!username) {
      return res.status(401).json({ message: "User not logged in." });
    }
  
    // Check if book exists
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found." });
    }
  
    // Check if review exists for this user
    if (books[isbn].reviews && books[isbn].reviews[username]) {
      delete books[isbn].reviews[username];
      return res.status(200).json({ message: "Review deleted successfully." });
    } else {
      return res.status(404).json({ message: "No review found for this user to delete." });
    }
  });
  
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
