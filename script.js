function getRecommendations() {
  const mood = document.getElementById("mood-select").value;
  const movieListDiv = document.getElementById("movie-list");

  if (!mood) {
    movieListDiv.innerHTML = "<p>Please select a mood.</p>";
    return;
  }

  fetch('https://moodflix-backend.onrender.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mood })
  })
  .then(response => response.json())
  .then(data => {
    let html = "";
    data.movies.forEach(movie => {
      html += `
        <div class="movie-card">
          <img src="${movie.poster}" alt="${movie.title}" />
          <h3>${movie.title}</h3>
          <p>${movie.overview}</p>
        </div>`;
    });
    movieListDiv.innerHTML = html;
  })
  .catch(err => {
    movieListDiv.innerHTML = "<p>Something went wrong.</p>";
    console.error(err);
  });
}
