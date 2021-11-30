const quote = document.getElementById("quote-text");
const author = document.getElementById("author-text");
const loader = document.getElementById("loader");
const container = document.getElementById("container");
let quotes = [];

// Helper Functions
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Loader
function loading() {
  loader.style.display = "block";
  container.style.display = "none";
}

function completed() {
  loader.style.display = "none";
  container.style.display = "block";
}

// Get Quotes From API
async function getQuotes() {
  loading();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    quotes = await response.json();
    return quotes;
  } catch (error) {
    console.log(error);
  }
}

// Update Page With New Quote From API
function newQuote() {
  loading();
  getQuotes().then((quotes) => {
    let randomQuote = quotes[getRandomInt(0, quotes.length - 1)];
    quote.innerText = randomQuote["text"];
    if (randomQuote["author"] === null) {
      author.innerText = "Unknown";
    } else {
      author.innerText = randomQuote["author"];
    }
    completed();
  });
}

// Generate New Quote on Clicking 'New Quote' Button
document
  .querySelectorAll("#newquote-button")[0]
  .addEventListener("click", newQuote);

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
