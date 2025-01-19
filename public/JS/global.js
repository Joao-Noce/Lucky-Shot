document.addEventListener("DOMContentLoaded", () => {
    const icons = document.getElementsByName("icon");
    icons.forEach(icon => {
        const randomTop = Math.random() * 100 - 10;
        const randomLeft = Math.random() * 100 - 10;
        const randomSize = Math.random() * 30 + 20;
        
        icon.style.top = `${randomTop}vh`;
        icon.style.left = `${randomLeft}vw`;
        icon.style.fontSize = `${randomSize}px`;
    });
});

if (sessionStorage.ID_USUARIO == undefined) tres_barras.innerHTML = '<a href="../../../index.html"><i class="fa-solid fa-right-from-bracket"></i></a>';