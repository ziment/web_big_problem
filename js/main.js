(function () {
    window.addEventListener("load", function () {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        const footer = document.getElementById("footer");

        if (footer) {
            const loadText = document.createElement("p");
            loadText.textContent = `Время загрузки страницы: ${loadTime}мс`;
            loadText.classList = "footer__text";
            footer.appendChild(loadText);
        } else {
            console.warn("Footer element not found.");
        }

        const path = document.location.pathname.split("/").pop();
        const menuLinks = document.querySelectorAll(".nav__list a");

        menuLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname.split("/").pop();
            if (linkPath === path) {
                link.classList.add("nav__link--active");
            }
        });
    });
})();