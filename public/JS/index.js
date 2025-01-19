for (let i = sessionStorage.length - 1; i >= 0; i--) {
    const chave = sessionStorage.key(i);
    if (!chave.startsWith("JOGOU_")) sessionStorage.removeItem(chave);
}

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.borderBottom = "solid white 2px";
        } else {
            header.style.borderBottom = "none";
        }
    });
});