// games.js
document.addEventListener('DOMContentLoaded', () => {
    // Function to create game cards from the data
    function createGameCards(gamesData) {
        const gameContainer = document.querySelector('.game-container');
        gameContainer.innerHTML = ''; // Clear previous cards

        gamesData.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.classList.add('game-card');

            // Create card elements
            const img = document.createElement('img');
            img.src = game.image;
            img.alt = game.title;

            const title = document.createElement('h2');
            title.textContent = game.title;

            const description = document.createElement('p');
            description.textContent = game.description;

            const playButton = document.createElement('button');
            playButton.classList.add('play-button');
            playButton.textContent = 'Play Now';
            playButton.addEventListener('click', () => {
                window.location.href = game.playLink; // Redirect to the game's link
            });

            // Append elements to the game card
            gameCard.appendChild(img);
            gameCard.appendChild(title);
            gameCard.appendChild(description);
            gameCard.appendChild(playButton);

            // Add the game card to the container
            gameContainer.appendChild(gameCard);
        });
    }

    // Function to load game data from games.json
    function loadGameData() {
        fetch('games.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                gamesData = data; // Store the game data
                createGameCards(data);
                populateCategories(data); // Populate categories after loading data
            })
            .catch(error => {
                console.error('Error loading game data:', error);
            });
    }

    // Function to populate categories dropdown
    function populateCategories(gamesData) {
        const categoriesDropdown = document.getElementById('categoriesDropdown');
        const categoriesButton = document.getElementById('categoriesButton');
        const categoryCounts = {}; // Object to store category counts

        // Add the "All Games" category
        categoriesDropdown.innerHTML = `
            <li data-category="all" class="active">All Games (${gamesData.length})</li>
        `;

        gamesData.forEach(game => {
            if (!categoryCounts[game.category]) {
                categoryCounts[game.category] = 0;
            }
            categoryCounts[game.category]++;
        });

        // Add other categories to the dropdown
        for (const category in categoryCounts) {
            const categoryItem = document.createElement('li');
            categoryItem.dataset.category = category;
            categoryItem.textContent = `${category} (${categoryCounts[category]})`;
            categoriesDropdown.appendChild(categoryItem);
        }

        // Event listener for category dropdown items
        categoriesDropdown.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                const selectedCategory = event.target.dataset.category;
                filterGames(selectedCategory, gamesData); // Filter games by category
                // Close the dropdown
                categoriesDropdown.style.display = 'none';
            }
        });

        // Event listener for categories button
        categoriesButton.addEventListener('click', () => {
            // Toggle dropdown visibility
            categoriesDropdown.style.display = categoriesDropdown.style.display === 'none' ? 'block' : 'none';
        });

        // Event listener to close dropdown on click outside
        document.addEventListener('click', (event) => {
            if (!categoriesButton.contains(event.target) && !categoriesDropdown.contains(event.target)) {
                categoriesDropdown.style.display = 'none';
            }
        });
    }

    // Function to filter games based on the selected category and search term
    function filterGames(selectedCategory, gamesData, searchTerm = '') { 
        const gameContainer = document.querySelector('.game-container');
        gameContainer.innerHTML = ''; // Clear previous cards

        let gamesFound = false; // Flag to track if any games are found

        gamesData.forEach(game => {
            // Filter by category
            if (selectedCategory === 'all' || game.category === selectedCategory) {
                // Filter by search term (case-insensitive, partial match)
                if (searchTerm === '' || game.title.toLowerCase().startsWith(searchTerm.toLowerCase())) { 
                    // Create game cards (your existing code for creating game cards) ...
                    const gameCard = document.createElement('div');
                    gameCard.classList.add('game-card');

                    // Create card elements
                    const img = document.createElement('img');
                    img.src = game.image;
                    img.alt = game.title;

                    const title = document.createElement('h2');
                    title.textContent = game.title;

                    const description = document.createElement('p');
                    description.textContent = game.description;

                    const playButton = document.createElement('button');
                    playButton.classList.add('play-button');
                    playButton.textContent = 'Play Now';
                    playButton.addEventListener('click', () => {
                        window.location.href = game.playLink; // Redirect to the game's link
                    });

                    // Append elements to the game card
                    gameCard.appendChild(img);
                    gameCard.appendChild(title);
                    gameCard.appendChild(description);
                    gameCard.appendChild(playButton);

                    // Add the game card to the container
                    gameContainer.appendChild(gameCard);

                    gamesFound = true; // Set flag to true if a game is found
                }
            }
        });

        // Display "No games found" message if no games match
        if (!gamesFound) {
            const noGamesMessage = document.createElement('p');
            noGamesMessage.textContent = "No games found. Please try a different search term.";
            gameContainer.appendChild(noGamesMessage);
        }
    }

    // Event listener for search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value;
        const selectedCategory = document.querySelector('.categories-dropdown .active').dataset.category;
        filterGames(selectedCategory, gamesData, searchTerm); // Pass searchTerm
    });

    // Call loadGameData after the DOM is ready
    loadGameData();
});