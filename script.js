    /* MOBILE MENU */
    const menuIcon = document.querySelector("#menu-icon");
    const navbar = document.querySelector(".navbar");

    if (menuIcon && navbar) {
        menuIcon.addEventListener("click", () => {
            menuIcon.classList.toggle("fa-xmark");
            navbar.classList.toggle("active");
        });
    }

    /* ACTIVE NAVIGATION */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    /* CLOSE MOBILE MENU */
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navbar) navbar.classList.remove("active");

            if (menuIcon) {
                menuIcon.classList.remove("fa-xmark");
            }
        });
    });

    /* TYPING EFFECT */
    const typingElement = document.querySelector(".multiple-text");

    if (typingElement) {
        const texts = [
            "BSIT Student",
            "Hardware Specialist",
            "Technical Support Enthusiast",
            "Video Editor"
        ];

        let textIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentText = texts[textIndex];

            if (!deleting) {
                typingElement.textContent =
                    currentText.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex === currentText.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1500);
                    return;
                }
            } else {
                typingElement.textContent =
                    currentText.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex === 0) {
                    deleting = false;
                    textIndex++;

                    if (textIndex >= texts.length) {
                        textIndex = 0;
                    }
                }
            }

            setTimeout(typeEffect, deleting ? 60 : 100);
        }

        typeEffect();
    }

    /* DARK MODE */
    const themeToggle = document.getElementById("theme-toggle");

    if (themeToggle) {
        const icon = themeToggle.querySelector("i");

        // Load saved theme
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("light-mode");
            icon.classList.replace("fa-moon", "fa-sun");
        }

        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {
                icon.classList.replace("fa-moon", "fa-sun");
                localStorage.setItem("theme", "light");
            } else {
                icon.classList.replace("fa-sun", "fa-moon");
                localStorage.setItem("theme", "dark");
            }
        });
    }

    /* CONTACT FORM WITH EMAILJS */
    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('input[type="submit"]');
            submitBtn.value = "Sending...";
            submitBtn.disabled = true;

            emailjs.sendForm(
                "service_qnldbe4",
                "template_na8773u",
                this
            )
            .then(() => {
                alert("Message sent successfully!");
                contactForm.reset();

                submitBtn.value = "Send Message";
                submitBtn.disabled = false;
            })
            .catch((error) => {
                console.error("EmailJS Error:", error);

                alert(
                    "Failed to send message.\n\n" +
                    "Error: " + JSON.stringify(error)
                );

                submitBtn.value = "Send Message";
                submitBtn.disabled = false;
            });
        });
    }

    /* BACK TO TOP */
    const backToTop = document.querySelector(".footer-iconTop a");

    if (backToTop) {
        backToTop.addEventListener("click", (e) => {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    console.log("Portfolio JavaScript Loaded Successfully!");