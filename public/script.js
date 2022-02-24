const header = document.querySelector("#header");
const headerHeight = header.getBoundingClientRect().height;

window.addEventListener("scroll", () => {
    if (window.scrollY > headerHeight / 2) {
        header.setAttribute("class", "background");
    } else {

        header.setAttribute("class", "");
    }
});

