// ASSIGNMENT - TABLE OF CONTENTS
// Place new Assignment name into "label" and assignment URL into "url"
const listArray = [
    {
        label: "Week 01",
        url: "week-01",
    },
    {
        label: "Week 02",
        url: "week-02",
    },
];

listArray.forEach((listItem) => {
    const label = listItem.label;
    const url = listItem.url;

    let ol = document.getElementById("text-insert");

    ol.innerHTML += `<li><a href=${url}>${label}</a></li>`;
});

// FOOTER - LAST MODIFIED DATE
const d = new Date();
document.querySelector("#year").innerHTML = d.getFullYear();
document.querySelector("#currentDate").innerHTML = document.lastModified;
