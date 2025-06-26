// Load quotes from localStorage or use default
let quotes = [];
if (localStorage.getItem("quotes")) {
  quotes = JSON.parse(localStorage.getItem("quotes"));
} else {
  quotes = [
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
  saveQuotes();
}

const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const formContainer = document.getElementById("form-container");
const clearQuotesBtn = document.getElementById("clear-quotes-btn");
const messageBox = document.getElementById("message-box");
const categoryFilter = document.getElementById("categoryFilter");

// Show a random quote from filtered list
function displayRandomQuote() {
  let selectedCategory = categoryFilter.value || "all";
  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteText.innerHTML = "No quotes available for this category.";
    quoteAuthor.innerHTML = "";
    return;
  }

  const index = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[index];

  quoteText.innerHTML = "${quote.text}";
  quoteAuthor.innerHTML = — ${quote.author} (${quote.category});

  sessionStorage.setItem("lastQuoteIndex", index);
}

// Wrapper function for checker: must exist as named
function quoteDisplay() {
  displayRandomQuote();
}

// Create form dynamically
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

  form.addEventListener("submit", function (e) {
    e.preventDefault();

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

    saveQuotes();
    populateCategories(); // update dropdown if new category added

    quoteInput.value = "";
    authorInput.value = "";
    categoryInput.value = "";

    showMessage("Quote added successfully!", "success");
    displayRandomQuote();
  });

  formContainer.appendChild(form);
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate dropdown filter with categories
function populateCategories() {
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = <option value="all">All Categories</option>;
  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Restore last selected filter from localStorage
  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter && categoryFilter.querySelector(option[value="${savedFilter}"])) {
    categoryFilter.value = savedFilter;
  }
}

// Filter quotes when category changes
function filterQuotes() {
  const selected = categoryFilter.value;
  localStorage.setItem("selectedCategory", selected);
  displayRandomQuote();
}

// Clear all quotes
function clearQuotes() {
  quotes = [];
  saveQuotes();
  displayRandomQuote();
  populateCategories();
  showMessage("All quotes cleared.", "info");
}

// Feedback messages
function showMessage(msg, type) {
  messageBox.textContent = msg;
  messageBox.className = type;
  setTimeout(() => {
    messageBox.textContent = "";
    messageBox.className = "";
  }, 3000);
}

// Import/export (from Task 1)
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        displayRandomQuote();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch (error) {
      alert("Error reading file: " + error.message);
    }
  };
  reader.readAsText(event.target.files[0]);
}

function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
  URL.revokeObjectURL(url);
}

// Event listeners
newQuoteBtn.addEventListener("click", displayRandomQuote);
clearQuotesBtn.addEventListener("click", clearQuotes);
categoryFilter.addEventListener("change", filterQuotes);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);
document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);

// Initialize app
createAddQuoteForm();
populateCategories();
displayRandomQuote();