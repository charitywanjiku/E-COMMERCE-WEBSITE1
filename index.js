document.addEventListener('DOMContentLoaded', () => {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = loginForm.elements.username.value;
        const password = loginForm.elements.password.value;
        showMessage(`Login submitted! Username: ${username}, Password: ${password}`);
    });

    // Track Your Order Form
    const trackOrderForm = document.getElementById('trackOrderForm');
    trackOrderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const orderNumber = trackOrderForm.elements.orderNumber.value;
        const email = trackOrderForm.elements.email.value;
        showMessage(`Track Order submitted! Order Number: ${orderNumber}, Email: ${email}`);
    });

    // Feedback Form
    const feedbackForm = document.getElementById('feedbackForm');
    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const feedback = feedbackForm.elements.feedback.value;
        showMessage(`Feedback submitted! Feedback: ${feedback}`);
    });

    // Reviews Form
    const reviewsForm = document.getElementById('reviewsForm');
    reviewsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const review = reviewsForm.elements.review.value;
        showMessage(`Review submitted! Review: ${review}`);
    });

    // Wishlist Form
    const wishlistForm = document.getElementById('wishlistForm');
    wishlistForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const wishlistItem = wishlistForm.elements.wishlistItem.value;
        showMessage(`Wishlist submitted! Item to Add: ${wishlistItem}`);
    });

    function showMessage(message) {
        alert(message); // You can replace this with your preferred way of displaying messages
    }
});


  