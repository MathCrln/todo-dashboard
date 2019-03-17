let body = document.body;
let h1 = document.querySelector("h1");
let h2 = document.getElementsByTagName("h2");
let h3 = document.getElementsByTagName("h3");
let nav = document.getElementById("main-menu");
let item = document.getElementsByClassName("item");
let footer = document.getElementById("footer");
let level2 = document.getElementById("level2");
let categories = document.querySelectorAll(".category");
let elements = document.querySelectorAll(".elements");
let count = 0;
const activatedOrDesactivated = () => {
    count++;
    if (count % 2 == 0) {
        return "Dark Mode desactivated";
    } else {
        return "Dark Mode activated";
    }
}
const toggleDarkMode = () => {


    // Changing the classes
    // Body
    body.classList.toggle('dark1');

    h1.classList.toggle("white-text");
    for (i = 0; i < h2.length; i++) {
        h2[i].classList.toggle("white-text");
    }

    nav.classList.toggle("dark2");
    // nav.classList.toggle("text-white");

    level2.classList.toggle("dark2");

    footer.classList.toggle("white-text");



    for (i = 0; i < categories.length; i++) {
        categories[i].classList.toggle("dark3");
    }

    for (i = 0; i < h3.length; i++) {
        h3[i].classList.toggle("white-text");
    }
    for (i = 0; i < elements.length; i++) {
        elements[i].classList.toggle("white-text");
    }
    let status = 0;
    status = activatedOrDesactivated();
}