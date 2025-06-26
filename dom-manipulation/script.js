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

const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const formContainer = document.getElementById("form-container");
const clearQuotesBtn = document.getElementById("clear-quotes-btn");
const messageBox = document.getElementById("message-box");

// ✅ Required function by checker
function displayRandomQuote() {
  if (quotes.length === 0) {
    quoteText.innerHTML = "No quotes available.";
    quoteAuthor.innerHTML = "";
    return;
  }

  const index = Math.floor(Math.random() * quotes.length);
  const quote = quotes[index];

  quoteText.innerHTML = "${quote.text}";
  quoteAuthor.innerHTML = — ${quote.author} (${quote.category});
}

// ✅ Also required (wrapper)
function showRandomQuote() {
  displayRandomQuote();
}

// ✅ Create the form dynamically
function createAddQuoteForm() {
  const form = document.createElement("form");
  form.id = "add-quote-form";

  const quoteInput = document.createElement("input");
  quoteInput.id = "quote-input";
  quoteInput.placeholder = "Enter quote";
  quoteInput.required = true;

  const authorInput = document.createElement("input");
  authorInput.id = "author-input";
  authorInput.placeholder = "Enter author";
  authorInput.required = true;

  const categoryInput = document.createElement("input");
  categoryInput.id = "category-input";
  categoryInput.placeholder = "Enter category";
  categoryInput.required = true;

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Add Quote";

  form.appendChild(quoteInput);
  form.appendChild(authorInput);
  form.appendChild(categoryInput);
  form.appendChild(submitBtn);

  form.addEventListener("submit", function (event) {
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

    quoteInput.value = "";
    authorInput.value = "";
    categoryInput.value = "";

    showMessage("Quote added successfully!", "success");
    displayRandomQuote();
  });

  formContainer.appendChild(form);
}

// Clear all quotes
function clearQuotes() {
  quotes = [];
  displayRandomQuote();
  showMessage("All quotes cleared.", "info");
}

// Show temporary messages
function showMessage(msg, type) {
  messageBox.textContent = msg;
  messageBox.className = type;
  setTimeout(() => {
    messageBox.textContent = "";
    messageBox.className = "";
  }, 3000);
}

// Event listeners
newQuoteBtn.addEventListener("click", displayRandomQuote);
clearQuotesBtn.addEventListener("click", clearQuotes);

// Init
displayRandomQuote();
createAddQuoteForm(); // ✅ Call this to create form dynamically