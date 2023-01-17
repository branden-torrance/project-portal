//==================================================================================================
// Global Variables
const page = document.querySelector("#pageName");

//==================================================================================================
// JavaScript code to toggle "hide" for the dropdown menu

function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("hide");
}

//==================================================================================================
// Code for Date

const datefield = document.querySelector(".date");

const now = new Date();
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
);
// instead of "full" for dateStyle, you can also use options of "long", "medium", or "short"

datefield.textContent = fulldate;

// .textContent will work just like .innerHTML.
// However, .innerHTML will support embedded html code (such as <em></em>, <strong></strong>, etc.).
// .textContent does not support embedded html code.

//==================================================================================================
// Code for bannerMessage toggle

const today = new Date();
const dayNumber = today.getDay();

const element = document.getElementById("bannerMessage");
if (dayNumber == 5) {
    element.classList.add("showme");
} else {
    element.classList.add("hideme");
}

//==================================================================================================
// Code for Last Visited

let visitNow = new Date();
let visitLast = new Date(localStorage.getItem("lastVisit"));
const oneDay = 1000 * 60 * 60 * 24;
const timeDiff = visitLast.getTime() - visitNow.getTime();
const daysDiff = Math.round(timeDiff / oneDay);

if (daysDiff == 1) {
    document.getElementById("lastVisit").innerHTML = "1 day ago";
} else if (daysDiff < 0) {
    document.getElementById("lastVisit").innerHTML = "0 days ago";
} else {
    document.getElementById("lastVisit").innerHTML = daysDiff + " days ago";
}

localStorage.setItem("lastVisit", visitNow);

//==================================================================================================
// Code for lazy-load on Weather Gallery page

const images = document.querySelectorAll("[data-src]");

function preloadImage(img) {
    const src = img.getAttribute("data-src");
    if (!src) {
        return;
    }

    img.src = src;

    img.onload = () => {
        img.removeAttribute("data-src");
    };
}

const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px",
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        } else {
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    });
}, imgOptions);

images.forEach((image) => {
    imgObserver.observe(image);
});

//==================================================================================================
// Rating Slider for Storm Center

function adjustRating(rating) {
    document.getElementById("ratingvalue").innerHTML = rating;
}

//==================================================================================================
// Town Data

if (page.textContent == "Home") {
    const requestURL =
        "https://byui-cit230.github.io/weather/data/towndata.json";

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {
            // console.log(jsonObject);
            const townData = jsonObject["towns"];

            const towns = townData.filter(
                (town) =>
                    town.name == "Preston" ||
                    town.name == "Fish Haven" ||
                    town.name == "Soda Springs"
            );

            towns.forEach((town) => {
                let card = document.createElement("section");
                let dataDiv = document.createElement("div");
                let h2 = document.createElement("h2");
                let h3 = document.createElement("h3");
                let p1 = document.createElement("p");
                let p2 = document.createElement("p");
                let p3 = document.createElement("p");
                let img = document.createElement("img");

                h2.textContent = `${town.name}`;
                h3.textContent = `${town.motto}`;
                p1.textContent = `Year Founded: ${town.yearFounded}`;
                p2.textContent = `Current Population: ${town.currentPopulation}`;
                p3.textContent = `Annual Rain Fall: ${town.averageRainfall}`;
                img.setAttribute("src", `images/${town.photo}`);
                img.setAttribute("alt", `${town.name} town image`);

                card.appendChild(dataDiv);
                dataDiv.appendChild(h2);
                dataDiv.appendChild(h3);
                dataDiv.appendChild(p1);
                dataDiv.appendChild(p2);
                dataDiv.appendChild(p3);
                card.appendChild(img);

                document.querySelector(".townsDiv").appendChild(card);
            });
        });
}

//==================================================================================================
// Weather Summary for Preston, Soda Springs, and Fish Haven

if (
    page.textContent == "Preston" ||
    page.textContent == "Soda Springs" ||
    page.textContent == "Fish Haven"
) {
    let cityid;
    if (page.textContent == "Preston") {
        cityid = "5604473";
    } else if (page.textContent == "Soda Springs") {
        cityid = "5607916";
    } else if (page.textContent == "Fish Haven") {
        cityid = "5585000";
    }

    const APPID = "91e39d550becd7d7ebdbb386ee865519";
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?id=${cityid}&appid=${APPID}&units=imperial`;

    fetch(weatherURL)
        .then((response) => response.json())
        .then((weatherStats) => {
            //console.log(weatherStats);

            // Weather Description
            document.querySelector("#weatherDesc").textContent =
                weatherStats.weather[0].description.replace(
                    /(^\w{1})|(\s+\w{1})/g,
                    (first) => first.toUpperCase()
                );

            // Current Temperature
            document.querySelector("#temperature").textContent =
                weatherStats.main.temp.toFixed(0);

            // Humidity
            document.querySelector("#humidity").textContent =
                weatherStats.main.humidity;

            // Wind Speed
            document.querySelector("#windspeed").textContent =
                weatherStats.wind.speed.toFixed(0);

            // Wind Chill Calculation
            const t = weatherStats.main.temp.toFixed(0);
            const s = weatherStats.wind.speed.toFixed(0);
            console.log(t);
            console.log(s);

            let windchill =
                35.74 +
                0.6215 * t -
                35.75 * Math.pow(s, 0.16) +
                0.4275 * t * Math.pow(s, 0.16);

            windchill = Math.round(windchill);

            if (t <= 50 && s > 3) {
                document.getElementById("chill").textContent =
                    windchill + "\xB0F";
            } else {
                document.getElementById("chill").textContent = "None";
            }
        });

    //----------------------------------------------------------------------------------------------------------------
    // 5 Day Forecast for Preston, Soda Springs, and Fish Haven (Still within IF statement from Weather Summary above)

    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?id=${cityid}&appid=${APPID}&units=imperial`;

    fetch(forecastURL)
        .then((response) => response.json())
        .then((forecastData) => {
            // console.log(forecastData);
            let day = 0;
            const dayofWeek = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];

            const fiveDayForecast = forecastData.list.filter((forecast) =>
                forecast.dt_txt.includes("18:00:00")
            );
            // console.log(fiveDayForecast);

            // loop through each day in forecast
            fiveDayForecast.forEach((x) => {
                let d = new Date(x.dt_txt);
                // console.log(d);

                const weatherDesc = x.weather[0].description;
                const imageCode = x.weather[0].icon;
                const imagePath = `//openweathermap.org/img/wn/${imageCode}.png`;

                document.querySelector(`#forecastDay${day + 1}`).textContent =
                    dayofWeek[d.getDay()];
                document.querySelector(`#forecastImage${day + 1}`).src =
                    imagePath;
                document
                    .querySelector(`#forecastImage${day + 1}`)
                    .setAttribute("alt", weatherDesc);
                document.querySelector(`#forecastTemp${day + 1}`).textContent =
                    x.main.temp.toFixed(0);
                day++;
            });
        });

    //----------------------------------------------------------------------------------------------------------------
    // Town Events (Still within IF statement from Weather Summary above)

    const eventsURL =
        "https://byui-cit230.github.io/weather/data/towndata.json";

    fetch(eventsURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {
            // console.log(jsonObject);
            const towns = jsonObject["towns"];
            const town = towns.filter(
                (towns) => towns.name == page.textContent
            );

            const events = town[0].events;
            // console.log(events);
            events.forEach((event) => {
                let p = document.createElement("p");
                p.innerHTML = event;
                document.querySelector(".upcoming_events").append(p);
            });
        });
} // End of IF statement

//==================================================================================================
