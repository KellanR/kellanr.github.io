"use strict";
const TITLETAG = document.querySelector("title")
const PLANETTEMPLATE = document.querySelector("#planetTemplate").content;
const SELECTORTEMPLATE = document.querySelector("#selectorTemplate").content
const DETAILSTEMPLATE = document.querySelector("#detailsTemplate").content

function loadDetails(jsonIndex) {
    document.querySelector("main").remove()
    let detailsCopy = DETAILSTEMPLATE.cloneNode(true);
    detailsCopy.querySelector("#Title").textContent = jsonIndex.name
    const ROWFORMAT = detailsCopy.querySelector("#rowFormat")
    const TBODY = detailsCopy.querySelector("tbody")
    detailsCopy.querySelector("#Img").alt = `A picture of ${jsonIndex.name}.`
    // Mass
    let newRow = ROWFORMAT.cloneNode(true)
    let rowValues = newRow.querySelectorAll("td");
    rowValues[0].textContent = "Mass";
    rowValues[1].textContent = jsonIndex.massKg;
    TBODY.appendChild(newRow)

    // Diameter
    newRow = ROWFORMAT.cloneNode(true)
    rowValues = newRow.querySelectorAll("td");
    rowValues[0].textContent = "Diameter";
    rowValues[1].textContent = jsonIndex.diameterKm;
    TBODY.appendChild(newRow);

    // OrbitalPeriod
    newRow = ROWFORMAT.cloneNode(true)
    rowValues = newRow.querySelectorAll("td");
    rowValues[0].textContent = "Orbital Period";
    rowValues[1].textContent = jsonIndex.orbitalPeriod;
    TBODY.appendChild(newRow);

    // DistanceFromTheSun
    newRow = ROWFORMAT.cloneNode(true)
    rowValues = newRow.querySelectorAll("td");
    rowValues[0].textContent = "Distance from the Sun";
    rowValues[1].textContent = jsonIndex.distanceFromSun;
    TBODY.appendChild(newRow);

    // Moons
    newRow = ROWFORMAT.cloneNode(true)
    rowValues = newRow.querySelectorAll("td");
    rowValues[0].textContent = "Moons";
    rowValues[1].textContent = jsonIndex.moons;
    TBODY.appendChild(newRow);

    ROWFORMAT.remove()
    document.querySelector("header").after(detailsCopy);

}

function loadPlanet(jsonIndex) {
    document.querySelector("main").remove()
    TITLETAG.textContent = `${jsonIndex.name} | Up In Space!`
    let planetCopy = PLANETTEMPLATE.cloneNode(true);
    planetCopy.querySelector("#Title").textContent = jsonIndex.name
    planetCopy.querySelector("#Desc").textContent = jsonIndex.summary
        .querySelector("#Img").alt = `A picture of ${jsonIndex.name}.`
    planetCopy.querySelector("button").textContent = `Learn more about ${jsonIndex.name}`
    planetCopy.querySelector("button").addEventListener("click", () => {
        loadDetails(jsonIndex)
    })
    document.querySelector("header").after(planetCopy);
}
function loadSelectors(dataObject) {
    const selectorCopy = SELECTORTEMPLATE.cloneNode(true);
    selectorCopy.querySelector("#Title").textContent = "Planet Selection"
    selectorCopy.querySelector("#Desc").textContent = "Please, select a planet to explore the details about!"

    const cardFormat = selectorCopy.querySelector("#PLANETTYPEHERE");
    // Inner Planets
    for (let i = 0; i < 4; i++) {
        let cardClone = cardFormat.cloneNode(true);
        let jsonIndex = dataObject.groups[0].planets[i]
        cardClone.id = jsonIndex.name;
        cardClone.querySelector("#Img").alt = `A picture of ${jsonIndex.name}.`
        cardClone.querySelector("button").textContent = jsonIndex.name;
        cardClone.querySelector("button").addEventListener("click", () => {
            LoadPlanet(jsonIndex)
        })
        selectorCopy.querySelector("#selectionHolder").appendChild(cardClone)
    }
    // Outer Planets
    for (let i = 0; i < 4; i++) {
        let cardClone = cardFormat.cloneNode(true);
        let jsonIndex = dataObject.groups[1].planets[i]
        cardClone.id = jsonIndex.name;
        cardClone.querySelector("#Img").alt = `A picture of ${jsonIndex.name}.`
        cardClone.querySelector("button").textContent = jsonIndex.name;
        cardClone.querySelector("button").addEventListener("click", () => {
            loadPlanet(jsonIndex)
        })
        selectorCopy.querySelector("#selectionHolder").appendChild(cardClone)
    }
    cardFormat.remove();
    document.querySelector("header").after(selectorCopy);

}

fetch("data/planets.json")
    .then(data => {
        if (!data.ok) {
            throw new Error("Bad HTTP!")
        }
        return data.json();
    }).then(dataObject => {
        loadSelectors(dataObject)

    }).catch(error => {
        console.error("Something went wrong: ", error);
    });