let products = [];
let selectedProductToCart = [];
let cartCounter = 0;
let isCartDisplay = false;
let productFrequency = {};
let finalPrice = 0;
const cartList = document.getElementById("cart__list");
const divLoaderElement = document.createElement("div");

//IIFE function to run at the beginning to get the data from api  and start render of products list
(async function getProducts() {
  const itemCardsWrapper = document.getElementById("item_cards");
  const response = await fetch("https://fakestoreapi.com/products", {
    method: "GET",
  });

  products = await response.json();
  let content = "";
  for (let i = 0; i < products.length; i++) {
    content += `
        <div  class="card" >
        <div class="card__price"><span> ${products[i].price}EGP</span></div>
        <img class="card__image-container" src="${products[i].image}" alt="product image"
" >
        <hr>
        <div class="card__content">
            <p class="card__title">
              ${products[i].title}
            </p>
            <div class="card__action">
              <button id="more" type="submit" onclick="onAddToCart(${products[i].id})">
              ADD+
              </button>
            </div>
          </div>
      </div>
          `;
  }

  itemCardsWrapper.innerHTML = content;
  document.getElementById("cart_counter").innerHTML = cartCounter;
})();

//Add the selected products from the user selection
function onAddToCart(selectedProduct) {
  let selected = products.find((item) => item.id === selectedProduct);
  selectedProductToCart.push(selected);
  document.getElementById("cart_counter").innerHTML = ++cartCounter;
  renderCartList();
}

// render cartList inside cart view
function renderCartList() {
  let cartListContent = "";
  selectedProductToCart.forEach((item) => {
    finalPrice = finalPrice + item.price;
  });
  for (let i = 0; i < selectedProductToCart.length; i++) {
    productFrequency[selectedProductToCart[i].id] = 1;
    cartListContent += `
      <div class="cart__items">
    <div class="cart__items--img">
      <img src="${selectedProductToCart[i].image}" alt="product image" />
    </div>
 
    <div class="description">
      <p>${selectedProductToCart[i].title}</p>
      <p>${selectedProductToCart[i].price}</p>
    </div>
 
    <div class="cart__quantity">
      <button onclick="incrementQuantity(${selectedProductToCart[i].id},${i})">
        +
      </button>
      <p class="value">${productFrequency[selectedProductToCart[i].id]}</p>
      <button onclick="decrementQuantity(${selectedProductToCart[i].id},${i})">
        -
      </button>
    </div>
   </div>
          `;
  }
  cartList.innerHTML =
    cartListContent +
    ` <div class="cart__pay">
  <button id="price">PAY ${finalPrice} EGP </button>
  </div>`;
}

// Display Cart view when click on the Cart icon
function onClickToCart() {
  if (selectedProductToCart.length) {
    isCartDisplay = true;
    document.getElementsByClassName("cart__wrapper")[0].style.display = "block";
  }
}

//increment and decrement methods
function incrementQuantity(id, index) {
  document.getElementById("cart_counter").innerHTML = ++cartCounter;
  productFrequency[id]++;
  let selectedItemToIncrement = getSelectedObject(id);
  finalPrice += selectedItemToIncrement.price;
  document.getElementsByClassName("value")[index].innerHTML = ` ${
    productFrequency[selectedProductToCart[index].id]
  } `;

  document.getElementById("price").innerHTML = `PAY ${finalPrice} EGP `;
}

function decrementQuantity(id, index) {
  productFrequency[id]--;
  let selectedItemToDecrement = getSelectedObject(id);
  if (finalPrice > 0) {
    document.getElementById("cart_counter").innerHTML = --cartCounter;
    finalPrice = finalPrice - selectedItemToDecrement.price;
    document.getElementsByClassName("value")[index].innerHTML = ` ${
      productFrequency[selectedProductToCart[index].id]
    } `;
    document.getElementById("price").innerHTML = `PAY ${finalPrice} EGP `;
  } else {
    selectedProductToCart = [];
    cartList.innerHTML = `<div></div> `;
    document.getElementsByClassName("cart__wrapper")[0].style.display = "none";
  }
}

function clearCart() {
  selectedProductToCart = [];
  cartList.innerHTML = `<div></div> `;
  document.getElementById("cart_counter").innerHTML = 0;
  document.getElementsByClassName("cart__wrapper")[0].style.display = "none";
}

//helper Methods
function getSelectedObject(id) {
  return selectedProductToCart.find((item) => item.id === id);
}
