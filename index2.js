
// Function to fetch stock data from the server
function fetchStockData() {
  return fetch('http://localhost:3000/stock')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched data:', data);

      // Check if data.stock is an array with at least one element
      if (Array.isArray(data) && data.length > 0) {
        return data;
      } else {
        console.error('Invalid or missing stock data in response:', data);
        return [];
      }
    })
    .catch(error => {
      console.error('Error fetching stock data:', error);
      return [];
    });
}

// Function to add a product to the cart
function addToCart(product) {
  // Retrieve the current cart from local storage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the product is already in the cart
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    // If the product is already in the cart, increase its quantity
    existingProduct.quantity += 1;
  } else {
    // If the product is not in the cart, add it with quantity 1
    cart.push({
      id: product.id,
      name: product.name,
      quantity: 1,
      price: parseFloat(product.price),
    });
  }

  // Store the updated cart in local storage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update the UI to reflect the changes in the cart
  updateCartUI(cart);
}

// Function to remove a product from the cart
function removeFromCart(productId) {
  // Retrieve the current cart from local storage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Find the index of the product in the cart
  const productIndex = cart.findIndex(item => item.id === productId);

  if (productIndex !== -1) {
    // If the product is found in the cart, remove it
    cart.splice(productIndex, 1);

    // Store the updated cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the UI to reflect the changes in the cart
    updateCartUI(cart);
  }
}

// Function to update the UI with the current cart state
function updateCartUI(cart) {
  // Display the cart count in the header or wherever you want
  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) {
    cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0).toString();
  }

  // Call the function to display the cart items
  displayCart();
}

// Function to dynamically display products
function displayProducts() {
  fetchStockData()
    .then(stock => {
      const productContainer = document.getElementById('productContainer');

      console.log('Products fetched successfully:', stock);

      if (stock.length > 0) {
        stock.forEach(product => {
          console.log('Processing product:', product);

          const productDiv = document.createElement('div');
          productDiv.classList.add('product');
          const productImage = document.createElement('img');
          productImage.src = product.image;
          productImage.alt = product.name;

          const productName = document.createElement('h2');
          productName.textContent = product.name;

          const productDescription = document.createElement('p');
          productDescription.textContent = product.description;

          const productPrice = document.createElement('p');
          productPrice.textContent = `Price: $${parseFloat(product.price).toFixed(2)}`;

          const addToCartButton = document.createElement('button');
          addToCartButton.textContent = 'Add to Cart';
          addToCartButton.onclick = () => addToCart(product);

          productDiv.appendChild(productImage);
          productDiv.appendChild(productName);
          productDiv.appendChild(productDescription);
          productDiv.appendChild(productPrice);
          productDiv.appendChild(addToCartButton);

          productContainer.appendChild(productDiv);
        });
      } else {
        console.error('No products found in stock data:', stock);
        productContainer.innerHTML = '<p>No products available.</p>'; // Display message
      }
    })
    .catch(error => {
      console.error('Error displaying products:', error);
    });
}

// Function to dynamically display the cart
function displayCart() {
  const cartContainer = document.getElementById('cartContainer');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Clear the cart container before re-rendering
  cartContainer.innerHTML = '';

  if (cart.length > 0) {
    cart.forEach(item => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');

      const itemName = document.createElement('p');
      itemName.textContent = item.name;

      const itemQuantity = document.createElement('p');
      itemQuantity.textContent = `Quantity: ${item.quantity}`;

      const itemPrice = document.createElement('p');
      itemPrice.textContent = `Total Price: $${(item.quantity * item.price).toFixed(2)}`;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove from Cart';
      removeButton.onclick = () => removeFromCart(item.id);

      cartItemDiv.appendChild(itemName);
      cartItemDiv.appendChild(itemQuantity);
      cartItemDiv.appendChild(itemPrice);
      cartItemDiv.appendChild(removeButton);

      cartContainer.appendChild(cartItemDiv);
    });
  } else {
    // Display a message when the cart is empty
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
  }
}

// Call the function to display products when the page loads
window.onload = () => {
  displayProducts();
  displayCart(); // Display the cart on page load
};


