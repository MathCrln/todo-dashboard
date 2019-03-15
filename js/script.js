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
    let body = document.body;
    let h1 = document.querySelector("h1");
    let h2 = document.getElementsByTagName("h2");
    let h3 = document.getElementsByTagName("h3");
    // let h3 = document.querySelectorAll("h3");
    body.classList.toggle("light");
    body.classList.toggle('trueBlack');
    h1.classList.toggle("white");

    for (i = 0; i < h2.length; i++) {
        h2[i].classList.toggle("red");
    }

    for (i = 0; i < h3.length; i++) {
        h3[i].classList.toggle("red");
    }
    let status = 0;
    status = activatedOrDesactivated();
    console.log(status);
}