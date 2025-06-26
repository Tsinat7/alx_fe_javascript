// Array to hold quotes
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
  { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" }
];

// DOM elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const addQuoteForm = document.getElementById('add-quote-form');
const quoteInput = document.getElementById('quote-input');
const authorInput = document.getElementById('author-input');
const messageBox = document.getElementById('message-box');
const clearQuotesBtn = document.getElementById('clear-quotes-btn');

// Function to show a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteText.textContent = "No quotes available.";
    quoteAuthor.textContent = "";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteText.textContent = "${quote.text}";
  quoteAuthor.textContent = — ${quote.author};
}

// Function to add a new quote
function addQuote(event) {
  event.preventDefault();

  const newQuote = quoteInput.value.trim();
  const newAuthor = authorInput.value.trim();

  if (newQuote === '' || newAuthor === '') {
    showMessage('Please enter both quote and author.');
    return;
  }

  quotes.push({ text: newQuote, author: newAuthor });

  quoteInput.value = '';
  authorInput.value = '';
  showMessage('Quote added successfully!', 'success');
  showRandomQuote();
}

// Function to clear all quotes
function clearQuotes() {
  quotes = [];
  showRandomQuote();
  showMessage('All quotes cleared.', 'info');
}

// Function to show messages to user
function showMessage(msg, type = 'error') {
  messageBox.textContent = msg;
  messageBox.className = type; // you can style different classes (error, success, info)
  setTimeout(() => {
    messageBox.textContent = '';
    messageBox.className = '';
  }, 3000);
}

// Event Listeners
newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteForm.addEventListener('submit', addQuote);
clearQuotesBtn.addEventListener('click', clearQuotes);

// Initialize first quote on page load
showRandomQuote();