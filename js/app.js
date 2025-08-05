"use strict";

const CardContainer = document.getElementById("CardContainer");
const searchInput = document.getElementById("searchInput");
const houseFilter = document.getElementById("houseFilter");
const filterButton = document.getElementById("filterButton");
const resetButton = document.getElementById("resetButton");
const loaderButton = document.getElementById("loader-button");
let currentCharacters = 16;


function morecharacters() {
    currentCharacters = 10000;
    fetchData();
}

function fetchData() {
    fetch("https://hp-api.onrender.com/api/characters")
        .then(res => {
            if (!res.ok) {
                throw new Error("The response status is not Ok");
            }
            return res.json();
        })
        .then(characters => {
            renderProducts(characters.slice(0, currentCharacters));
        });
}

function renderProducts(charactersData) {
    CardContainer.innerHTML = "";
    charactersData.forEach((element) => {
        const card = document.createElement("div");
        card.className = "card";
        let imageHtml;
        if (element.image) {
            imageHtml = `<img src="${element.image}" alt="Character image"/>`;
        } else {
            imageHtml = `<img src="./images/not-found.png" alt="Placeholder image"/>`;
        }
        card.innerHTML = `
        <h3 class="title">${element.name}</h3>
        <div class="bar">
          <div class="emptybar"></div>
          <div class="filledbar" style="width: 60%"></div>
        </div>
        <h3 class="name">${element.name}</h3>
        <h3 class="yearOfBirth">${element.yearOfBirth}</h3>
        <h3 class="house">${element.house}</h3>
        <div class="circle">
          ${imageHtml}
        </div>
        `;
        CardContainer.appendChild(card);
    });
}



function searchCards() {
  let search = searchInput.value.toLowerCase();
  let cards = CardContainer.querySelectorAll(".card");

  cards.forEach(card => {
    let name = card.querySelector(".title").textContent.toLowerCase();
    if (name.includes(search)) {
      card.style.display = "block";
    } 
    else {
      card.style.display = "none";
    }
  });
}

function filterByHouse() {
  let house = houseFilter.value;
  let cards = CardContainer.querySelectorAll(".card");

  cards.forEach(card => {
    let cardHouse = card.querySelector(".house").textContent;
    if (house === "" || cardHouse === house) {
      card.style.display = "block";
    } 
    else {
      card.style.display = "none";
    }
  });
}

function resetFilters() {
  searchInput.value = "";
  houseFilter.value = "";

  let cards = CardContainer.querySelectorAll(".card");
  cards.forEach(card => {
    card.style.display = "block".slice(0,16);
  });
}



loaderButton.addEventListener('click', morecharacters);
searchInput.addEventListener("input", searchCards);
filterButton.addEventListener("click", filterByHouse);
resetButton.addEventListener("click", resetFilters);


fetchData();
