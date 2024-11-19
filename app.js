let isLoading = false;
let currentQuery = "";
const defaultQuery = "Technology"; // Default query if no search
const resultsContainer = document.getElementById("resultsContainer");
const loadingMessage = document.getElementById("loadingMessage");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// Fetching Wikipedia results
async function fetchSearchResults(query) {
  const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch=${encodeURIComponent(query)}&utf8=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.query.search;
  } catch (error) {
    console.error("Error fetching Wikipedia data:", error);
    return [];
  }
}

// Render results dynamically
function renderResults(query, results) {
  const fragment = document.createDocumentFragment();
  const section = document.createElement("div");
  section.classList.add("result-section");
  section.innerHTML = `<h2>Search Results for "${query}":</h2>`;

  results.forEach((result) => {
    const resultCard = document.createElement("div");
    resultCard.classList.add("result-card");
    
    resultCard.innerHTML = `
      <h3>${result.title}</h3>
      <p>${result.snippet}</p>
      <a href="https://en.wikipedia.org/?curid=${result.pageId}" target="_blank">Read More</a>
    `;

    section.appendChild(resultCard);
  });

  fragment.appendChild(section);
  resultsContainer.appendChild(fragment); // Efficiently update DOM
}

// Load results (infinite scroll logic)
async function loadResults() {
  if (isLoading) return;
  isLoading = true;
  loadingMessage.style.display = "block";

  const queryToUse = currentQuery || defaultQuery;

  // Fetching results from Wikipedia
  const searchResults = await fetchSearchResults(queryToUse);
  
  if (searchResults.length > 0) {
    renderResults(queryToUse, searchResults);
  } else {
    resultsContainer.innerHTML = "<p>No results found. Try a different query.</p>";
  }

  loadingMessage.style.display = "none";
  isLoading = false;
}

// Infinite scrolling setup
function setupInfiniteScroll() {
  const sentinel = document.createElement("div");
  sentinel.id = "scrollSentinel";
  resultsContainer.appendChild(sentinel);
  observer.observe(sentinel);
}

// Setup search functionality with debounce
function setupSearch() {
  const performSearch = () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      currentQuery = searchTerm; // Set the current query
      resultsContainer.innerHTML = ""; // Clear previous results
      loadResults(); // Load new results
    }
  };

  searchButton.addEventListener("click", performSearch);
  searchInput.addEventListener("input", debounce(performSearch, 300)); // Debounced input
}

// Debounce function
function debounce(func, delay) {
  let debounceTimer;
  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Infinite Scroll Setup
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !isLoading) {
      loadResults(); // Load more results when reaching the bottom
    }
  },
  { rootMargin: "200px" }
);

// Initialize search engine
function initialize() {
  loadResults(); // Load initial results for default query
  setupInfiniteScroll(); // Set up infinite scrolling
  setupSearch(); // Set up search functionality
}

initialize();
