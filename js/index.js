AOS.init();

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});


const pizzaMenu = [
    { title: "Veggie Delight Pizza", price: 169900, image: "./assets/img/menu_img1.png", rating: 5 },
    { title: "Four Cheese Fantasy Pizza", price: 169900, image: "./assets/img/menu_img2.png", rating: 5 },
    { title: "Garden of Eden Pizza", price: 169900, image: "./assets/img/menu_img3.png", rating: 4 },
    { title: "Pepperoni Power Pizza", price: 169900, image: "./assets/img/menu_img4.png", rating: 4 },
    { title: "Margherita Magic Pizza", price: 169900, image: "./assets/img/menu_img5.png", rating: 5 },
    { title: "Hawaiian", price: 169900, image: "./assets/img/menu_img6.png", rating: 5 },
    { title: "BBQ Chicken", price: 169900, image: "./assets/img/menu_img7.png", rating: 5 },
    { title: "Veggie Supreme", price: 169900, image: "./assets/img/menu_img8.png", rating: 5 },
    { title: "Meat Lovers", price: 169900, image: "./assets/img/menu_img9.png", rating: 5 },
    { title: "Seafood Feast", price: 169900, image: "./assets/img/menu_img10.png", rating: 5 },
    { title: "Pepperoni", price: 169900, image: "./assets/img/menu_img11.png", rating: 5 },
    { title: "Buffalo Chicken", price: 169900, image: "./assets/img/menu_img12.png", rating: 5 },
];

let selectedPizzas = []; 

function generateStars() {
    let stars = "";
    for (let i = 0; i < 5; i++) {
        stars += `<img src="./assets/img/ic_star.png" alt="">`;
    }
    return stars;
}

// Method order pizza
function orderPizza() {
    window.location.href = "order.html";
}