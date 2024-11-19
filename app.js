
// Select elements
const darkModeToggle = document.getElementById('darkModeToggle');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const trendingList = document.getElementById('trendingList');
const articleList = document.getElementById('articleList');

// Variables for dark mode and API data
let darkMode = false;
let articles = [];
let loadedArticles = 0;

// Function to toggle Dark Mode
function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    let darkMode = false;
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.textContent = darkMode ? '🌞' : '🌙'; 
    darkModeToggle.addEventListener('click', toggleDarkMode);
    // Change icon for dark mode toggle
}

// Function to fetch articles (replace with real API data in production)
function fetchArticles() {
    const newArticles = [
        {
            title: "Tech News: AI's Impact on Future Jobs",
            excerpt: "Artificial Intelligence is transforming industries and reshaping job markets...",
            link: "#"
        },
        {
            title: "Health: Benefits of Meditation",
            excerpt: "Meditation can help reduce stress and improve overall health. Learn how...",
            link: "#"
        },
        {
            title: "Finance: Stock Market Insights",
            excerpt: "The stock market continues to fluctuate as new trends emerge. Here’s what to know...",
            link: "#"
        },
        {
            title: "Entertainment: New Movie Releases",
            excerpt: "Check out the latest blockbuster movies hitting theaters this week...",
            link: "#"
        },
        {
            title: "Tech: The Future of 5G",
            excerpt: "5G technology promises to revolutionize the internet experience with faster speeds...",
            link: "#"
        },
        {
            title: "Health: Nutrition Tips for a Healthy Life",
            excerpt: "Discover key nutrients that can help boost your energy and health on a daily basis...",
            link: "#"
        }
    ];

    articles = [...articles, ...newArticles];
    displayArticles();
}

// Function to display articles
function displayArticles() {
    const articlesToDisplay = articles.slice(loadedArticles, loadedArticles + 3);
    loadedArticles += 3;

    articlesToDisplay.forEach(article => {
        const articleItem = document.createElement('div');
        articleItem.classList.add('article-item');
        articleItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <a href="${article.link}">Read More</a>
        `;
        articleList.appendChild(articleItem);
    });

    if (loadedArticles >= articles.length) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'No More Articles';
    }
}

// Function to handle search
function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query)
    );
    displayFilteredArticles(filteredArticles);
}

// Function to display filtered articles
function displayFilteredArticles(filteredArticles) {
    articleList.innerHTML = '';  // Clear current articles
    filteredArticles.forEach(article => {
        const articleItem = document.createElement('div');
        articleItem.classList.add('article-item');
        articleItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <a href="${article.link}">Read More</a>
        `;
        articleList.appendChild(articleItem);
    });
}

// Event listeners
darkModeToggle.addEventListener('click', toggleDarkMode);
searchButton.addEventListener('click', handleSearch);
loadMoreBtn.addEventListener('click', fetchArticles);

// Initial load of articles
fetchArticles();