document.querySelector('.order-button').addEventListener('click', function() {
    let totalAmount = 0;
    let receiptHTML = '';

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };

    selectedPizzas.forEach(pizza => {
        pizzaMenu.forEach(menu => {
            if (menu.title === pizza.title) {
                const itemTotal = pizza.quantity * menu.price;

                console.log(menu);

                receiptHTML += `
                    <tr>
                        <td>${menu.title}</td>
                        <td>${pizza.quantity}</td>
                        <td>${formatCurrency(menu.price)}</td>
                        <td>${formatCurrency(itemTotal)}</td>
                    </tr>
                `;

                totalAmount += itemTotal;
            }
        })
    });

    document.querySelector('#receipt-body').innerHTML = receiptHTML;
    document.querySelector('#receipt-total-price').innerHTML = `Total: ${formatCurrency(totalAmount)}`;

    const date = new Date();
    const formattedDate = date.toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    document.querySelector('#receipt-date').textContent = formattedDate;

    document.querySelector('#receipt-modal').style.display = 'block';
});

document.querySelector('#close-modal').addEventListener('click', function() {
    document.querySelector('#receipt-modal').style.display = 'none';
});

document.querySelector('#close-modal').addEventListener('click', function() {
    document.querySelector('#receipt-modal').style.display = 'none';
});

// Select Generator
function selectGenerator() {
    const orderMenu = document.getElementById("order-menu");
    const newOrderContainer = document.createElement("div");
    newOrderContainer.className = "order-pizza-container";

    const selectPizza = document.createElement("select");
    selectPizza.name = "pizza";
    selectPizza.className = "order-pizza";
    selectPizza.required = true;

    selectPizza.addEventListener("change", function () {
        validateBeforePizzaSelection(this);
    
        if (this.value !== '') {
            this.disabled = true;
        }
    });

    selectPizza.innerHTML = `
        <option value="" disabled selected>Pilih Pizza</option>
    `;

    pizzaMenu.forEach(pizza => {
        const option = document.createElement("option");
        option.value = pizza.title;
        option.textContent = pizza.title;
        selectPizza.appendChild(option);
    });

    selectedPizzas.forEach(pizza => {
        const option = selectPizza.querySelector(`option[value="${pizza.title}"]`);
        if (option) {
            option.disabled = true;
        }
    });

    const orderQuantity = document.createElement("div");
    orderQuantity.className = "order-quantity";
    orderQuantity.innerHTML = `
        <button type="button" onclick="decrement(this)">-</button>
        <div id="counter">1</div>
        <button type="button" onclick="increment(this)">+</button>
    `;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";
    deleteButton.className = "delete-pizza-button";
    deleteButton.onclick = function () {
        removePizza(newOrderContainer, selectPizza.value);
    };

    newOrderContainer.appendChild(selectPizza);
    newOrderContainer.appendChild(orderQuantity);
    newOrderContainer.appendChild(deleteButton);

    orderMenu.appendChild(newOrderContainer);
}

selectGenerator()
summarizeOrder();

// Generate pizza options
function generatePizzaOptions() {
    const pizzaSelect = document.querySelector(".order-pizza");
    pizzaMenu.forEach(pizza => {
        const option = document.createElement("option");
        option.value = pizza.title;
        option.textContent = pizza.title;
        pizzaSelect.appendChild(option);
    });
}

generatePizzaOptions();

let quantity = 1;

// Increment function for the quantity
function increment(button) {
    const counter = button.previousElementSibling;
    let quantity = parseInt(counter.innerText);
    quantity++;
    counter.innerText = quantity;
    updatePizzaQuantity(button, quantity);

    summarizeOrder();
}

// Decrement function for the quantity
function decrement(button) {
    const counter = button.nextElementSibling;
    let quantity = parseInt(counter.innerText);

    if (quantity > 1) {
        quantity--;
        counter.innerText = quantity;
        updatePizzaQuantity(button, quantity);
    }

    summarizeOrder();
}

// Function to update the quantity of a pizza
function updatePizzaQuantity(button, quantity) {
    const pizzaContainer = button.closest('.order-pizza-container');
    
    const selectElement = pizzaContainer.querySelector('select');
    const pizzaName = selectElement.options[selectElement.selectedIndex].text;

    console.log('Selected pizza name:', pizzaName);

    const pizza = selectedPizzas.filter(pizza => pizza.title === pizzaName)[0];

    if (pizza) {
        pizza.quantity = quantity;
        console.log('Updated pizza:', pizza);
    } else {
        console.error('Pizza not found:', pizzaName);
    }
}

// Function to validate before pizza selection
function validateBeforePizzaSelection(select) {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!name || !phone || !address) {
        alert("Silahkan isi data terlebih dahulu");
        select.value = ""; 
    }

    if (select.value === "") {
        alert("Silahkan pilih pizza terlebih dahulu");
        return;
    }

    if (!selectedPizzas.some(pizza => pizza.title === select.value)) {
        selectedPizzas.push({
            title: select.value,
            quantity: quantity
        });
    }

    const options = select.getElementsByTagName('option');
        for (let option of options) {
            if (option.value === select) {
                option.disabled = true;
                break;
            }
    }

    summarizeOrder();
}

// Function to add pizza selection and quantity
function addPizza() {
    const orderMenu = document.getElementById("order-menu");
    const allSelects = orderMenu.querySelectorAll("select");

    for (let select of allSelects) {
        const selectedPizza = select.value;

        if (selectedPizza === "") {
            alert("Silahkan pilih pizza terlebih dahulu");
            return;
        }

        // Add the pizza to the selectedPizzas array if it's not already added
        if (!selectedPizzas.some(pizza => pizza.title === selectedPizza)) {
            selectedPizzas.push({
                title: selectedPizza,
                quantity: quantity
            });
        }

        // Disable the selected pizza in the dropdown to prevent duplication
        const options = select.getElementsByTagName('option');
        for (let option of options) {
            if (option.value === selectedPizza) {
                option.disabled = true;
                break;
            }
        }
    }

    selectGenerator();
    summarizeOrder();
}

// Function to remove pizza section and its data
function removePizza(pizzaContainer, pizzaTitle) {
    pizzaContainer.remove();

    selectedPizzas = selectedPizzas.filter(pizza => pizza.title !== pizzaTitle);

    const orderSummaryList = document.getElementById("order-summary-list");
    const summaryRows = orderSummaryList.querySelectorAll("tr");

    summaryRows.forEach(row => {
        const rowTitle = row.querySelector("td:first-child")?.textContent;
        if (rowTitle === pizzaTitle) {
            row.remove();
        }
    });

    summarizeOrder();
}

// Summarize the order and calculate the total price
function summarizeOrder() {
    const orderSummaryList = document.getElementById("order-summary-list");
    const totalPriceElement = document.getElementById("total-price");

    orderSummaryList.innerHTML = '';
    let totalPrice = 0;

    selectedPizzas.forEach(pizza => {
        pizzaMenu.forEach(menu => {
            if (menu.title === pizza.title) {
                // Create a new row for the pizza order summary
                const pizzaSummaryRow = document.createElement("tr");

                // Create and append columns for pizza details
                const pizzaNameCell = document.createElement("td");
                pizzaNameCell.textContent = pizza.title;
                pizzaSummaryRow.appendChild(pizzaNameCell);

                const pizzaQuantityCell = document.createElement("td");
                pizzaQuantityCell.textContent = pizza.quantity;
                pizzaSummaryRow.appendChild(pizzaQuantityCell);

                const pizzaPriceCell = document.createElement("td");
                pizzaPriceCell.textContent = `Rp ${menu.price.toLocaleString()}`;
                pizzaSummaryRow.appendChild(pizzaPriceCell);

                const pizzaTotalCell = document.createElement("td");
                const pizzaTotalPrice = menu.price * pizza.quantity;
                pizzaTotalCell.textContent = `Rp ${pizzaTotalPrice.toLocaleString()}`;
                pizzaSummaryRow.appendChild(pizzaTotalCell);

                // Append the row to the order summary table
                orderSummaryList.appendChild(pizzaSummaryRow);

                // Add the pizza total price to the total order price
                totalPrice += pizzaTotalPrice;
            }
        });
    });

    totalPriceElement.innerHTML = `Total: Rp ${totalPrice.toLocaleString()}`;
}

