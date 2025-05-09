require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || '1ccde7d5327e575ae3330198868f56d9'; // fallback for local dev

app.use(cors());
app.use(express.json());

const moodToGenre = {
  happy: '35',      // Comedy
  sad: '18',        // Drama
  angry: '28',      // Action
  romantic: '10749',// Romance
  bored: '12'       // Adventure
};

app.post('/recommend', async (req, res) => {
  const mood = req.body.mood;
  const genreId = moodToGenre[mood];

  if (!genreId) return res.status(400).json({ error: 'Invalid mood' });

  try {
    const tmdbRes = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
    );

    const movies = tmdbRes.data.results.slice(0, 5).map(movie => ({
      title: movie.title,
      overview: movie.overview,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    }));

    res.json({ movies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch from TMDb' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
