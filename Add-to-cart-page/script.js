const productList = document.querySelector("#product-list");
const cartItems = document.querySelector("#cart-items");
const emptyCartMessage = document.querySelector("#empty-cart");
const cartTotalMessage = document.querySelector("#cart-total");
const totalPriceDisplay = document.querySelector("#total-price");
const checkoutButton = document.querySelector("#checkout-btn");

//storing products like this so that we can add new products easily in the future and
//JS will be used to display them easily
const products = [
  { id: 1, name: "Product 1", price: 29.99 },
  { id: 2, name: "Product 2", price: 19.99 },
  { id: 3, name: "Product 3", price: 59.99 },
];

const cart = [];

for (const product of products) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");
  productDiv.innerHTML = `
  <span>${product.name} - $${product.price.toFixed(2)}</span>
  <button data-id="${product.id}">Add to cart</button>`;
  productList.appendChild(productDiv);
}
