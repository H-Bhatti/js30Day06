const dataFromJson = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(dataFromJson).then(element=>element.json()).then(data=>cities.push(...data))

console.log(cities);

function findMatch (inputWord, cities){
    return cities.filter(element=>{
        //checking for the word in each index of the cities array
        // let regex = new RegExp(inputWord, 'gi')

        return element.city.match(RegExp(inputWord, 'gi')) || element.state.match(RegExp(inputWord, 'gi'))
    })
}
//also try with only one funtion instead of two neste

function displayMatch(){
    console.log(this.value);
    //now calling the findMatch function with the value we ot from he search input event listner
    let matchArray = findMatch(this.value, cities )
    console.log(matchArray)
    //matcharray got the return value from the filter function of the findmatch function


    suggestions.innerHTML = matchArray.map(element=>{

        //makaing regex for highlighting the seache value
        let regex = new RegExp(this.value, "gi")
        console.log(regex);
        let cityName = element.city.replace(regex, ` <span class="hl" >${this.value}</span>`)
        console.log(cityName)
        let stateName = element.state.replace(regex, ` <span class="hl">${this.value}</span>`)
        // using reges to identify the typed in number and passing a new hl span on the specific words so that it is highilited
        let populationFormated = new Intl.NumberFormat().format(element.population) 
        //formating number 

        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${populationFormated}</span>
            </Li>
        `
    }).join("");
}

const searcInput = document.querySelector(".search")
const suggestions = document.querySelector(".suggestions")

searcInput.addEventListener("change", displayMatch)
searcInput.addEventListener("keyup", displayMatch)
//sending the value of this html event to the display matches function

