let land = {};
let city = {};
let cities = [];
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
    /*here you can loop throug contry to add to the nav bar*/
}

fetch("json/stad.json")
.then((response) => response.json())
.then((data) => cityList(data))

function cityList(city) {
    createPlaces(city);
    console.log(cities);
}

 
