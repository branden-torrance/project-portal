// Hide Pokemon list on page load
document.getElementById("search-list").style.display = "none";

// Show pokemon list when form input is clicked
document
    .querySelector(".search__form--input")
    .addEventListener("click", (event) => {
        document.getElementById("search-list").style.display = "";

        // Call the sort function when the input is clicked
        sort();
    });

// Hide pokemon list on input element loss of focus
function closeList() {
    function close() {
        document.getElementById("search-list").style.display = "none";
    }
    // Set timeout so that the list doesn't close before allowing user to click on list item
    setTimeout(close, 0300);
}

// This function sorts the dropdown list in alphabetical order
function sort() {
    let list, i, switching, shouldSwitch;
    list = document.querySelector(".search__list--ul");
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

// Create event listener for page load
window.addEventListener("load", () => {
    // Listen for a submit click within the "form" element
    const pokemonSubmit = document.querySelector(".search__form");
    pokemonSubmit.addEventListener("submit", (event) => {
        // Prevent page from reloading
        event.preventDefault();

        // If an image already exists, remove it
        const removeElement = document.getElementById("pokemon-image");
        if (removeElement) {
            removeElement.remove();
        }

        // If details already exists, remove them
        const removeDetails = document.getElementById("pokemon-details");
        if (removeDetails) {
            removeDetails.remove();
        }

        // Use input field text to fetch pokemon data from API
        let pokemon = event.target.elements.searchPokemon.value;
        pokemon = pokemon.toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        // console.log(url);

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // Add image
                const imgPlacement = document.querySelector(
                    ".search__section__image"
                );
                const image =
                    data.sprites.other["official-artwork"].front_default;
                const createImg = document.createElement("img");
                createImg.classList.add("pokemonImage");
                createImg.setAttribute("id", "pokemon-image");
                createImg.setAttribute("alt", data.name);
                createImg.src = image;
                imgPlacement.appendChild(createImg);

                // Add details
                const detailsPlacement = document.querySelector(
                    ".search__section__details"
                );

                const ul = document.createElement("ul");
                const id = document.createElement("li");
                const hp = document.createElement("li");
                const attack = document.createElement("li");
                const defense = document.createElement("li");

                id.innerHTML = `ID#: ${data.id}`;
                hp.innerHTML = `Health Power: ${data.stats[0].base_stat}`;
                attack.innerHTML = `Attack Power: ${data.stats[1].base_stat}`;
                defense.innerHTML = `Defense: ${data.stats[2].base_stat}`;

                ul.appendChild(id);
                ul.appendChild(hp);
                ul.appendChild(attack);
                ul.appendChild(defense);
                let counter = 1;
                data.types.forEach((type) => {
                    let typeLi = document.createElement("li");
                    typeLi.innerHTML = `Type-${counter}: ${
                        type["type"]["name"].charAt(0).toUpperCase() +
                        type["type"]["name"].slice(1)
                    }`;
                    ul.appendChild(typeLi);
                    typeLi.setAttribute("id", "pokemon-details");
                    counter++;
                });
                detailsPlacement.appendChild(ul);

                ul.setAttribute("id", "pokemon-details");
            });
    });
});

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
            document.querySelector(".search__form--input").value =
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
            const teamList = document.querySelector(".search__list--ul");
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
