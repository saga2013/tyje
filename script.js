const cards = document.getElementById('cards');
const box = document.getElementById('box');
const searchInput = document.getElementById('search');
const typeSelect = document.getElementById('type');

let products = [];
const apiUrl = "https://fakestoreapi.com/products";

async function fetchProducts() {
    try {
        box.style.display = 'block';
        const response = await fetch(apiUrl);
        const data = await response.json();
        products = data;
        displayProducts(products);
    } catch (error) {
        console.log(error);
    } finally {
        box.style.display = "none";
    }
}

function displayProducts(products) {
    cards.innerHTML = ``;
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p><strong>Price:</strong> $${product.price}</p>
        `;
        cards.appendChild(card);
    });
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
});

typeSelect.addEventListener('change', () => {
    const type = typeSelect.value;
    if (type === "0-1000$") {
        products.sort((a, b) => a.price - b.price);
    } else if (type === "1000-0$") {
        products.sort((a, b) => b.price - a.price);
    }
    displayProducts(products);
});

fetchProducts();
