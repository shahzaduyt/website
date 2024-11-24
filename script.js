// Function to toggle modals (Create Room / Join Room)
function toggleModal(action) {
  const createModal = document.getElementById('createModal');
  const joinModal = document.getElementById('joinModal');

  if (action === 'create') {
      createModal.classList.toggle('active');
  } else if (action === 'join') {
      joinModal.classList.toggle('active');
  }
}

// Function to check if terms are accepted before proceeding
function checkTerms() {
  const acceptTermsCheckbox = document.getElementById('accept-terms');
  const usernameInput = document.getElementById('username');
  
  if (acceptTermsCheckbox.checked && usernameInput.value !== "") {
      return true; // Proceed if terms are accepted and name is entered
  } else {
      alert("Please accept the terms and enter your name before proceeding.");
      return false;
  }
}

// Function to create a new room
function createRoom() {
  const roomId = document.getElementById('create-room-id').value;
  const password = document.getElementById('create-room-password').value;
  
  if (roomId && password) {
      alert(`Room "${roomId}" created successfully!`);
      // Proceed with your logic for creating the room (e.g., socket emit or page redirect)
      toggleModal('create'); // Close modal after room creation
  } else {
      alert("Please provide both Room ID and Password.");
  }
}

// Function to join an existing room
function joinRoom() {
  const roomId = document.getElementById('join-room-id').value;
  const password = document.getElementById('join-room-password').value;

  if (roomId && password) {
      alert(`Joined Room: ${roomId}`);
      // Proceed with your logic for joining the room (e.g., socket connection or page redirect)
      toggleModal('join'); // Close modal after joining the room
  } else {
      alert("Please provide both Room ID and Password.");
  }
}

// Handling form submission and modal actions
document.getElementById('username').addEventListener('input', function () {
  const username = this.value.trim();
  if (username.length > 0) {
      document.querySelector('.terms-container').style.display = 'block'; // Show terms checkbox after name input
  } else {
      document.querySelector('.terms-container').style.display = 'none'; // Hide terms checkbox if no name entered
  }
});

// Optional: You can add validation here to ensure that users fill in the fields before submitting

// Join Room Function
function joinRoom() {
  const roomId = document.getElementById("join-room-id").value;
  const password = document.getElementById("join-room-password").value;
  const username = document.getElementById("username").value;

  // Mock check for room ID and password
  if (roomId && password && username) {
      alert("Joining room successful!");
      // Redirect to the room page with room ID and username as query parameters
      window.location.href = `room.html?room=${roomId}&user=${username}`;
  } else {
      alert("Please fill in all fields.");
  }
}

// Create Room Function
function createRoom() {
  const roomId = document.getElementById("create-room-id").value;
  const password = document.getElementById("create-room-password").value;
  const username = document.getElementById("username").value;

  // Mock check for creating room
  if (roomId && password && username) {
      alert("Room created successfully!");
      // Redirect to the room page with room ID and username as query parameters
      window.location.href = `room.html?room=${roomId}&user=${username}`;
  } else {
      alert("Please fill in all fields.");
  }
}

// Modal toggle
function toggleModal(type) {
  const createModal = document.getElementById('createModal');
  const joinModal = document.getElementById('joinModal');

  if (type === 'create') {
      createModal.style.display = createModal.style.display === 'block' ? 'none' : 'block';
  } else if (type === 'join') {
      joinModal.style.display = joinModal.style.display === 'block' ? 'none' : 'block';
  }
}
