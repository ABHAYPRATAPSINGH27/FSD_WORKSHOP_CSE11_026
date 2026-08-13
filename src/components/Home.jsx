import React from "react";
import img from "../assets/books.webp";
import harry from "../assets/harry.jpg";
import sherlock from "../assets/sherlock.jpeg";
import alchemist from "../assets/alchemist.jpeg";

import "./Home.css";

function Home() {
  const books = [
    {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      publisher: "Bloomsbury Publishing",
      price: 499,
      pages: 223,
      poster: harry,
    },
    {
      id: 2,
      title: "The Adventures of Sherlock Holmes",
      author: "Arthur Conan Doyle",
      publisher: "George Newnes",
      price: 349,
      pages: 307,
      poster: sherlock,
    },
    {
      id: 3,
      title: "The Alchemist",
      author: "Paulo Coelho",
      publisher: "HarperCollins",
      price: 399,
      pages: 208,
      poster: alchemist,
    },
  ];

  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="tag">📚 Welcome to Our Digital Library</span>

          <h1>
            Discover the <span className="highlight">World of Books</span>
          </h1>

          <p>
            Discover thousands of books, explore new authors, and enjoy the joy
            of reading. Find your next favorite book today!
          </p>

          <button className="btn">Explore Books</button>
        </div>

        <div className="hero-image">
          <img src={img} alt="Library" />
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          Our library provides a wide collection of books across various
          categories including fiction, technology, history, science, and much
          more. We aim to encourage reading and lifelong learning.
        </p>
      </section>

      {/* Featured Books */}
      <section className="features">
        <h2 className="section-title">Featured Books</h2>

        <div className="feature-grid">
          {books.map((book) => (
            <div className="card" key={book.id}>
              <img src={book.poster} alt={book.title} className="book-img" />

              <h3>{book.title}</h3>

              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Publisher:</strong> {book.publisher}</p>
              <p><strong>Price:</strong> ₹{book.price}</p>
              <p><strong>Pages:</strong> {book.pages}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="quote">
        <h2>"A reader lives a thousand lives before he dies."</h2>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2026 Library Management System | All Rights Reserved</p>
      </footer>

    </div>
  );
}

export default Home;

