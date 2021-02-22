let land = {};
let city = {};
let cities = [];
let root = document.getElementById("root");
renderStartPage();
let countryWrapper = document.getElementById("country-list");
let cityWrapper = document.getElementById("city-wrapper");
let visitedCities = document.getElementById("visited-cities");

let place = class{
    constructor(id,stadname,countryid,population){
        this.id = id;
        this.stadname = stadname;
        this.countryid = countryid;
        this.population = population;
    }
    htmlrender(){
        return `<p id="${this.id}">${this.stadname}</p>`
    }
}

let createPlaces = function(city){
    for (let i = 0; i < city.length; i++) {
        let citys = city[i];
        let item = new place(citys.id, citys.stadname, citys.countryid, citys.population);
        cities.push(item);
    }
}

fetch("json/land.json")
.then((response) => response.json())
.then((data) => countryList(data))

function countryList(country) {
    land = country;
    let renderCountries = "<ul><h2>Countries</h2>"
    for(i in land) {
        renderCountries += `<li id="${land[i].id}" class='clickable-list'>${land[i].countryname}</li>`;
    }
    renderCountries += "</ul>";
    countryWrapper.insertAdjacentHTML("afterbegin", renderCountries);
}

fetch("json/stad.json")
.then((response) => response.json())
.then((data) => cityList(data))

function cityList(city) {
    createPlaces(city);
    console.log(cities);
}

countryWrapper.addEventListener("click", (e) => {
    renderCountryPage(e.target.id);
});

cityWrapper.addEventListener("click", (e) => {
    let cityId = e.target.id;
    renderCityPage(cityId);
    let storeCity = document.getElementById("store-city");
    storeVisitedBtn(storeCity, cityId);
});

visitedCities.addEventListener("click", () => {
    renderVisitedCities();
});

function storeVisitedBtn(storeCity, cityId) {
    storeCity.addEventListener("click", () => {
        localStorage.setItem("cityID", cityId);
    });
}

// Rendering Pages

function renderStartPage() {
    let startPage =  
    `
    <nav id="navbar">
        <section id="country-list"></section>
        <h2 id="visited-cities" class='clickable-list'>Visited Cities</h2>
    </nav>
    <main id="box-wrapper">
        <section id="city-wrapper"></section>
    </main>
    `;
    root.insertAdjacentHTML("afterbegin", startPage);
}

function renderCountryPage(id) {
    cityWrapper.innerHTML = "";
    let renderCities = "<ul>";
    for(city in cities) {
        if(cities[city].countryid == id) {
            renderCities +=  `<li id="${cities[city].id}" class='clickable-list'>${cities[city].stadname}</li>`;
        }
    }
    renderCities += "</ul>";
    cityWrapper.insertAdjacentHTML("afterbegin", renderCities);
}


function renderCityPage(id) {
    let renderCityInfo = "";
    for(city in cities) {
        if(cities[city].id == id) {
            cityWrapper.innerHTML = "";
            renderCityInfo += 
            `
            <ul>
            <h2>${cities[city].stadname}</h2>
            <li>Population: ${cities[city].population}</li>
            <button id="store-city" class='clickable-list' type="button">Visited</button>
            `;
        }
    }
    renderCityInfo += "</ul>";
    cityWrapper.insertAdjacentHTML("afterbegin", renderCityInfo);
}

function renderVisitedCities() {
    let cityIdInLS = localStorage.getItem("cityID");
    cityWrapper.innerHTML = "";
    let displayVisitedCities = "<ul><h2>Visited Cities</h2>";

    for(city in cities) {
        if(cityIdInLS == cities[city].id) {
            displayVisitedCities += `<li>${cities[city].stadname}</li>`
        }
    }
    displayVisitedCities += "</ul>";

    displayVisitedCities += "<button id='deleteBtn'>Delete visited cities</button>";

    cityWrapper.insertAdjacentHTML("beforeend", displayVisitedCities);

}




