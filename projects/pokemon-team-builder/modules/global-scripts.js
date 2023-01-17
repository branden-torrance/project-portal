// Toggle nav menu
function toggleMenu() {
    document.querySelector(".header__nav__list").classList.toggle("hide");
}

// Filter the Pokemon search list
function filterList() {
    const input =
        document.querySelector(".team__section__text__form--input") ||
        document.querySelector(".search__form--input");
    const filter = input.value.toUpperCase();
    const div =
        document.querySelector(".team__section__text__form--list") ||
        document.querySelector(".search__list");
    const li = div.getElementsByTagName("li");

    Array.prototype.forEach.call(li, (item) => {
        let textValue = item.textContent || item.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}
