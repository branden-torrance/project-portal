//==================================================================================================
// Global Constants
const page = document.querySelector("#pageName");
const date = new Date();

//==================================================================================================
// Toggle "hide" for the dropdown menu

function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("hide");
}

//==================================================================================================
// Hide Weather Alert Banner

function closeAlert() {
    document.getElementById("bannerMessage").classList.toggle("hideme");
}

//==================================================================================================
// Display GRID View for Directory

function gridView() {
    document.getElementById("cards").classList.remove("listView");
    document.getElementById("cards").classList.add("gridView");
    document.getElementById("gridIcon").style.background = "#BB9F06";
    document.getElementById("listIcon").style.background = "#CCC";
}

//==================================================================================================
// Display LIST View for Directory

function listView() {
    document.getElementById("cards").classList.remove("gridView");
    document.getElementById("cards").classList.add("listView");
    document.getElementById("listIcon").style.background = "#BB9F06";
    document.getElementById("gridIcon").style.background = "#CCC";
}

//==================================================================================================
// Year and Last Modified in Footer

// "date" const taken from --Global Constants-- section at the top of the document
document.querySelector("#year").textContent = date.getFullYear();
document.querySelector("#currentDate").textContent = document.lastModified;

//==================================================================================================
// Weather Summary for Battle Creek, MI
if (page.textContent == "Home") {
    const APPID = "91e39d550becd7d7ebdbb386ee865519";
    const lat = 42.3212;
    const lon = -85.1797;
    const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${APPID}&units=imperial`;

    fetch(weatherURL)
        .then((response) => response.json())
        .then((weatherStats) => {
            // console.log(weatherStats);

            // Weather Description
            document.querySelector("#weatherDesc").textContent =
                weatherStats.current.weather[0].description.replace(
                    /(^\w{1})|(\s+\w{1})/g,
                    (first) => first.toUpperCase()
                );

            // Temperature
            document.querySelector("#temperature").textContent =
                weatherStats.current.temp.toFixed(0);

            // Humidity
            document.querySelector("#humidity").textContent =
                weatherStats.current.humidity;

            // Wind Speed
            document.querySelector("#windspeed").textContent =
                weatherStats.current.wind_speed.toFixed(0);

            // Toggle Weather Alert Banner
            const bannerAlert = document.getElementById("bannerMessage");
            if (typeof weatherStats.alerts != "undefined") {
                document.getElementById("alert_name").textContent =
                    weatherStats.alerts.event;
                document.getElementById("alert_description").textContent =
                    weatherStats.alerts.description;
                bannerAlert.classList.remove("hideme");
                bannerAlert.classList.add("showme");
            }

            //--------------------------------------------------------------------------------------------------
            // Weather Wind Chill Calculation (Still within IF statement from Weather Summary above)

            const t = parseFloat(
                document.getElementById("temperature").textContent
            );
            const s = parseFloat(
                document.getElementById("windspeed").textContent
            );

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

            //--------------------------------------------------------------------------------------------------
            // 3-Day Forecast for Battle Creek, MI (Still within IF statement from Weather Summary above)

            // "date" const taken from --Global Constants-- section at the top of the document
            const dayNumber = date.getDay();
            const dayOfWeek = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];
            // console.log(today);
            // console.log(dayNumber);
            index1 = dayNumber + 1;
            index2 = dayNumber + 2;
            index3 = dayNumber + 3;

            if (dayNumber == 6) {
                index1 = 0;
                index2 = 1;
                index3 = 2;
            } else if (dayNumber == 5) {
                index2 = 0;
                index3 = 1;
            } else if (dayNumber == 4) {
                index3 = 0;
            }

            const forecast1 = weatherStats.daily[index1];
            const forecast2 = weatherStats.daily[index2];
            const forecast3 = weatherStats.daily[index3];

            // Display Temperature
            document.querySelector("#forecastTemp1").textContent =
                forecast1.temp.day.toFixed(0);
            document.querySelector("#forecastTemp2").textContent =
                forecast2.temp.day.toFixed(0);
            document.querySelector("#forecastTemp3").textContent =
                forecast3.temp.day.toFixed(0);

            // Display Day
            document.querySelector("#forecastDay1").textContent =
                dayOfWeek[index1];
            document.querySelector("#forecastDay2").textContent =
                dayOfWeek[index2];
            document.querySelector("#forecastDay3").textContent =
                dayOfWeek[index3];

            // Display icon and set image attribute
            const imageCode1 = forecast1.weather[0].icon;
            const imageCode2 = forecast2.weather[0].icon;
            const imageCode3 = forecast3.weather[0].icon;

            const imagePath1 = `//openweathermap.org/img/wn/${imageCode1}.png`;
            const imagePath2 = `//openweathermap.org/img/wn/${imageCode2}.png`;
            const imagePath3 = `//openweathermap.org/img/wn/${imageCode3}.png`;

            const weatherDesc1 = forecast1.weather[0].description;
            const weatherDesc2 = forecast2.weather[0].description;
            const weatherDesc3 = forecast3.weather[0].description;

            document.querySelector("#forecastImage1").src = imagePath1;
            document.querySelector("#forecastImage2").src = imagePath2;
            document.querySelector("#forecastImage3").src = imagePath3;

            document
                .querySelector(`#forecastImage1`)
                .setAttribute("alt", weatherDesc1);
            document
                .querySelector(`#forecastImage2`)
                .setAttribute("alt", weatherDesc2);
            document
                .querySelector(`#forecastImage3`)
                .setAttribute("alt", weatherDesc3);
        });
}

//==================================================================================================
// JSON Data for Directory Page

if (page.textContent == "Directory") {
    const directoryPath = "json/directory.json";

    fetch(directoryPath)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {
            // console.table(jsonObject);
            const directory = jsonObject["businessdirectory"];

            let number = 1;
            for (let i = 0; i < directory.length; i++) {
                document.querySelector("#card" + number);

                let img = document.querySelector("#directoryImg" + number);
                let h3 = document.querySelector("#directoryName" + number);
                let p1 = document.querySelector("#directoryPhone" + number);
                let p2 = document.querySelector("#directoryAddress" + number);
                let p3 = document.querySelector("#directoryWeb" + number);

                img.setAttribute("src", directory[i].image);
                img.setAttribute("alt", `${directory[i].name} Logo`);
                h3.textContent = directory[i].name;
                p1.innerHTML = `<strong>Phone:</strong><br> ${directory[i].phone}<br>`;
                p2.innerHTML = `<strong>Address:</strong><br> ${directory[i].address}<br>`;
                p3.innerHTML = `<strong>Website:</strong><br> <a href="${directory[i].weburl}" target="_blank">${directory[i].weburl}</a>`;

                number++;
            }
        });
}
