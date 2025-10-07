const express = require('express');
const cors = require('cors');
const { generateLyrics } = require('./lyrics-gen');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- Lyrics Generator API endpoint ---
app.get('/api/lyrics-gen', async (req, res) => {
  const { topic, genre, mood, structure, language } = req.query;
  const args = [topic, genre, mood, structure, language];

  const result = await generateLyrics(args);
  res.json(result);
});

// --- Root endpoint auto-response ---
app.get('/', async (req, res) => {
  // Default lyrics generation with "Hey"
  const result = await generateLyrics(['Hey']);
  res.json(result);
});

app.listen(PORT, () => console.log(`Lyrics Generator API running on port ${PORT}`));
