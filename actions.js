
// Creates an empty array to store all participants
let participants = [];

// Finds the participant registration form
const participantForm = document.getElementById("participant-form");

// Finds the name input field
const nameInput = document.getElementById("participant-name");

// Finds the participants list
const participantsList = document.getElementById("participants-list");

// Finds the participant count display
const participantCount = document.getElementById("participant-count");

// Finds the draw button
const drawButton = document.getElementById("draw-button");

// Finds the reset button
const resetButton = document.getElementById("reset-button");

// Finds the area where the winner will appear
const winnerDisplay = document.getElementById("winner-display");

// Disables the draw button until someone is registered
drawButton.disabled = true;

// Runs when someone submits the participant form
participantForm.addEventListener("submit", function(event) {

    // Prevents the page from refreshing
    event.preventDefault();

    // Gets the participant name and removes extra spaces
    const participantName = nameInput.value.trim();

    // Checks that the name is not empty
    if (participantName === "") {
        // Stops the registration if the name is empty
        return;
    }

    // Checks whether the name is already registered
    const alreadyExists = participants.some(function(name) {

        // Compares names without considering uppercase or lowercase letters
        return name.toLowerCase() === participantName.toLowerCase();
    });

    // Prevents duplicate participants
    if (alreadyExists) {

        // Displays a warning message
        alert("This participant is already registered!");

        // Clears the input field
        nameInput.value = "";

        // Stops adding the duplicate name
        return;
    }

    // Adds the new name to the participants array
    participants.push(participantName);

    // Creates a new list item
    const listItem = document.createElement("li");

    // Places the participant's name inside the list item
    listItem.textContent = participantName;

    // Adds the new list item to the participants list
    participantsList.appendChild(listItem);

    // Updates the participant count
    participantCount.textContent = participants.length + " participants registered";

    // Enables the draw button
    drawButton.disabled = false;

    // Clears the name input field
    nameInput.value = "";

    // Places the cursor back in the name input
    nameInput.focus();
});

// Runs when the user clicks the draw button
drawButton.addEventListener("click", function() {

    // Checks that there is at least one participant
    if (participants.length === 0) {

        // Displays a warning if nobody has registered
        alert("Please add participants before drawing a winner!");

        // Stops the draw
        return;
    }

    // Generates a random number between zero and the last participant's index
    const randomIndex = Math.floor(Math.random() * participants.length);

    // Selects the participant at the randomly generated position
    const winner = participants[randomIndex];

    // Displays the winner's name with cake and party emojis
    winnerDisplay.textContent = "🎂 🎉 Congratulations, " + winner + "! 🎉 🎂";

    // Disables the draw button to prevent another draw
    drawButton.disabled = true;
});

// Runs when the user clicks the reset button
resetButton.addEventListener("click", function() {

    // Clears all participants from the array
    participants.length = 0;

    // Removes all names from the visible participants list
    participantsList.innerHTML = "";

    // Resets the participant count to zero
    participantCount.textContent = "0 participants registered";

    // Clears the winner display
    winnerDisplay.textContent = "🎂 Waiting for the draw!";

    // Enables the draw button for the next round
    drawButton.disabled = true;

    // Clears the name input field
    nameInput.value = "";
});

