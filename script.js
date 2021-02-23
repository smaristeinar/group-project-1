let key = "82e2f976b6758fe7f7e98cc5fe2e6a27";
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
    getCityName(id){
        if (id == this.id) {
            return this.stadname.toLowerCase()
        }
    }
}



let createPlaces = function(city){//creates a new object with all the stad data and puts them in cities
    for (let i = 0; i < city.length; i++) {
        let citys = city[i];
        let item = new place(citys.id, citys.stadname, citys.countryid, citys.population);
        cities.push(item);
    }
}



fetch("json/land.json")
.then((response) => response.json())// takin in the data from land.json and extracting the objects from it
.then((data) => countryList(data))// then using the date in the countryList below

function countryList(country) {
    land = country;
    let renderCountries = "<ul><h2>Countries</h2>" // adding a header
    for(i in land) { // creating htlm for every land 
        renderCountries += `<li id="${land[i].id}" class='clickable-list'>${land[i].countryname}</li>`;
    }
    renderCountries += "</ul>";
    countryWrapper.insertAdjacentHTML("afterbegin", renderCountries); //inserting it in to the DOM
}

fetch("json/stad.json")
.then((response) => response.json())
.then((data) => cityList(data)) //taking in the stad data from stad.json

function cityList(city) {
    createPlaces(city); // creates objects
    console.log(cities);
}

countryWrapper.addEventListener("click", (e) => {// makes every country clickable and returns the id to renderCountryPage
    renderCountryPage(e.target.id);
    addClickableList();
});

let addClickableList = function(){// makes the cities clickable
    document.getElementById("ulid").addEventListener("click", (e) => {
        let cityId = e.target.id;
        returnWeather(e.target.innerHTML.toLowerCase(),key);
        renderCityPage(cityId);
        let storeCity = document.getElementById("store-city");
        storeVisitedBtn(storeCity, cityId);//then makes the visted boutton clickable
    });
}

visitedCities.addEventListener("click", () => {
    renderVisitedCities(); //makes the visited cities in the nav work
});

function storeVisitedBtn(storeCity, cityId) {
    storeCity.addEventListener("click", () => {
        localStorage.setItem("cityID", cityId);
    });
}

function returnWeather(name, ak){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${ak}`)
    .then((response) => response.json())
    .then(function(data){
    let htlmstring = "wether: " + data.weather[0].main + " Temp: " + data.main.temp +"°";
        document.getElementById("weather").insertAdjacentHTML("beforeend",htlmstring);
        console.log(data);
    })
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
    let renderCities = `<ul id="ulid">`;
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
            <ul id="cityUl">
            <h2>${cities[city].stadname}</h2>
            <li>Population: ${cities[city].population}</li>
            <li id=weather></li>
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

    displayVisitedCities += "<div id='deleteBtn'>Delete visited cities</div>";

    cityWrapper.insertAdjacentHTML("beforeend", displayVisitedCities);

    let deleteBtn = document.getElementById("deleteBtn");

    deleteBtn.addEventListener("click", function() {
        localStorage.clear();
        renderVisitedCities();
    });    
}




