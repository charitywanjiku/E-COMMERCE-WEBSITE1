
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
        productPrice.textContent = `Price: ${product.price}`;

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.onclick = () => addToCart(product);

        productDiv.appendChild(productImage);
        productDiv.appendChild(productName);
        productDiv.appendChild(productDescription);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(addToCartButton)


          

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

// Call the function to display products when the page loads
window.onload = displayProducts;
