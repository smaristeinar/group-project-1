fetch("json/land.json")
.then((response) => response.json())
.then((data) => countryList(data))

function countryList(country) {

    for (countryName in country) {
        console.log ("Country: ", country[countryName].countryname);
    }
}

fetch("json/stad.json")
.then((response) => response.json())
.then((data) => cityList(data))

function cityList(city) {
    for (cityName in city) {
        console.log ("City: ", city[cityName].stadname);
    }
}

//Stuck on how to merge these / draw the equal ID from both. 