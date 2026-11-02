"use strict";
document.addEventListener('DOMContentLoaded', () => {
  // This HTML body is getting long and difficult to read with the bootstrap implementation.
  // We will now be implementing templates to help with dynamic changinges.

  const navData = {
    contactus: {
      text: "Contact Us",
      href: "/7/contactus.html"
    },
    TheFormation: {
      text: "The Formation",
      href: "/7/theformation.html"
    }, 
    PlanetExplorer: {
      text: "Planet Explorer",
      href: "/7/planetexplorer.html"
    }, 
    home: {
      text: "Home",
      href: "/7/index.html"
    },
  };

  for (const navDetails of Object.keys(navData)) {
    const newNav = document.createElement("li");
    const Anchor = document.createElement("a");
    if (navData[navDetails]["href"]) {
      Anchor.href = navData[navDetails]["href"];
      Anchor.textContent = navData[navDetails]["text"];

      // Duplicate and append before Bootstrap class tagging.
      Anchor.className = "footerlinkredirects";
      document.getElementById("InternalRedirects").appendChild(Anchor.cloneNode(true));

      // ClassName overwrite for the navbar link.
      Anchor.className = "nav-link";
      newNav.appendChild(Anchor);
    } else {
      Anchor.textContent = navData[navDetails]["text"];
      newNav.appendChild(Anchor);
    }
    newNav.className = "nav-item me-3";
    document.getElementById("NavsHolder").insertAdjacentElement("afterbegin", newNav);
  }

});