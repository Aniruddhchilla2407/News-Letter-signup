document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    const email = document.getElementById('email').value;
    const messageElement = document.getElementById('message');

    // Simulate a subscription success message
    messageElement.textContent = `Thank you for subscribing with ${email}!`;
    messageElement.style.color = 'green';

    // Clear the input field
    document.getElementById('email').value = '';
});
