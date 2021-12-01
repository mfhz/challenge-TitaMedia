/****** VARIABLES  ******/
const menu = document.querySelector('.header__elements');
const elementsMenu = document.getElementsByClassName('header__list');
const elementsMenuGrid = document.getElementsByClassName('main__categories');
const containerImages = document.querySelector('.main__collaction');
const containerImagesView = document.querySelector('.main__collaction-view');
const iconViewLinear = document.querySelector('.fa-equals');
const iconViewSquare = document.querySelector('.fa-th-large');
const menuHamburguer = document.querySelector('.header__menu--input')
const btn = document.querySelector('.main__button');
const KEY = '-ZF7UX8191xAhpkiMMDhc4FCyqKocEZs9LJHSDCHQ1c';
const NUM = 9;
let arrayImages = [];
let arrayResults = [];






/****** FUNCIONES  ******/
/** Función que bloquea el Nav al presionar en el menú hamburguesa en Mobile **/
function blockScreen() {
    menuHamburguer.style.overflow = 'hidden';
    document.body.classList.toggle('navbar');
}
/** Función que cambia la vista de la GRID de imágenes **/
function changeView(e) {
    e.preventDefault();
    if (containerImages.classList.contains('main__collaction') && e.target.classList.contains('fa-equals')) {
        containerImages.classList.remove('main__collaction');
        containerImages.classList.add('main__collaction-view');
    } else if (containerImages.classList.contains('main__collaction-view') && e.target.classList.contains('fa-th-large')) {
        containerImages.classList.remove('main__collaction-view');
        containerImages.classList.add('main__collaction');
    }   
    
}
/** Función para que cuando se de clic a una de las categorias de la GRID muestre otras imágenes **/
function categoryImages() {
    arrayImages = [];
    arrayResults = [];
    fetchData();
}
/** Función que imprime el resultado de la petición de la API. Mostrando de a 10 imágenes con el botón **/
function printImagesHTML(list) {
    let positionStart = 0;
    let positionEnd = NUM;

    parcialResult = list.slice(positionStart, positionEnd);

    parcialResult.map((result) => result.style = 'unset');

    if (list.length <= positionEnd) {
        btn.classList.add('hidden')
    } 

    btn.addEventListener('click', () => {
        if (positionStart + NUM <= list.length || positionEnd + NUM <= list.length) {
            parcialResult = list.slice(positionStart + NUM, positionEnd + NUM);
            positionEnd += NUM;
            positionStart += NUM;
            parcialResult.map((result) => result.style = 'unset');
            if (list.length <= positionEnd) {
                btn.classList.add('hidden')
            }
        }
    });
}
/** Función que crea el HTML y guarda la estructura de la petición de la API**/
function saveImagesHTML(img) {
    containerImages.classList.remove('hidden');
    containerImages.innerHTML = ''
    img.map((el) => {
        containerImages.innerHTML += `
            <div style=display:none class="main__collaction-container">
                <img class="main__collaction--img" src="${el}" alt="">
            </div>        
        `;
    });
    for (let i = 0; i < containerImages.children.length; i++) {
        arrayResults.push(containerImages.children[i]);        
    }
    printImagesHTML(arrayResults);
    
}
/** Función que invoca el servicio API REST **/
const fetchData = async () => {
    try {
        const images = await fetch(`https://api.unsplash.com/photos/random?client_id=${KEY}&count=30`)
        const response = await images.json();
        response.map((el) => {
            arrayImages.push(el.urls.full);
        })
        saveImagesHTML(arrayImages);
    } catch (error) {
        console.log(error);
    }
}





/****** EVENTOS  ******/
/** Evento para que cuando termine de cargar el DOM realice la petición API REST para la visualización de las imágenes**/
addEventListener('DOMContentLoaded', () => {
    fetchData();    
});
iconViewLinear.addEventListener('click', changeView);
iconViewSquare.addEventListener('click', changeView);
menuHamburguer.addEventListener('click',  blockScreen);
/** Evento para cuando el menu esté activo se colorea **/
for (let i = 0; i < elementsMenu.length - 1; i++) {
    elementsMenu[i].addEventListener("click", function() {
        let active = document.getElementsByClassName("active");
        active[0].className = active[0].className.replace(" active", "");
        this.className += " active";
    });    
}
/** Evento para cuando el menu de las grilla esté activo se colorea y además realiza la petición Fetch
 por cada una de las categorias del menu y muestra imágenes distintas **/
for (let i = 0; i < elementsMenuGrid.length; i++) {
    elementsMenuGrid[i].addEventListener("click", function() {
        let active = document.getElementsByClassName("active2");
        active[0].className = active[0].className.replace(" active2", "");
        this.className += " active2";
        categoryImages();
    });    
}