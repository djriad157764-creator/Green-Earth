// empty array >
let buy = [];

// Get 🌴 All Categories
const allCategories = async () => {
  // show loading spinner
  document.getElementById("categories-container").innerHTML =
    `<span class="loading loading-infinity loading-xl flex justify-center mt-20 mx-auto"></span>`;
  const url = "https://openapi.programming-hero.com/api/categories";
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.categories);
  } catch (error) {
    console.error(error);
  }
};

// 🌴 All Plants
const allPlants = async () => {
  // show loading spinner
  const plantsContainer = document.getElementById("plant-container");
  plantsContainer.innerHTML = `<div class="flex justify-center items-center col-span-full">
  <span class="loading loading-infinity"></span>
  </div>`;
  const url = "https://openapi.programming-hero.com/api/plants";

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayPlants(data.plants);
  } catch (error) {
    console.error(error);
  }
};

allPlants();

// Plants Display
const displayPlants = (plants) => {
  const plantsContainer = document.getElementById("plant-container");
  plantsContainer.innerHTML = "";
  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.innerHTML = `
     <div class="card p-4 h-fit rounded-xl bg-white shadow-sm">
                <div class="mb-3 rounded-sm">
                  <img src="${plant.image}" alt="" class="w-full object-cover h-30 rounded-md">

                </div>
                <h1 class="font-semibold text-[#1F2937] mb-2">${plant.name}</h1>
                <p class="line-clamp-2 mb-2">
                  ${plant.description}
                </p>
                <div class="flex justify-between mb-3">
                  <button class="text-[#15803D] font-semibold px-3 p-1 bg-[#DCFCE7] rounded-full">${plant.category}</button>
                  <p>$${plant.price}</p>
                </div>
                <div class="">
                  <button 
                    class="add-to-card btn bg-[#15803D] rounded-full text-white text-white w-full"
                  >
                   Add to Card
                  </button>
                </div>
              </div>
    `;

    const addCard = card.querySelector(".add-to-card");
    addCard.addEventListener("click", () => {
      addCardFunction(plant.price, plant.name);
    });

    plantsContainer.appendChild(card);
  });
};

const addCardFunction = (price, name) => {
  const cardAdd = {
    price,
    name,
    quantity: 1,
  };

  const existingItem = buy.find((item) => item.name === name);
  if (existingItem) {
    ((existingItem.quantity += 1), existingItem.price * existingItem.quantity);
  } else {
    buy.push({ price, name, quantity: 1 });
  }
  updateDisplay();
};

const updateDisplay = () => {
  const cardContainer = document.getElementById("add-card-container");
  cardContainer.innerHTML = "";
  buy.forEach((item) => {
    const card = document.createElement("div");
    card.className = "flex justify-between items-center px-6 py-2";
    card.innerHTML = `
                <div class="text-[#1F2937]">
                  <h1 class="font-semibold mb-1">${item.name}</h1>
                  <p class="font-bold">$${item.price} X ${item.quantity}</p>
                </div>
                <div class="">
                  <button>X</button>
                </div>`;
    cardContainer.appendChild(card);
  });
};

// display Categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories-container");
  categoryContainer.innerHTML = "";

  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.className =
      "btn btn-outline btn-primary rounded-full min-w-full mb-2  categoryBtn";
    btn.innerHTML = `
     ${category.category_name}`;
    btn.onclick = () => loadCard(category.id, btn);
    categoryContainer.appendChild(btn);
  });
};

const removeBtnStyle = () => {
  const allBtn = document.querySelectorAll(".categoryBtn");
  document.getElementById("all-categories").classList.remove("bg-[#15803D]");

  allBtn.forEach((btn) => btn.classList.remove("active"));
  document.getElementById("all-categories").classList.add("inactive");
};

// Remove all btn style
const loadCard = async (id, clickedBtn) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  removeBtnStyle();
  clickedBtn.classList.add("active");
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayPlants(data.plants);
  } catch (error) {
    console.error(error);
  }
};

document.getElementById("all-categories").addEventListener("click", () => {
  removeBtnStyle();
  allPlants();
  document.getElementById("all-categories").classList.remove("inactive");
  document.getElementById("all-categories").classList.add("bg-[#15803D]");
});

allCategories();
