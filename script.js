function getRecommendations() {
  const mood = document.getElementById("mood-select").value;
  const movieListDiv = document.getElementById("movie-list");

  if (!mood) {
    movieListDiv.innerHTML = "<p>Please select a mood.</p>";
    return;
  }

  fetch('http://localhost:3000/recommend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ mood })
  })
  .then(response => response.json())
  .then(data => {
    let html = `<p><strong>Genre:</strong> ${data.genre}</p><ul>`;
    data.movies.forEach(movie => html += `<li>${movie}</li>`);
    html += "</ul>";
    movieListDiv.innerHTML = html;
  })
  .catch(err => {
    movieListDiv.innerHTML = "<p>Something went wrong.</p>";
    console.error(err);
  });
}
