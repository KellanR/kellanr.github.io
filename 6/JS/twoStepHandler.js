"use strict";
const TITLE_TAG = document.querySelector("title");
const PLANET_TEMPLATE = document.querySelector("#planetTemplate").content;
const SELECTOR_TEMPLATE = document.querySelector("#selectorTemplate").content;
const DETAILS_TEMPLATE = document.querySelector("#detailsTemplate").content;

// Loads the details for properties for planets.
// Parameters(Entire JSONObject for back button, Specific Planet Subset JSON)
function loadDetails(data, planet) {
    document.querySelector("main").remove();
    let detailsCopy = DETAILS_TEMPLATE.cloneNode(true);
    detailsCopy.querySelector("#Title").textContent = planet.name;
    const ROWFORMAT = detailsCopy.querySelector("#rowFormat");
    const TBODY = detailsCopy.querySelector("tbody");
    detailsCopy.querySelector("#PlanetImg").src = planet.image;
    detailsCopy.querySelector("#PlanetImg").alt = `A picture of ${planet.name}.`;
    detailsCopy.querySelector("#PlanetFigCaption").textContent = planet.imageCredit;
    detailsCopy.querySelector("#goBack").addEventListener("click", () => {
        loadPlanet(data, planet);
    });
    // Mass
    let newRow = ROWFORMAT.cloneNode(true);
    let rowValues = newRow.querySelectorAll("td");
    rowValues[0].textContent = "Mass";
    rowValues[1].textContent = planet.massKg;
    TBODY.appendChild(newRow);

    // Diameter
    newRow = ROWFORMAT.cloneNode(true);
    rowValues = newRow.querySelectorAll("td");
    rowValues[0].textContent = "Diameter";
    rowValues[1].textContent = planet.diameterKm;
    TBODY.appendChild(newRow);

    // OrbitalPeriod
    newRow = ROWFORMAT.cloneNode(true);
    rowValues = newRow.querySelectorAll("td");
    rowValues[0].textContent = "Orbital Period";
    rowValues[1].textContent = planet.orbitalPeriod;
    TBODY.appendChild(newRow);

    // DistanceFromTheSun
    newRow = ROWFORMAT.cloneNode(true);
    rowValues = newRow.querySelectorAll("td");
    rowValues[0].textContent = "Distance from the Sun";
    rowValues[1].textContent = planet.distanceFromSun;
    TBODY.appendChild(newRow);

    // Moons
    newRow = ROWFORMAT.cloneNode(true);
    rowValues = newRow.querySelectorAll("td");
    rowValues[0].textContent = "Moons";
    rowValues[1].textContent = planet.moons;
    TBODY.appendChild(newRow);

    ROWFORMAT.remove();
    document.querySelector("header").after(detailsCopy);

}

// Loads the planet description.
// Parameters(Entire JSONObject for back button, Specific Planet Subset JSON)
function loadPlanet(data, planet) {
    document.querySelector("main").remove();
    TITLE_TAG.textContent = `${planet.name} | Up In Space!`;
    let planetCopy = PLANET_TEMPLATE.cloneNode(true);
    planetCopy.querySelector("#Title").textContent = planet.name;
    planetCopy.querySelector("#Desc").textContent = planet.summary;
    planetCopy.querySelector("#PlanetImg").src = planet.image;
    planetCopy.querySelector("#PlanetImg").alt = `A picture of ${planet.name}.`;
    planetCopy.querySelector("#PlanetFigCaption").textContent = planet.imageCredit;
    planetCopy.querySelector("#LearnMoreBtn").textContent = `Learn more about ${planet.name}`;
    planetCopy.querySelector("#goBack").addEventListener("click", () => {
        loadSelectors(data, true);
    });
    planetCopy.querySelector("#LearnMoreBtn").addEventListener("click", () => {
        loadDetails(data, planet);
    });
    document.querySelector("header").after(planetCopy);
}

// Loads all the all the each planets out to choose from on one page.
// Parameters(JSONObject, bool detection of a to remove Main if we were going back.)
function loadSelectors(dataObject, goBack) {
    if (goBack) {
        document.querySelector("main").remove();
    }
    const selectorCopy = SELECTOR_TEMPLATE.cloneNode(true);
    TITLE_TAG.textContent = "Planet Explorer | Up in Space!";
    selectorCopy.querySelector("#Title").textContent = "Planet Selection";
    selectorCopy.querySelector("#Desc").textContent = "Please, select a planet to explore the details about!";

    const cardFormat = selectorCopy.querySelector("#PLANETTYPEHERE");

    for (let i = 0; i < dataObject.groups.length; i++) {
        for (let v = 0; v < dataObject.groups[i].planets.length; v++) {
            let cardClone = cardFormat.cloneNode(true);
            let planet = dataObject.groups[i].planets[v];
            cardClone.id = planet.name;
            cardClone.querySelector("#PlanetImg").src = planet.image;
            cardClone.querySelector("#PlanetImg").alt = `A picture of ${planet.name}.`;
            cardClone.querySelector("#PlanetFigCaptionLight").textContent = planet.imageCredit;
            cardClone.querySelector("button").textContent = planet.name;
            cardClone.querySelector("button").addEventListener("click", () => {
                loadPlanet(dataObject, planet);
            });
            selectorCopy.querySelector("#selectionHolder").appendChild(cardClone);
        }
    }
    cardFormat.remove();
    document.querySelector("header").after(selectorCopy);

}

fetch("data/planets.json")
    .then(data => {
        if (!data.ok) {
            throw new Error("Bad HTTP!");
        }
        return data.json();
    }).then(dataObject => {
        loadSelectors(dataObject);

    }).catch(error => {
        let Main = document.createElement("Main");
        Main.classList = "container-fluid flex-grow-1 d-block-flex flex-wrap align-items-center justify-content-center";
        document.querySelector("header").after(
            Main
        );
        let h2 = document.createElement("h2");
        h2.classList = "text-center";
        h2.textContent = `Uh oh! We couldn't load the planets...`;
        Main.appendChild(h2);
    });