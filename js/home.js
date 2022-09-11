let products = [];
let selectedProductToCart = [];
let cartCounter = 0;

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

function onAddToCart(selectedProduct) {
  let selected = products.find((item) => item.id === selectedProduct);
  selectedProductToCart.push(selected);
  document.getElementById("cart_counter").innerHTML = ++cartCounter;
  renderCartList();
}

function renderCartList() {
  const cartList = document.getElementById("cart__list");
  let cartListContent = "";
  for (let i = 0; i < selectedProductToCart.length; i++) {
    cartListContent += `
      <div class="cart__items">
    <div class="cart__items--img">
      <img src="${selectedProductToCart[i].image}" alt="product image" />
    </div>
 
    <div class="description">
      <span>${selectedProductToCart[i].title}</span>
      <span>${selectedProductToCart[i].price}</span>
    </div>
 
    <div class="cart__quantity">
      <button class="plus-btn" type="button" name="button">
        +
      </button>
      <input type="text" name="name" value="1">
      <button class="minus-btn" type="button" name="button">
        -
      </button>
    </div>
   </div>
          `;
  }
  console.log(cartListContent);
  cartList.innerHTML = cartListContent;
  console.log(cartList);
}
