window.addEventListener("scroll", () => {
    const navbarEl = document.getElementById("navbar");

    navbarEl.classList.toggle("scroll", window.scrollY > 0);
});