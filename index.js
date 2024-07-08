// index.js
document.addEventListener('DOMContentLoaded', () => {
  const gameCarousel = document.querySelector('.game-carousel');

  // Fetch game data from games.json
  fetch('games.json')
    .then(response => response.json())
    .then(gamesData => {
      // Create trending game cards (limit to 4)
      for (let i = 0; i < 4 && i < gamesData.length; i++) {
        const game = gamesData[i];
        const gameCard = document.createElement('div');
        gameCard.classList.add('trending-game-card');

        gameCard.innerHTML = `
          <img src="${game.image}" alt="${game.title}">
          <h2>${game.title}</h2>
          <p>${game.description.substring(0, 100)}...</p> 
          <button class="play-button">Play Now</button>
        `;

        gameCard.querySelector('.play-button').addEventListener('click', () => {
          // Validate the link before redirecting
          fetch(game.playLink)
            .then(() => { 
              window.location.href = game.playLink; 
            })
            .catch(error => {
              console.error(`Error loading game: ${game.title}`, error);
              window.location.href = '404.html';
            });
        });

        gameCarousel.appendChild(gameCard);
      }
    })
    .catch(error => {
      console.error('Error loading game data:', error);
      window.location.href = '404.html'; // Redirect on any fetch error
    });
});