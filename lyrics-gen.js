const axios = require('axios');

const types = {
  genre: {
    pop: 'Pop', rock: 'Rock', folk: 'Folk', rap: 'Rap',
    rnb: 'R&B', jazz: 'Jazz', classical: 'Classical',
    electronic: 'Electronic', country: 'Country', blues: 'Blues'
  },
  mood: {
    happy: 'Happy', sad: 'Sad', romantic: 'Romantic', energetic: 'Energetic',
    peaceful: 'Peaceful', melancholic: 'Melancholic', angry: 'Angry',
    hopeful: 'Hopeful', nostalgic: 'Nostalgic', uplifting: 'Uplifting'
  },
  structure: {
    verse_chorus: 'Verse + Chorus',
    verse_chorus_bridge: 'Verse + Chorus + Bridge',
    verse_prechorus_chorus: 'Verse + Pre-Chorus + Chorus',
    verse_chorus_bridge_chorus: 'Verse + Chorus + Bridge + Chorus',
    verse_only: 'Verse Only',
    chorus_only: 'Chorus Only'
  },
  language: {
    en: 'English',
    id: 'Indonesian'
  }
};

async function generateLyrics(args) {
  try {
    let [topic, genreKey, moodKey, structureKey, langInput] = args;

    if (!topic) topic = 'Love';
    if (!genreKey) genreKey = 'pop';
    if (!moodKey) moodKey = 'happy';
    if (!structureKey) structureKey = 'verse_chorus';
    if (!langInput) langInput = 'en';

    // Validate inputs
    if (!types.genre[genreKey?.toLowerCase()]) genreKey = 'pop';
    if (!types.mood[moodKey?.toLowerCase()]) moodKey = 'happy';
    if (!types.structure[structureKey?.toLowerCase()]) structureKey = 'verse_chorus';
    if (!types.language[langInput?.toLowerCase()]) langInput = 'en';

    const payload = {
      topic,
      style: genreKey.toLowerCase(),
      mood: moodKey.toLowerCase(),
      structure: structureKey.toLowerCase().replace(/_/g, '-'),
      language: langInput.toLowerCase()
    };

    const { data } = await axios.post(
      'https://lyricsintosong.ai/api/generate-lyrics',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://lyricsintosong.ai',
          'Referer': 'https://lyricsintosong.ai/lyrics-generator',
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );

    const { title = 'Untitled', lyrics } = data?.data || {};
    if (!lyrics) throw new Error('Lyrics not found.');

    return {
      status: true,
      creator: '@DanuZz',
      title,
      lyrics
    };
  } catch (err) {
    console.error('Lyrics API error:', err.message);
    return { status: false, message: 'Failed to generate lyrics.' };
  }
}

module.exports = { generateLyrics };
