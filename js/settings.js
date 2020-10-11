const menu = document.getElementById('menu-principal');
const cerrar = document.getElementById('cerrar');
const config = document.getElementById('aside');

menu.addEventListener('click', () => {
    config.style.transform = `translateX(0%)`;
})

cerrar.addEventListener('click', () => {
    config.style.transform = `translateX(-100%)`;
})