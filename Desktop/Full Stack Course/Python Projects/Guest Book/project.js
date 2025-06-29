addEventListener("DOMContentLoaded", (event) => {

// Get All The Elements
    const formInput = document.getElementById("guest-form");
    const firstName = document.getElementById("fname");
    const lastName = document.getElementById("lname");
    const message = document.getElementById("message-form"); 
    const messagesDiv = document.querySelector(".messages"); 

// Add Submit Listener
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

        const newMessage = document.createElement("p");
        newMessage.innerHTML = `<strong>${fnameValue} ${lnameValue}:</strong> ${messageValue}`;

// Append The Message
        messagesDiv.appendChild(newMessage);

// Reset The Form
        formInput.reset();
    });
});
