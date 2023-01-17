// ASSIGNMENT - TABLE OF CONTENTS
// Place new Assignment name into "label" and assignment URL into "url"
const listArray = [
    {
        label: "Weather Site Project",
        url: "projects/weather-site-project",
    },
    {
        label: "Chamber of Commerce Project",
        url: "projects/chamber-of-commerce",
    },
    {
        label: "Pokemon Team Builder App",
        url: "projects/pokemon-team-builder",
    },
    {
        label: "To-do App",
        url: "projects/to-do-app",
    },
    {
        label: "Pokemon API",
        url: "https://branden-cse341-pokemon.onrender.com/api-docs",
    },
];

listArray.forEach((listItem) => {
    const label = listItem.label;
    const url = listItem.url;

    let ol = document.getElementById("text-insert");

    ol.innerHTML += `<li><a href=${url} target=_blank>${label}</a></li>`;
});

// FOOTER - LAST MODIFIED DATE
const d = new Date();
document.querySelector("#year").innerHTML = d.getFullYear();
document.querySelector("#currentDate").innerHTML = document.lastModified;
