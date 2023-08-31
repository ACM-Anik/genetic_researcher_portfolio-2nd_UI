document.addEventListener("DOMContentLoaded", function () {
    const mobileMenu = document.querySelector(".mobile_menu");

    document.querySelector(".hamburger").addEventListener("click", function () {
        // mobileMenu.classList.toggle("opened");

        const rightValue = parseInt(mobileMenu.style.right);
        if (rightValue < 0) {
            mobileMenu.style.right = "0";
        } else {
            mobileMenu.style.right = "-200px";
        }
    });

    function closeMobileMenuOnDesktop() {
        if (window.innerWidth > 768) {
            mobileMenu.style.right = "-200px";
        }
    }

    // Initial check and on window resize
    closeMobileMenuOnDesktop();
    window.addEventListener("resize", closeMobileMenuOnDesktop);

    // ----------------------------------------------------------------------

    const card = document.querySelector(".fixed-buttons");
    const content = document.getElementById("second-page");
    const buttons = document.querySelectorAll(".single-button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            card.style.display = "none";
            content.style.display = "block";
        });
    });

    // --------------------------------------------------------------

    const navbarLinks = document.querySelectorAll(".single-button");
    const sections = document.querySelectorAll(".single-section");
    const navbar = document.querySelector(".navbar");
    const header = document.querySelector("header")
    const homePage = document.getElementById("home");


    sections.forEach(function (section, index) {
        if (index === 0) {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    });

    navbarLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetSectionId = link.getAttribute("href");
            const targetSection = document.querySelector(targetSectionId);

            if (targetSection) {
                sections.forEach(function (section) {
                    section.style.display = "none";
                });
                targetSection.style.display = "block";

                if (targetSection.id === "home") {
                    navbar.style.display = "none";
                    header.style.display = "none";
                } else {
                    navbar.style.display = "flex";
                    header.style.display = "block";
                }

                window.scrollTo({ top: targetSection.offsetTop, behavior: "smooth" });

                navbarLinks.forEach(function (link) {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${targetSection.id}`) {
                        link.classList.add("active");
                    }
                });

                // Push the new URL to the browser's history
                history.pushState(null, null, targetSectionId);
            }
        });
    });

    // Handle popstate event to restore sections when using browser back/forward buttons
    window.addEventListener("popstate", function () {
        const targetSectionId = location.hash;
        const targetSection = document.querySelector(targetSectionId);

        if (targetSection) {
            sections.forEach(function (section) {
                section.style.display = "none";
            });
            console.log(targetSection);
            targetSection.style.display = "block";
            window.scrollTo({ top: targetSection.offsetTop, behavior: "smooth" });


            if (targetSectionId === "#home") {
                navbar.style.display = "none";
                header.style.display = "none";

            } else if (targetSectionId != "#home") {
                navbar.style.display = "flex";
                header.style.display = "block";
                homePage.style.display = "none";
            }

            removeActiveClass();
            document.querySelector(`.single-button[href="${targetSectionId}"]`).classList.add("active");
        }
    });

});



