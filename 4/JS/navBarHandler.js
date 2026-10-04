"use strict";
document.addEventListener('DOMContentLoaded', () => {
  // This HTML body is getting long and difficult to read with the bootstrap implementation.
  // We will now be implementing templates to help with dynamic changinges.

  const index_html = {
    login: {
      text: "Home",
      href: "/4/index.html"
    },

    planetDesc: {
      text: "Planet Breakdown",
      href: "/4/choices.html"
    },
    contactus:{
      text: "Contact Us",
      href: "/4/contactus.html"
    },
    TheFormation: {
      text: "The Formation",
      href: "/4/TheFormation.html"
    }
  }

  for (const navDetails of Object.keys(navData)) {
    const newNav = document.createElement("li")
    if (navData[navDetails]["href"]) {
      const Anchor = document.createElement("a")
      Anchor.className = "nav-link"
      Anchor.href = navData[navDetails]["href"]
      Anchor.textContent = navData[navDetails]["text"]
      newNav.appendChild(Anchor)
    } else {
      Anchor.textContent = navData[navDetails]["text"]
      newNav.appendChild(Anchor)
    }
    newNav.className = "nav-item me-3"
    document.getElementById("NavsHolder").appendChild(newNav)
  }
})