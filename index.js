let content = document.getElementById("content");
let sortSelector = document.getElementById("sortSelector");
let cryptoContainer = document.getElementById("crypto-container");
let spinner = document.getElementById("spinner");
let isLoading = false;
let toggleMode = document.getElementById("toggleMode");

toggleMode.addEventListener("click", () => {
  if (toggleMode.innerHTML === "Light Mode") {
    toggleMode.innerHTML = "Dark Mode";
  } else {
    toggleMode.innerHTML = "Light Mode";
  }
  document.querySelectorAll("*").forEach((element) => {
    if (element.classList.contains("toggle")) {
      element.classList.remove("toggle");
    } else {
      element.classList.add("toggle");
    }
  });
});

let apiArray;
let sortArray = [];

let sortValue = "asc";
let updatedPhpCurrency = 0;
sortSelector.value = sortValue;

async function fetchCurrency() {
  try {
    let res = await fetch(
      `https://v6.exchangerate-api.com/v6/900611a1da1301c96e0fea1a/pair/USD/PHP`
    );
    if (!res.ok) throw new Error("Could not fetch currency exchange");
    let data = await res.json();
    updatedPhpCurrency = data.conversion_rate;
  } catch (err) {
    console.log(err.message + "ERRROROROROROROOR");
  }
}

async function fetchCrypto() {
  try {
    await fetchCurrency();
    isLoading = true;
    isLoading ? (spinner.style.display = "inline-block") : "none";
    let res = await fetch(`https://api.coincap.io/v2/assets`);
    if (!res.ok) throw new Error("Could not fetch data");
    let data = await res.json();
    console.log(data);
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
          <img src = https://assets.coincap.io/assets/icons/${items.symbol.toLowerCase()}@2x.png 
          alt = ${items.name.toString()} 
          style = "width: ${items.id === "bitcoin-sv" ? "5rem" : ""}"/>
          <br/>
            ${(name.innerHTML = items.name)}
            <br/>
            Rank: ${(rank.innerHTML = items.rank)}
            <br/>
            Market Price: ₱${(price.innerHTML =
              items.priceUsd * updatedPhpCurrency)}
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
          <img src = https://assets.coincap.io/assets/icons/${items.symbol.toLowerCase()}@2x.png 
          alt = ${items.name.toString()} 
          style = "width: ${items.id === "bitcoin-sv" ? "5rem" : ""}"/>
          <br/>
            ${(name.innerHTML = items.name)}
            <br/>
            Rank: ${(rank.innerHTML = items.rank)}
            <br/>
            Market Price: ₱${(price.innerHTML =
              items.priceUsd * updatedPhpCurrency)}
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
        let id = document.createElement("p");
        cryptoContainer.innerHTML += `
          <img src = https://assets.coincap.io/assets/icons/${items.symbol.toLowerCase()}@2x.png 
          alt = ${items.name.toString()} 
          style = "width: ${items.id === "bitcoin-sv" ? "5rem" : ""}"/>
          <br/>
            ${(name.innerHTML = items.name)}
            <br/>
            Rank: ${(rank.innerHTML = items.rank)}
            <br/>
            Market Price: ₱${(price.innerHTML =
              items.priceUsd * updatedPhpCurrency)}
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
          <img src = https://assets.coincap.io/assets/icons/${items.symbol.toLowerCase()}@2x.png 
          alt = ${items.name.toString()} 
          style = "width: ${items.id === "bitcoin-sv" ? "5rem" : ""}"/>
          <br/>
            ${(name.innerHTML = items.name)}
            <br/>
            Rank: ${(rank.innerHTML = items.rank)}
            <br/>
            Market Price: ₱${(price.innerHTML =
              items.priceUsd * updatedPhpCurrency)}
            <hr/>
          `;
      });
      break;
  }
}
