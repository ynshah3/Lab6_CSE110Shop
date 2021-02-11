// Script.js

window.addEventListener('DOMContentLoaded', () => {

  if (localStorage.getItem("data") == null) {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => localStorage.setItem("data", JSON.stringify(data)));
  }

  let count = localStorage.getItem("count");
  let cartList = localStorage.getItem("cart").split(" ");

  document.getElementById("cart-count").innerHTML = count;

  let arr = JSON.parse(localStorage.getItem("data"));
  for (let i=0; i < arr.length; i++) {
    entry = arr[i];
    arr[i].added = "0";
    let id = entry.id
    let image = entry.image;
    let price = entry.price;
    let title = entry.title;
    document.getElementById("product-list").innerHTML += 
    "<product-item id=" + id + " image=" + image + " price=" + price + " title='" + title + "' added=0></product-item>";
  }

  let productObj = document.querySelectorAll('product-item');
  for (let i = 0; i < productObj.length; i++) {
    let shadowObj = productObj[i].shadowRoot;
    let liObj = shadowObj.querySelector('li');
    let buttonObj = liObj.querySelector('button');
    buttonObj.removeAttribute("onclick");
    if (cartList.includes(productObj[i].id)) {
      buttonObj.innerHTML = "Remove from Cart";
    }

    buttonObj.addEventListener("click", () => {
      if (buttonObj.innerHTML == "Add to Cart") {
        buttonObj.innerHTML = "Remove from Cart";
        count = document.getElementById("cart-count");
        count.innerHTML = parseInt(count.innerHTML) + 1;
        localStorage.setItem("count", count.innerHTML);
        cartList.push(productObj[i].id);
        localStorage.setItem("cart", cartList.join(" "));
        alert("Added to Cart!")
      }
      else {
        buttonObj.innerHTML = "Add to Cart";
        let count = document.getElementById("cart-count");
        count.innerHTML = parseInt(count.innerHTML) - 1;
        localStorage.setItem("count", count.innerHTML);
        let index = cartList.findIndex((item) => {
          return item == productObj[i].id;
        });
        cartList.splice(index, 1);
        localStorage.setItem("cart", cartList.join(" "));
        alert("Removed from Cart!")
      }
    })
  }
});