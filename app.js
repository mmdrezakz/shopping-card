const $ = document;
const openShopping = $.querySelector(".icon-shop");
const closeShopping = $.querySelector(".closes");
const list = $.querySelector(".list");
const listCard = $.querySelector(".list-card");
const shoppingElem = $.querySelector(".open");
const total = $.querySelector(".total");
const body = $.querySelector("body");
const quantity = $.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  {
    id: 1,
    name: "کفش اسپرت مردانه",
    img: "1.jpg",
    price: 2_000_000,
  },
  {
    id: 2,
    name: "کفش مجلسی مردانه",
    img: "2.jpg",
    price: 1_000_000,
  },
  {
    id: 3,
    name: "کفش مجلسی زنانه",
    img: "3.jpg",
    price: 800_000,
  },
  {
    id: 4,
    name: "کفش اسپرت زنانه",
    img: "4.jpg",
    price: 3_400_000,
  },
  {
    id: 5,
    name: "کفش اسپرت مردانه",
    img: "5.jpg",
    price: 1_600_000,
  },
  {
    id: 6,
    name: "کفش مجلسی چرم مردانه",
    img: "6.jpg",
    price: 4_100_000,
  },
];

let listCards = [];
const init = () => {
  products.forEach((value, key) => {
    const newItem = $.createElement("div");
    newItem.classList.add(".item");
    newItem.style.backgroundColor = "white";
    newItem.style.border = "1px solid white";
    newItem.style.borderRadius = "10px";

    newItem.innerHTML = `
        <img class="img-1" src="./img/${value.img}" >
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}<span style="margin-right: 10px">تومان</span></div>
        <button onclick="addToCard(${key})">اضافه کردن به سبد خرید</button>
        
        `;
    list.appendChild(newItem);
  });
};
init();

const addToCard = (key) => {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  reloadCard();
};

const reloadCard = () => {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;

  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    console.log("quantity" + value);
    console.log("count" + count);

    if (value != null) {
      let newDiv = document.createElement("div");
      newDiv.style.display = "flex";
      newDiv.style.flexDirection = "column";
      newDiv.style.alignItems = "center";

      newDiv.innerHTML = `
      <div class="boxes-card" style="width: 300px"><img style="border-border-radius:10px " src = "./img/${
        value.img
      }"></div>
      <div class="card-title>${value.name}</div>
      <div class = "card-price">${value.price.toLocaleString()}</div>
      <div>
      <button style="background-color:white"; 
      class="cardButton"  onclick=" changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>

        <div class="count">${value.quantity}</div>
      <button style="background-color:white"; 
      class="cardButton" onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
      </div>
      `;

      listCard.appendChild(newDiv);
    }
    total.innerHTML = totalPrice.toLocaleString();
    quantity.innerText = count;
  });
};

const changeQuantity = (key, quantity) => {
  if (quantity == 0) {
    delete listCards[key];
    total.innerHTML = 0;
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  if (total.innerHTML == 0) {
    document.querySelector(".quantity").innerHTML = 0;
  }
  reloadCard();
};
