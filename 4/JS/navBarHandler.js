"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // This HTML body is getting long and difficult to read with the bootstrap implementation.
    // We will now be implementing templates to help with dynamic changinges.
    
      const navData = {
        login: {
          text: "Login",
          href: "/4/login.html"
        },

        planetDesc: {
          text: "Planet Breakdown",
          href: "/4/choices.html"
        }
      }
        for (const navDetails of Object.keys(navData)) {
          const newNav = document.createElement("li")
          if (navData[navDetails]["href"]){
            const Anchor = document.createElement("a")
            Anchor.className = "nav-link"
            Anchor.href = navData[navDetails]["href"]
            Anchor.textContent = navData[navDetails]["text"]
            newNav.appendChild(Anchor)
          }
          newNav.className = "nav-item me-3"
          document.getElementById("NavsHolder").appendChild(newNav)
        }
  })