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

        // Create HTML for each book, including the BUY NOW button, cart icon, and price
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
            <button class="buy-now" data-title="${title}" data-price="${price}" data-id="${
          book.id
        }" data-image="${thumbnail}">BUY NOW</button>
            <i class="fa-solid fa-cart-shopping cart-icon" data-title="${title}" data-price="${price}" data-id="${
          book.id
        }" data-image="${thumbnail}"></i>
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

// Event listener for adding items to the cart
document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("buy-now") ||
    event.target.classList.contains("cart-icon")
  ) {
    const button = event.target;
    const title = button.getAttribute("data-title");
    const price = parseFloat(button.getAttribute("data-price"));
    const id = button.getAttribute("data-id");
    const image = button.getAttribute("data-image");

    // Call addToCart function to add item
    addToCart(id, title, price, 1, image); // Add with quantity of 1
  }
});

// Function to add item to cart
function addToCart(id, title, price, quantity, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    // If item exists, update the quantity
    existingItem.quantity += quantity;
  } else {
    // If item does not exist, add to cart
    cart.push({ id, title, price, quantity, image });
  }
  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added to cart!");
}
