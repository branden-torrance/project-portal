// Hide Pokemon list on page load
document.getElementById("pokemon-list").style.display = "none";

// Show pokemon list when form input is clicked
document
    .querySelector(".team__section__text__form--input")
    .addEventListener("click", (event) => {
        document.getElementById("pokemon-list").style.display = "block";

        // Call the sort function when the input is clicked
        sort();
    });

// Hide pokemon list on input element loss of focus
function closeList() {
    function close() {
        document.getElementById("pokemon-list").style.display = "none";
    }
    // Set timeout so that the list doesn't close before allowing user to click on list item
    setTimeout(close, 0300);
}

// This function sorts the dropdown list in alphabetical order
function sort() {
    let list, i, switching, shouldSwitch;
    list = document.querySelector(".team__selection__text--list--ul");
    switching = true;
    while (switching) {
        switching = false;
        b = list.getElementsByTagName("li");
        for (i = 0; i < b.length - 1; i++) {
            shouldSwitch = false;
            if (
                b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()
            ) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
        }
    }
}

// JSON.parse will read through list, which is encoded as a JSON string
let teamArray = JSON.parse(localStorage.getItem("pokeTeam")) || [];

// Create event listener for page load
window.addEventListener("load", () => {
    // Listen for a submit click within the "form" element
    const pokemonSubmit = document.querySelector(".team__section__text__form");
    pokemonSubmit.addEventListener("submit", (event) => {
        // Prevent page from reloading
        event.preventDefault();

        // Get data from the input field and save as an Object
        const myTeam = {
            content: event.target.elements.addPokemon.value,
        };

        // Add pokemon object into teamArray
        teamArray.push(myTeam);

        // Stringify our teamArray and save array object as local storage item
        // We need to stringify because localStorage only allows primitive values
        localStorage.setItem("pokeTeam", JSON.stringify(teamArray));

        // Reset to clear form fields, allowing to enter another team member
        event.target.reset();

        // Call displayTeam() to show new member added when submit button is pressed
        displayTeam();
    });

    // Call displayTeam() to ensure the team members show when the page is reloaded manually
    displayTeam();
});

// Display team list
function displayTeam() {
    const teamList = document.querySelector(".team__section__text--ol");

    // Create counter for number of pokemon on team
    const counter = 6 - teamArray.length;
    const teamCounter = (document.querySelector(
        ".team__section__text__header--counter"
    ).textContent = `${counter} slots remaining`);

    if (counter != 0) {
        // Change color of text to green if team is not full
        document.querySelector(
            ".team__section__text__header--counter"
        ).style.color = "green";

        // Display the input form if team is not full
        document.querySelector(".team__section__text__form").style.display = "";
    }
    if (counter === 1) {
        // Take plural off of "slots"
        document.querySelector(
            ".team__section__text__header--counter"
        ).textContent = `${counter} slot remaining`;
    }
    if (counter === 0) {
        // Alert that the team is full
        document.querySelector(
            ".team__section__text__header--counter"
        ).textContent = "Team is full";

        // Change color of text to red
        document.querySelector(
            ".team__section__text__header--counter"
        ).style.color = "red";

        // Hide the input form if the team is full
        document.querySelector(".team__section__text__form").style.display =
            "none";
    }

    // Clear the space between the "ol" tags by setting the innerHTML to an empty string
    teamList.innerHTML = "";

    teamArray.forEach((member) => {
        // Create elements
        const listItem = document.createElement("li");
        const action = document.createElement("div");
        const deleteButton = document.createElement("button");

        // Add text to elements
        listItem.innerHTML = member.content;
        deleteButton.innerHTML = "x";

        // Add child elements to parent elements
        action.appendChild(deleteButton);
        listItem.appendChild(action);
        teamList.appendChild(listItem);
        // Set up delete button functionality
        deleteButton.addEventListener("click", () => {
            teamArray = teamArray.filter((array) => array != member);

            // Set new list without the deleted item
            localStorage.setItem("pokeTeam", JSON.stringify(teamArray));
            displayTeam();
        });
    });
}

//===============================================================================================
//===============================================================================================
// Add onclick to pokemon in dropdown list. Put name into input field when clicked.
function nameInList() {
    // Get pokemon name from onclick in the list
    const list = document.querySelectorAll(".pokemonList");
    // console.log(list);
    list.forEach((item) => {
        // console.log(item);
        item.onclick = () => {
            document.querySelector(".team__section__text__form--input").value =
                item.innerText;
        };
    });
}

// API call to get pokemon data
function fetchOriginalPokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((response) => response.json())
        .then(function (getAll) {
            getAll.results.forEach(function (pokemon) {
                fetchPokemonData(pokemon);
            });
        });
}

// Get individual details about each pokemon
function fetchPokemonData(pokemon) {
    let url = pokemon.url;
    fetch(url)
        .then((response) => response.json())
        .then(function (pokeData) {
            // console.log(pokeData);

            // Set first letter of pokemon names to uppercase
            const str = pokeData.name;
            const upper = str.charAt(0).toUpperCase() + str.slice(1);

            // Add pokemon to dropdown list
            const teamList = document.querySelector(
                ".team__selection__text--list--ul"
            );
            const pokeName = document.createElement("li");
            pokeName.classList.add("pokemonList");
            pokeName.innerHTML = upper;
            teamList.appendChild(pokeName);

            // Call function to insert names into dropdown list
            nameInList();
        });
}

// Call API function to get Pokemon
fetchOriginalPokemon();
