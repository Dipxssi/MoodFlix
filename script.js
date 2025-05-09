function getRecommendations() {
  const mood = document.getElementById("mood-select").value; // Correctly get the selected mood
  const movieListDiv = document.getElementById("movie-list");

  if (!mood) {
    movieListDiv.innerHTML = "<p>Please select a mood.</p>";
    return;
  }

  // Send the selected mood to the backend via a POST request
  fetch('https://moodflix-backend.onrender.com/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mood: mood }) // Use 'mood' instead of 'selectMood'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (data.movies && data.movies.length > 0) {
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
    } else {
      movieListDiv.innerHTML = "<p>No recommendations found for this mood.</p>";
    }
  })
  .catch(err => {
    movieListDiv.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    console.error(err);
  });
}
