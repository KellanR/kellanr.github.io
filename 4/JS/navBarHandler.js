"use strict";
document.addEventListener('DOMContentLoaded', () => {
  // This HTML body is getting long and difficult to read with the bootstrap implementation.
  // We will now be implementing templates to help with dynamic changinges.

  const navData = {
    home: {
      text: "Home",
      href: "/4/index.html"
    },
    InnerPlanets: {
      text: "Inner Planets",
      href: "/4/innerplanet.html"
    },
    OuterPlanets: {
      text: "Outer Planets",
      href: "/4/outerplanet.html"
    },
    TheFormation: {
      text: "The Formation",
      href: "/4/theformation.html"
    },
    contactus:{
      text: "Contact Us",
      href: "/4/contactus.html"
    },
  }

  for (const navDetails of Object.keys(navData)) {
    const newNav = document.createElement("li")
    if (navData[navDetails]["href"]) {
      const Anchor = document.createElement("a")
      
      Anchor.href = navData[navDetails]["href"]
      Anchor.textContent = navData[navDetails]["text"]
      
      // Duplicate and append before Bootstrap class tagging.
      Anchor.className = "footerlinkredirects"
      document.getElementById("InternalRedirects").appendChild(Anchor.cloneNode(true))
      
      // ClassName overwrite for the navbar link.
      Anchor.className = "nav-link"
      newNav.appendChild(Anchor)
    } else {
      Anchor.textContent = navData[navDetails]["text"]
      newNav.appendChild(Anchor)
    }
    newNav.className = "nav-item me-3"
    document.getElementById("NavsHolder").appendChild(newNav)
  }
})