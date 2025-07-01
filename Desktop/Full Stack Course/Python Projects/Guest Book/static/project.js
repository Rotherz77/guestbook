document.addEventListener("DOMContentLoaded", () => {

    // Get All The Elements
    const formInput = document.getElementById("guest-form");
    const firstName = document.getElementById("fname");
    const lastName = document.getElementById("lname");
    const message = document.getElementById("message-form");
    const messagesDiv = document.querySelector(".messages");

    // Load all messages on page load
    loadMessages();

    // Form Submit Listener
    formInput.addEventListener("submit", (event) => {
        event.preventDefault();

        // Grabbing The Values
        const fnameValue = firstName.value.trim();
        const lnameValue = lastName.value.trim();
        const messageValue = message.value.trim();

        // Check For Empty Fields
        if (fnameValue === "" || lnameValue === "" || messageValue === "") {
            alert("Please fill out all fields.");
            return;
        }

        // Prepare data for POST
        const newEntry = {
            firstName: fnameValue,
            lastName: lnameValue,
            message: messageValue
        };

        // Send the data to Python
        fetch('http://127.0.0.1:5000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEntry)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Message saved:", data);
            // Reload messages from the backend
            loadMessages();
            formInput.reset();
        })
        .catch(error => {
            console.error('Error saving message:', error);
        });
    });

    // Function to load all messages from backend
    function loadMessages() {
        fetch('http://127.0.0.1:5000/messages')
            .then(response => response.json())
            .then(data => {
                messagesDiv.innerHTML = ""; // Clear previous messages

                data.forEach(msg => {
                    const newMessage = document.createElement("p");
                    newMessage.innerHTML = `<strong>${msg.firstName} ${msg.lastName}:</strong> ${msg.message}`;
                    messagesDiv.appendChild(newMessage);
                });
            })
            .catch(error => {
                console.error('Error loading messages:', error);
            });
    }
});
