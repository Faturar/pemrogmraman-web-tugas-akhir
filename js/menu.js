// untuk merender pizza menu
function renderPizzaMenu() {
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = ""; // Clear existing content

    pizzaMenu.forEach((pizza, index) => {
        const card = document.createElement("div");
        card.className = "card-menu";
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-duration", "500");

        card.innerHTML = `
            <img src="${pizza.image}" alt="${pizza.title}">
            <div class="card-menu-content">
                <h3>${pizza.title}</h3>
                <div class="card-menu-info">
                    <div class="card-menu-star">
                        ${generateStars(pizza.rating)}
                    </div>
                    <p class="card-menu-price">Rp. ${pizza.price.toLocaleString("id-ID")},00</p>
                </div>
            </div>
            <button class="card-menu-button" onclick="orderPizza(${index})">Pesan</button>
        `;

        menuContainer.appendChild(card);
    });
}

renderPizzaMenu();