const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const moodToGenre = {
  happy: "Comedy",
  sad: "Drama",
  angry: "Action",
  romantic: "Romance",
  bored: "Adventure"
};

const genreToMovies = {
  Comedy: ["The Intern", "Zootopia", "The Grand Budapest Hotel"],
  Drama: ["The Pursuit of Happyness", "Forrest Gump", "The Fault in Our Stars"],
  Action: ["Mad Max: Fury Road", "John Wick", "The Dark Knight"],
  Romance: ["La La Land", "Me Before You", "The Notebook"],
  Adventure: ["Jumanji", "Into the Wild", "Pirates of the Caribbean"]
};

app.post('/recommend', (req, res) => {
  const mood = req.body.mood;
  if (!mood || !moodToGenre[mood]) {
    return res.status(400).json({ error: 'Invalid mood' });
  }

  const genre = moodToGenre[mood];
  const movies = genreToMovies[genre];

  res.json({ genre, movies });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
