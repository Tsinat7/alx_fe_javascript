// Initial array of quotes with text, author, and category
let quotes = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "Motivation"
  },
  {
    text: "Don't let yesterday take up too much of today.",
    author: "Will Rogers",
    category: "Inspiration"
  },
  {
    text: "It's not whether you get knocked down, it's whether you get up.",
    author: "Vince Lombardi",
    category: "Perseverance"
  }
];

// DOM Elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const addQuoteForm = document.getElementById('add-quote-form');
const quoteInput = document.getElementById('quote-input');
const authorInput = document.getElementById('author-input');
const categoryInput = document.getElementById('category-input');
const clearQuotesBtn = document.getElementById('clear-quotes-btn');
const messageBox = document.getElementById('message-box');

// Show a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteText.textContent = "No quotes available.";
    quoteAuthor.textContent = "";
    return;
  }

  const index = Math.floor(Math.random() * quotes.length);
  const quote = quotes[index];

  quoteText.textContent = "${quote.text}";
  quoteAuthor.textContent = — ${quote.author} (${quote.category});
}

// Add a new quote from form
function addQuote(event) {
  event.preventDefault();

  const newQuote = quoteInput.value.trim();
  const newAuthor = authorInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (!newQuote || !newAuthor || !newCategory) {
    showMessage("Please enter quote, author, and category.", "error");
    return;
  }

  quotes.push({
    text: newQuote,
    author: newAuthor,
    category: newCategory
  });

  // Clear inputs
  quoteInput.value = '';
  authorInput.value = '';
  categoryInput.value = '';

  showMessage("Quote added successfully!", "success");
  showRandomQuote();
}

// Clear all quotes
function clearQuotes() {
  quotes = [];
  showRandomQuote();
  showMessage("All quotes cleared.", "info");
}

// Show feedback message
function showMessage(msg, type) {
  messageBox.textContent = msg;
  messageBox.className = type;

  setTimeout(() => {
    messageBox.textContent = '';
    messageBox.className = '';
  }, 3000);
}

// Event Listeners
newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteForm.addEventListener('submit', addQuote);
clearQuotesBtn.addEventListener('click', clearQuotes);

// Show a quote when page loads
showRandomQuote();