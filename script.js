let land = {};
let city = {};
let cities = [];
let root = document.getElementById("root");
renderStartPage();
let navbar = document.getElementById("navbar");
let boxWrapper = document.getElementById("box-wrapper");

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
    let renderCountries = "<ul>"
    for(i in land) {
        renderCountries += `<li>${land[i].countryname}</li>`;
    }
    renderCountries += "</ul>";
    navbar.insertAdjacentHTML("afterbegin", renderCountries);
}

fetch("json/stad.json")
.then((response) => response.json())
.then((data) => cityList(data))

function cityList(city) {
    createPlaces(city);
    console.log(cities);
}

function renderStartPage() {
    let startPage =  
    `
    <nav id="navbar"></nav>
    <main id="box-wrapper"></main>
    `;
    root.insertAdjacentHTML("afterbegin", startPage);
}