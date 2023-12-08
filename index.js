let content = document.getElementById("content");
let sortSelector = document.getElementById("sortSelector");
let cryptoContainer = document.getElementById("crypto-container");
let spinner = document.getElementById("spinner");
let isLoading = false;

let apiArray;
let sortArray = [];

let sortValue = "asc";
sortSelector.value = sortValue;

async function fetchCrypto() {
  try {
    isLoading = true;
    isLoading ? (spinner.style.display = "inline-block") : "none";
    let res = await fetch(`https://api.coincap.io/v2/assets`);
    if (!res.ok) throw new Error("Could not fetch data");
    let data = await res.json();
    apiArray = data;

    sortFilter();
    sortSelector.addEventListener("change", sortFilter);
    isLoading = false;
    isLoading === false ? (spinner.style.display = "none") : "inline-block";
  } catch (err) {
    console.log(err.message + "ERRORRRRRR");
  }
}
fetchCrypto();

function sortFilter() {
  sortValue = sortSelector.value;
  cryptoContainer.innerHTML = "";
  switch (sortValue) {
    case "az":
      sortArray = apiArray.data.sort((a, b) => a.name.localeCompare(b.name));
      sortArray.forEach((items) => {
        let img = document.createElement("img");
        let name = document.createElement("h2");
        let rank = document.createElement("p");
        let price = document.createElement("p");
        cryptoContainer.innerHTML += `
        <img src = https://assets.coincap.io/assets/icons/${items.symbol.toLowerCase()}@2x.png />
          ${(name.innerHTML = items.name)}
          <br/>
          Rank: ${(rank.innerHTML = items.rank)}
          <br/>
          Market Price: $${(price.innerHTML = items.priceUsd)}
          <hr/>
        `;
      });
      break;
    case "za":
      sortArray = apiArray.data.sort((a, b) => b.name.localeCompare(a.name));
      sortArray.forEach((items) => {
        let img = document.createElement("img");
        let name = document.createElement("h2");
        let rank = document.createElement("p");
        let price = document.createElement("p");
        cryptoContainer.innerHTML += `
        <img src = https://assets.coincap.io/assets/icons/${items.symbol.toLowerCase()}@2x.png />
          ${(name.innerHTML = items.name)}
          <br/>
          Rank: ${(rank.innerHTML = items.rank)}
          <br/>
          Market Price: $${(price.innerHTML = items.priceUsd)}
          <hr/>
        `;
      });
      break;
    case "asc":
      sortArray = apiArray.data.sort((a, b) => a.rank - b.rank);
      sortArray.forEach((items) => {
        let img = document.createElement("img");
        let name = document.createElement("h2");
        let rank = document.createElement("p");
        let price = document.createElement("p");
        cryptoContainer.innerHTML += `
          <img src = https://assets.coincap.io/assets/icons/${items.symbol.toLowerCase()}@2x.png />
            ${(name.innerHTML = items.name)}
            <br/>
            Rank: ${(rank.innerHTML = items.rank)}
            <br/>
            Market Price: $${(price.innerHTML = items.priceUsd)}
            <hr/>
          `;
      });
      break;
    case "desc":
      sortArray = apiArray.data.sort((a, b) => b.rank - a.rank);
      sortArray.forEach((items) => {
        let img = document.createElement("img");
        let name = document.createElement("h2");
        let rank = document.createElement("p");
        let price = document.createElement("p");
        cryptoContainer.innerHTML += `
            <img src = https://assets.coincap.io/assets/icons/${items.symbol.toLowerCase()}@2x.png />
              ${(name.innerHTML = items.name)}
              <br/>
              Rank: ${(rank.innerHTML = items.rank)}
              <br/>
              Market Price: $${(price.innerHTML = items.priceUsd)}
              <hr/>
            `;
      });
      break;
  }
}
