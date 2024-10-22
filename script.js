const productForm = document.getElementById("product-form");
let products = [];

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const productName = document.getElementById("product-name").value;
  const price = parseFloat(document.getElementById("price").value);
  const imageUrl = document.getElementById("image").value;

  if (isNaN(price) || price <= 0) {
    alert("price ต้องเป็นตัวเลขและมากกว่า 0.");
    return;
  }

  if (!/\.(jpg|png|gif)$/i.test(imageUrl)) {
    alert("image URL ใช้ jpg, png, gif เท่านั้น");
    return;
  }

  const product = { id: Date.now(), name: productName, price, imageUrl };
  products.push(product);
  displayProducts();
  productForm.reset();
});

const productDashboard = document.getElementById("product-dashboard");

function displayProducts() {
  productDashboard.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <input type="checkbox" id="select-${product.id}" onchange="toggleSelection(${product.id})" ${selectedProducts.has(product.id) ? 'checked' : ''}>
    <img src="${product.imageUrl}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.price.toFixed(2)}</p>
`;
    productDashboard.appendChild(productDiv);
  });
}

let selectedProducts = new Set();
document.toggleSelection = function (productId) {
    const checkbox = document.getElementById(`select-${productId}`);
    if (checkbox.checked) {
        selectedProducts.add(productId);
    } else {
        selectedProducts.delete(productId);
    }
};

const addToCartButton = document.getElementById('add-to-cart');
const calculatePriceButton = document.getElementById('calculate-price');

addToCartButton.addEventListener('click', () => {
    const selectedProductArray = Array.from(selectedProducts).map(id => products.find(p => p.id === id));
    displayCart(selectedProductArray);

    if (selectedProductArray.length > 0) {
        calculatePriceButton.classList.remove('hidden');
    } else {
        calculatePriceButton.classList.add('hidden');
    }
});

const cart = document.getElementById('cart');

function displayCart(selectedProductArray) {
    cart.innerHTML = '';
    selectedProductArray.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cart.appendChild(cartItemDiv);
    });
}

document.removeFromCart = function (productId) {
    selectedProducts.delete(productId);
    const selectedProductArray = Array.from(selectedProducts).map(id => products.find(p => p.id === id));
    displayCart(selectedProductArray);
    document.getElementById(`select-${productId}`).checked = false;

    if (selectedProductArray.length > 0) {
        calculatePriceButton.classList.remove('hidden');
    } else {
        calculatePriceButton.classList.add('hidden');
        totalPriceElement.textContent = `You have to pay: $0`;
    }
};

    const totalPriceElement = document.getElementById('total-price');

calculatePriceButton.addEventListener('click', () => {
    const totalPrice = Array.from(selectedProducts).reduce((total, id) => {
        const product = products.find(p => p.id === id);
        return total + product.price;
    }, 0);
    totalPriceElement.textContent = `You have to pay: $${totalPrice.toFixed(2)}`;
    
});