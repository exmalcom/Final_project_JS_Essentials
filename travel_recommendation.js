// script.js

// Function to fetch travel data from the JSON file
async function fetchTravelData() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        console.log(data); // Log the fetched data
        return data;
    } catch (error) {
        console.error('Error fetching travel data:', error);
    }
}

// Function to handle user search input
function handleSearch(data) {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('search');

    searchBtn.addEventListener('click', () => {
        const keyword = searchInput.value.toLowerCase();
        const results = searchRecommendations(data, keyword);
        displayResults(results);
    });
}

// Function to search recommendations based on keyword
function searchRecommendations(data, keyword) {
    let results = [];

    if (keyword.includes('beach')) {
        results = [...data.beaches.slice(0, 2)]; // Get first two beach recommendations
    } else if (keyword.includes('temple')) {
        results = [...data.temples.slice(0, 2)]; // Get first two temple recommendations
    } else if (keyword.includes('country')) {
        results = [...data.countries.slice(0, 2)]; // Get first two country recommendations
    }

    return results;
}

// Function to display results on the webpage
// Function to display results on the webpage
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.length > 0) {
        resultsContainer.style.display = 'block'; // Show the popup

        results.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('result-item');

            // Create content for each item
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <img src="${item.imageUrl}" alt="${item.name}">
                <p>${item.description}</p>
            `;

            resultsContainer.appendChild(itemElement);
        });
    } else {
        resultsContainer.style.display = 'none'; // Hide the popup if no results
    }
}

// Function to clear results
// Function to clear results
function clearResults() {
    const resetBtn = document.getElementById('resetBtn');
    const resultsContainer = document.getElementById('results');

    resetBtn.addEventListener('click', () => {
        resultsContainer.innerHTML = ''; // Clear results
        resultsContainer.style.display = 'none'; // Hide the results popup
        document.getElementById('search').value = ''; // Clear search input
    });
}

// Main script execution
fetchTravelData().then(data => {
    handleSearch(data);
    clearResults(); // Call the clear results function
});