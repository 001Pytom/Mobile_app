// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// import {
//   getDatabase,
//   ref,
//   push,
// } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// const appSettings = {
//   databaseURL: "https://playground-21d3d-default-rtdb.firebaseio.com/",
// };

// // call the function
// const app = initializeApp(appSettings);
// const database = getDatabase(app);
// const moviesInDB = ref(database, "movies");
// // console.log(app);

//

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://realtime-database-a289a-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(shoppingListInDB, inputValue);
  console.log(inputValue);
  clearInputFieldEl();
  // appendItemToShoppingListEl(inputValue);
});

onValue(shoppingListInDB, function (snapshot) {
  // to get values in the database
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    clearShopingListEl();
    itemsArray.forEach(function (itemArray) {
      appendItemToShoppingListEl(itemArray);
    });
  } else {
    shoppingListEl.innerHTML = "No items here ...";
  }
});

const clearInputFieldEl = () => {
  inputFieldEl.value = "";
};

function appendItemToShoppingListEl(item) {
  // shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  shoppingListEl.append(newEl);

  newEl.addEventListener("dblclick", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfItemInDB);
  });
}

const clearShopingListEl = () => {
  shoppingListEl.innerHTML = "";
};
