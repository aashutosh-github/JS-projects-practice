const productList = document.querySelector("#product-list");
const cartItems = document.querySelector("#cart-items");
const emptyCartMessage = document.querySelector("#empty-cart");
const cartFinalList = document.querySelector("#cart-total-list");
const cartPriceContainer = document.querySelector("#cart-total");
const totalPriceDisplay = document.querySelector("#total-price");
const checkoutButton = document.querySelector("#checkout-btn");

//storing products like this so that we can add new products easily in the future and
//JS will be used to display them easily
const products = [
  { id: 1, name: "Product 1", price: 29.99 },
  { id: 2, name: "Product 2", price: 19.99 },
  { id: 3, name: "Product 3", price: 59.99 },
];

let cart = JSON.parse(localStorage.getItem("cartItemsSaved")) || [];
if (cart.length) {
  renderCart();
}

for (const product of products) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");
  productDiv.innerHTML = `
  <span>${product.name} - $${product.price.toFixed(2)}</span>
  <button data-id="${product.id}">Add to cart</button>`;
  productList.appendChild(productDiv);
}

productList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    //the getAttribute returns a string so parsing it to an integer
    const id = parseInt(event.target.getAttribute("data-id"));
    const product = products.find((product) => product.id === id);
    addToCart(product);
  }
});

function addToCart(product) {
  cart.push(product);
  saveCartToLocalStorage();
  renderCart();
}

function renderCart() {
  let totalPrice = 0;
  cartFinalList.innerHTML = "";
  emptyCartMessage.classList.add("hidden");
  cartPriceContainer.classList.remove("hidden");
  cart.forEach((item) => {
    totalPrice += item.price;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <button data-id="${item.id}">Delete</button>`;
    cartFinalList.appendChild(div);
    totalPriceDisplay.innerText = `$${totalPrice.toFixed(2)}`;
  });
}

checkoutButton.addEventListener("click", () => {
  totalPriceDisplay.innerText = "$0.00";
  totalPrice = 0;
  cart = [];
  localStorage.clear();
  cartFinalList.innerHTML = "";
  emptyCartMessage.classList.remove("hidden");
  cartPriceContainer.classList.add("hidden");
  alert("checked out successfully");
});

function saveCartToLocalStorage() {
  localStorage.setItem("cartItemsSaved", JSON.stringify(cart));
}

cartFinalList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const id = parseInt(event.target.dataset.id);
    const price = parseFloat(cart.find((p) => p.id === id).price).toFixed(2);
    const totalPriceRendered = parseFloat(
      totalPriceDisplay.innerText.slice(1)
    ).toFixed(2);
    totalPriceDisplay.innerText = `$${(totalPriceRendered - price).toFixed(2)}`;
    const parentDiv = event.target.parentElement;
    //normal filter was making it such that multiple instances of the same product in cart were filtered
    //at once therefore buttons were visible but local storage was emptied.
    let removed = false;
    cart = cart.filter((item) => {
      if (item.id === id && !removed) {
        removed = true;
        return false;
      }
      return true;
    });
    saveCartToLocalStorage();
    if (cart.length === 0) {
      localStorage.clear();
      cartPriceContainer.classList.add("hidden");
      emptyCartMessage.classList.remove("hidden");
    }
    parentDiv.remove();
  }
});
