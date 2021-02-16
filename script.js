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