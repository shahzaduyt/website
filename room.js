// Get the room and username from the URL
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('room');
const username = urlParams.get('user');

// Display the room and username info in the chat room
document.querySelector('.header h1').innerHTML = `Welcome to Room: ${roomId} - User: ${username}`;

// Get message input and messages container
const messageInput = document.getElementById('messageInput');
const messagesContainer = document.getElementById('messages');

// Connect to the server
const socket = io();

// Join the room
socket.emit('joinRoom', { roomId, username });

// Listen for messages from the server
socket.on('message', (message) => {
    // Display the message in the chat
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);

    // Scroll to the latest message
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Send a message when the user types and clicks "Send"
function sendMessage() {
    const message = messageInput.value.trim();

    if (message !== "") {
        // Emit the message to the server
        socket.emit('sendMessage', { roomId, username, message });

        // Clear the input field
        messageInput.value = "";
    }
}

// Optional: Send the message when the user presses 'Enter'
messageInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Logout Function
function logout() {
    window.location.href = 'index.html';
}
