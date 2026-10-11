"use strict";
fetch("js/boardingData.json")

    .then(data => {
        if (!data.ok) {
            throw new Error("Bad HTTP!")
        }
        return data.json();

    }).then(dataObject => {
        function returnItem(returnBy) {
            return document.querySelector(returnBy);
        }
        document.querySelector("#changeThemeBtn").addEventListener("click", () => {

            for (let key in dataObject) {
                switch (key) {
                    case "title": {
                        returnItem("title").textContent = dataObject[key].title;
                        break;
                    }
                    case "header": {
                        returnItem("#styleName").textContent = dataObject[key].header;
                        break;
                    }
                    case "hero": {
                        returnItem("#heroTitle").textContent = dataObject[key].headline;
                        returnItem("#heroDesc").textContent = dataObject[key].description;

                        console.log(key, dataObject[key])
                       
                        document.querySelector(".hero").style.setProperty("--hero-img", `url("${dataObject[key].image}")`) 
                        break;
                    }
                    case "sections": {
                        // Overview
                        const overviewkey = dataObject[key].overview
                        returnItem("#sec1Title").textContent = overviewkey.title;
                        returnItem("#sec1Subtitle").textContent = overviewkey.subtitle;
                        const cards = document.querySelectorAll(".card")
                        cards[0].querySelector("p").textContent = overviewkey.cards[0].description;
                        cards[1].querySelector("p").textContent = overviewkey.cards[1].description;
                        cards[2].querySelector("p").textContent = overviewkey.cards[2].description;

                        // equipment

                        const equipmentkey = dataObject[key].equipment
                        returnItem("#sec2Subtitle").textContent = equipmentkey.subtitle;

                        cards[3].querySelector("p").textContent = equipmentkey.cards[0].description;
                        cards[4].querySelector("p").textContent = equipmentkey.cards[1].description;
                        cards[5].querySelector("p").textContent = equipmentkey.cards[2].description;
                        break;
                    }
                }
            }
        })
    })