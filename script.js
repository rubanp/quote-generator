import { localQuotes } from "./quotes.js";

// Helper Functions
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function element(id) {
  return document.querySelectorAll(id)[0];
}

// Get Quotes From API
async function getQuotes() {
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    const quotes = await response.json();
    return quotes;
  } catch (error) {
    console.log(error);
  }
}

// Update Page With New Quote From API
function newQuoteAPI() {
  getQuotes().then((quotes) => {
    let randomQuote = quotes[getRandomInt(0, quotes.length - 1)];
    element("#quote-text").innerText = randomQuote["text"];
    if (randomQuote["author"] === null) {
      element("#author-text").innerText = "Anon";
    } else {
      element("#author-text").innerText = randomQuote["author"];
    }
  });
}

function newQuoteLocal() {
  let randomQuote = localQuotes[getRandomInt(0, localQuotes.length - 1)];
  element("#quote-text").innerText = randomQuote["text"];
  if (randomQuote["author"] === null) {
    element("#author-text").innerText = "Anon";
  } else {
    element("#author-text").innerText = randomQuote["author"];
  }
}

// Generate New Quote on Clicking 'New Quote' Button || Pressing Space Bar
document
  .querySelectorAll("#newquote-button")[0]
  .addEventListener("click", newQuoteAPI);

document.addEventListener("keyup", (event) => {
  if (event.which === 32) {
    setTimeout(() => {
      newQuoteAPI();
    }, 1);
  }
});
