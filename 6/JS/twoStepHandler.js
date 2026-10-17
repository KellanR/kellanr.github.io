"use strict";
fetch("data/planets.json")
    .then(data => {
        if (!data.ok) {
            throw new Error("Bad HTTP!")
        }
        return data.json();
    }).then(dataObject => {


        const TITLETAG = document.querySelector("title")
        const PLANETTEMPLATE = document.querySelector("#planetTemplate").content;
        const SELECTORTEMPLATE = document.querySelector("#selectorTemplate").content
        const DETAILSTEMPATE = document.querySelector("#detailsTemplate").content

        function LoadDetails(JsonIndex){
            document.querySelector("main").remove()
            let detailsCopy = DETAILSTEMPATE.cloneNode(true);
            detailsCopy.querySelector("#Title").textContent = JsonIndex.name
            const ROWFORMAT = detailsCopy.querySelector("#rowFormat")
            const TBODY = detailsCopy.querySelector("tbody")

            // Mass
            let NewRow = ROWFORMAT.cloneNode(true)
            let RowValues = NewRow.querySelectorAll("td");
            RowValues[0].textContent = "Mass";
            RowValues[1].textContent = JsonIndex.massKg;
            TBODY.appendChild(NewRow)

            // Diameter
            NewRow = ROWFORMAT.cloneNode(true)
            RowValues = NewRow.querySelectorAll("td");
            RowValues[0].textContent = "Diameter";
            RowValues[1].textContent = JsonIndex.diameterKm;
            TBODY.appendChild(NewRow);

            // OrbitalPeriod
            NewRow = ROWFORMAT.cloneNode(true)
            RowValues = NewRow.querySelectorAll("td");
            RowValues[0].textContent = "Orbital Period";
            RowValues[1].textContent = JsonIndex.orbitalPeriod;
            TBODY.appendChild(NewRow);

            // DistanceFromTheSun
            NewRow = ROWFORMAT.cloneNode(true)
            RowValues = NewRow.querySelectorAll("td");
            RowValues[0].textContent = "Distance from the Sun";
            RowValues[1].textContent = JsonIndex.distanceFromSun;
            TBODY.appendChild(NewRow);

            // Moons
            NewRow = ROWFORMAT.cloneNode(true)
            RowValues = NewRow.querySelectorAll("td");
            RowValues[0].textContent = "Moons";
            RowValues[1].textContent = JsonIndex.moons;
            TBODY.appendChild(NewRow);
           
            ROWFORMAT.remove()
            document.querySelector("header").after(detailsCopy);
       
        }
       
        function LoadPlanet(JsonIndex) {
            document.querySelector("main").remove()
            TITLETAG.textContent = `${JsonIndex.name} | Up In Space!`
            let planetCopy = PLANETTEMPLATE.cloneNode(true);
            planetCopy.querySelector("#Title").textContent = JsonIndex.name
            planetCopy.querySelector("#Desc").textContent = JsonIndex.summary
            planetCopy.querySelector("button").textContent = `Learn more about ${JsonIndex.name}`
            planetCopy.querySelector("button").addEventListener("click", () => {
                LoadDetails(JsonIndex)
            })
            document.querySelector("header").after(planetCopy);
        }

        const selectorCopy = SELECTORTEMPLATE.cloneNode(true);
        selectorCopy.querySelector("#Title").textContent = "Planet Selection"
        selectorCopy.querySelector("#Desc").textContent = "Please, select a planet to explore the details about!"

        const cardFormat = selectorCopy.querySelector("#PLANETTYPEHERE");
        // Inner Planets
        for (let i = 0; i < 4; i++) {
            let cardClone = cardFormat.cloneNode(true);
            let JsonIndex = dataObject.groups[0].planets[i]
            cardClone.id = JsonIndex.name;
            cardClone.querySelector("button").textContent = JsonIndex.name;
            cardClone.querySelector("button").addEventListener("click", () => {
                LoadPlanet(JsonIndex)
            })
            selectorCopy.querySelector("#selectionHolder").appendChild(cardClone)
        }
        // Outer Planets
        for (let i = 0; i < 4; i++) {
            let cardClone = cardFormat.cloneNode(true);
            let JsonIndex = dataObject.groups[1].planets[i]
            cardClone.id = JsonIndex.name;
            cardClone.querySelector("button").textContent = JsonIndex.name;
            cardClone.querySelector("button").addEventListener("click", () => {
                LoadPlanet(JsonIndex)
            })
            selectorCopy.querySelector("#selectionHolder").appendChild(cardClone)
        }
        cardFormat.remove();
        document.querySelector("header").after(selectorCopy);





    }).catch(error => {
        console.error("Something went wrong: ", error);
    });