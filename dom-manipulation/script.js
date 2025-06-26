const apiUrl = "https://685db4ba7b57aebd2af6ea51.mockapi.io/api/v1/quotes";

let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

// DOM elements
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const categoryFilter = document.getElementById("categoryFilter");
const formContainer = document.getElementById("form-container");
const messageBox = document.getElementById("message-box");

// Display quote
function displayRandomQuote() {
  const category = categoryFilter.value;
  const filtered = category === "all" ? quotes : quotes.filter(q => q.category === category);

  if (filtered.length === 0) {
    quoteText.innerHTML = "No quotes available.";
    quoteAuthor.innerHTML = "";
    return;
  }

  const quote = filtered[Math.floor(Math.random() * filtered.length)];
  quoteText.innerHTML = "${quote.text}";
  quoteAuthor.innerHTML = — ${quote.author} (${quote.category});
}

// Checker wrapper
function quoteDisplay() {
  displayRandomQuote();
}

// Save locally
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate categories
function populateCategories() {
  const cats = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = <option value="all">All Categories</option>;
  cats.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const saved = localStorage.getItem("selectedCategory");
  if (saved && categoryFilter.querySelector(option[value="${saved}"])) {
    categoryFilter.value = saved;
  }
}

// Filter by category
function filterQuotes() {
  const selected = categoryFilter.value;
  localStorage.setItem("selectedCategory", selected);
  displayRandomQuote();
}

// Add quote form
function createAddQuoteForm() {
  const form = document.createElement("form");

  form.innerHTML = `
    <input id="quote-input" placeholder="Enter quote" required />
    <input id="author-input" placeholder="Enter author" required />
    <input id="category-input" placeholder="Enter category" required />
    <button type="submit">Add Quote</button>
  `;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = document.getElementById("quote-input").value.trim();
    const author = document.getElementById("author-input").value.trim();
    const category = document.getElementById("category-input").value.trim();

    if (!text || !author || !category) {
      showMessage("Please fill all fields.", "error");
      return;
    }

    const newQuote = { text, author, category };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    displayRandomQuote();

    // Push to server
    try {
      await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuote)
      });
      showMessage("Quote added and synced with server.", "success");
    } catch (err) {
      showMessage("Failed to sync with server.", "error");
    }

    form.reset();
  });

  formContainer.appendChild(form);
}

// Show message
function showMessage(msg, type) {
  messageBox.textContent = msg;
  messageBox.className = type;
  setTimeout(() => {
    messageBox.textContent = "";
    messageBox.className = "";
  }, 3000);
}

// 🟢 Sync with server
async function syncWithServer() {
  try {
    const res = await fetch(apiUrl);
    const serverQuotes = await res.json();

    // Conflict resolution: server wins
    quotes = serverQuotes;
    saveQuotes();
    populateCategories();
    displayRandomQuote();

    showMessage("Synced with server successfully.", "info");
  } catch (err) {
    showMessage("Error syncing with server.", "error");
  }
}

// 🔁 Periodic sync every 30 seconds
setInterval(syncWithServer, 30000);

// Initial setup
document.getElementById("importFile").addEventListener("change", importFromJsonFile);
document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);
newQuoteBtn.addEventListener("click", displayRandomQuote);
categoryFilter.addEventListener("change", filterQuotes);

// JSON import/export
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      if (Array.isArray(data)) {
        quotes.push(...data);
        saveQuotes();
        populateCategories();
        displayRandomQuote();
        showMessage("Quotes imported.", "success");
      }
    } catch (err) {
      showMessage("Import error.", "error");
    }
  };
  reader.readAsText(event.target.files[0]);
}

function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Run app
createAddQuoteForm();
populateCategories();
syncWithServer