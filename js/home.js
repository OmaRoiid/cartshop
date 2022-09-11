let products = [];
let selectedProductToCart = [];

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
        <img class="card__image-container" src="${products[i].image}" alt="Card image cap" ;
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
})();

function onAddToCart(selectedProduct) {
  // debugger;
  // let selected = products.find((product) => {
  //   return product.id === selectedProduct;
  // });
  // let index = products.indexOf((product) => {
  //   return product.id === selectedProduct;
  // });

  let selected = products.find((item, index) => {
    if (item.id === selectedProduct) {
      return {
        ...item,
        count: selectedProductToCart[index].count
          ? selectedProductToCart[index].count
          : 1,
      };
    }
  });

  console.log(newoooo);
  // selected = {
  //   ...selected,
  //   count: selectedProductToCart[index].count
  //     ? selectedProductToCart[index].count
  //     : 1,
  // };
  let found = false;
  selectedProductToCart = selectedProductToCart.map((item) => {
    if (item.id === selected.id) {
      found = true;
      console.log({ ...item, count: ++selected.count });
      return { ...item, count: ++selected.count };
    }
  });
  if (!found) {
    selectedProductToCart.push(selected);
  }
  console.log(selectedProductToCart);
}
