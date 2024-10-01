// script.js

// Replace with your actual API key
const apiKey = "AIzaSyADGOJhYuyNW0giKVualamYVZkT9u46PSc";

// The query to search for books. You can change this to whatever topic you like
const query =
  "architecture|civil engineering|cyber security|computer science|information system";

// URL to fetch data from Google Books API
const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

// Fetch data from the API
fetch(url)
  .then((response) => {
    // Check if the response is okay (status code 200)
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json(); // Convert the response to JSON
  })
  .then((data) => {
    const booksContainer = document.getElementById("books");

    // Check if there are any items in the response
    if (data.items && data.items.length > 0) {
      // Loop through each book in the response
      data.items.forEach((book) => {
        // Extract relevant book information
        const title = book.volumeInfo.title;
        const authors = book.volumeInfo.authors
          ? book.volumeInfo.authors.join(", ")
          : "Unknown Author";
        const thumbnail = book.volumeInfo.imageLinks
          ? book.volumeInfo.imageLinks.thumbnail
          : "";
        const price = (Math.random() * 50 + 10).toFixed(2); // Random price for demonstration

        // Create HTML for each book, including the cart icon and price, and add it to the books container
        booksContainer.innerHTML += `
                    <div class="book-box">
                        <h3>${title}</h3>
                        <p>Author(s): ${authors}</p>
                        <p class="book-price">$${price}</p>
                        ${
                          thumbnail
                            ? `<img src="${thumbnail}" alt="${title}">`
                            : "<p>No image available</p>"
                        }
                        <i class="fa-solid fa-cart-shopping cart-icon"></i>
                    </div>
                `;
      });
    } else {
      booksContainer.innerHTML = "<p>No books found.</p>"; // Message if no books are returned
    }
  })
  .catch((error) => {
    console.error("Error fetching books:", error);
    const booksContainer = document.getElementById("books");
    booksContainer.innerHTML =
      "<p>Error fetching books. Please try again later.</p>"; // Error message
  });
