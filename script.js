// h(x): Gets user's selected mood from dropdown
function getUserMood() {
  const mood = document.getElementById("mood-select").value;
  console.log("h(x): User selected mood →", mood);
  return mood;
}

// g(x): Sends mood to backend and gets raw movie data
function fetchMovieRecommendations(mood) {
  console.log("g(x): Sending mood to backend →", mood);

  return fetch('https://moodflix-backend.onrender.com/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mood: mood })
  })
  .then(response => {
    console.log("g(x): Got response from backend");
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

// f(x): Processes and displays movie recommendations
function displayMovies(data, mood) {
  const movieListDiv = document.getElementById("movie-list");

  console.log("f(x): Processing data and updating UI");

  if (data.movies && data.movies.length > 0) {
    const movieTitles = data.movies.map(m => m.title);
    console.log(`Math Relation: f(${mood}) = [${movieTitles.join(", ")}]`);

    let html = "";
    data.movies.forEach(movie => {
      console.log("  - Movie:", movie.title);
      html += `
        <div class="movie-card">
          <img src="${movie.poster}" alt="${movie.title}" />
          <div>
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
          </div>
        </div>`;
    });

    movieListDiv.innerHTML = html;
  } else {
    console.log(`No movies found for mood: ${mood}`);
    movieListDiv.innerHTML = "<p>No recommendations found for this mood.</p>";
  }
}

// Master function: simulates full function composition f(g(h(x)))
function getRecommendations() {
  const mood = getUserMood();
  const movieListDiv = document.getElementById("movie-list");

  if (!mood) {
    movieListDiv.innerHTML = "<p>Please select a mood.</p>";
    return;
  }

  console.log("Function Composition: f(g(h(x))) → Getting movie recommendations based on mood");

  fetchMovieRecommendations(mood)
    .then(data => displayMovies(data, mood))
    .catch(err => {
      console.error("Error occurred:", err);
      movieListDiv.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    });
}
