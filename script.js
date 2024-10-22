const productForm = document.getElementById("product-form");
let products = [];

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const productName = document.getElementById('product-name').value;
  const price = parseFloat(document.getElementById('price').value);
  const imageUrl = document.getElementById('image').value;
  
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

function displayProducts() {}
