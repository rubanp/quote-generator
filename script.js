import { localQuotes } from "./quotes.js";

let quote = document.getElementById("quote-text");
let author = document.getElementById("author-text");

// Helper Functions
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
    quote.innerText = randomQuote["text"];
    if (randomQuote["author"] === null) {
      author.innerText = "Unknown";
    } else {
      author.innerText = randomQuote["author"];
    }
  });
}

function newQuoteLocal() {
  let randomQuote = localQuotes[getRandomInt(0, localQuotes.length - 1)];
  quote.innerText = randomQuote["text"];
  if (randomQuote["author"] === null) {
    author.innerText = "Unknown";
  } else {
    author.innerText = randomQuote["author"];
  }
}

// Generate New Quote on Clicking 'New Quote' Button
document
  .querySelectorAll("#newquote-button")[0]
  .addEventListener("click", newQuoteAPI);

// Share Quote To Twitter
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quote.innerText} - ${author.innerText}`;
  window.open(twitterURL, "_blank");
}

function searchWikipedia() {
  const wikipediaURL = `https://en.wikipedia.org/wiki/${author.innerText}`;
  window.open(wikipediaURL, "_blank");
}

document.getElementById("twitter-button").addEventListener("click", tweetQuote);

document
  .getElementById("wiki-search-button")
  .addEventListener("click", searchWikipedia);
