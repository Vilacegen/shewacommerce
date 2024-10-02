// Function to get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Function to save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to calculate totals
function calculateCartTotals() {
  let cart = getCart();
  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  const tax = (subtotal * 0.1).toFixed(2); // Example 10% tax
  const shipping = 5.0; // Flat-rate shipping for demonstration
  const total = (parseFloat(subtotal) + parseFloat(tax) + shipping).toFixed(2);

  document.getElementById("cart-subtotal").innerText = `$${subtotal.toFixed(
    2
  )}`;
  document.getElementById("cart-tax").innerText = `$${tax}`;
  document.getElementById("cart-total").innerText = `$${total}`;
}

// Function to populate cart items
function displayCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; // Clear previous content

  let cart = getCart();

  // Check if the cart is empty
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    calculateCartTotals();
    return; // Exit if cart is empty
  }

  cart.forEach((item) => {
    cartItemsContainer.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}">
          <h2>${item.title}</h2>
          <p>Price: $${item.price}</p>
          <input type="number" value="${item.quantity}" min="1" data-id="${
      item.id
    }" class="cart-quantity">
          <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
          <button class="remove-item" data-id="${item.id}">Remove</button>
        </div>
      `;
  });

  // Update totals after rendering items
  calculateCartTotals();
}

// Function to handle quantity changes
document.addEventListener("change", (event) => {
  if (event.target.classList.contains("cart-quantity")) {
    const itemId = event.target.getAttribute("data-id");
    const newQuantity = parseInt(event.target.value);

    let cart = getCart();
    // Update the cart
    cart = cart.map((item) => {
      if (item.id == itemId) {
        item.quantity = newQuantity;
      }
      return item;
    });

    // Save the updated cart
    saveCart(cart);

    // Recalculate totals and update display
    displayCartItems();
  }
});

// Function to handle item removal
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-item")) {
    const itemId = event.target.getAttribute("data-id");

    let cart = getCart();
    // Remove item from the cart
    cart = cart.filter((item) => item.id != itemId);

    // Save the updated cart
    saveCart(cart);

    // Recalculate totals and update display
    displayCartItems();
  }
});

// Initial display of cart items
displayCartItems();
