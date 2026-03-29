// utils/dictionaryService.js

/**
 * Validates if a word entered by a user is valid for the game.
 * Ensures it has no spaces, numbers, or special symbols.
 * @param {string} word - The word typed by the multiplayer host
 * @param {string} language - The language code ('es', 'en', etc.)
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidWord(word, language = 'es') {
  if (!word || word.length < 3) return false; // Minimum length of 3 letters

  // Expresión Regular (Regex): 
  // ^ indica inicio, $ indica final.
  // [a-zA-Z] son letras inglesas. Añadimos Ñ y vocales con tilde para español.
  // El + indica que debe haber una o más letras.
  let regex;

  if (language === 'es') {
    regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+$/;
  } else if (language === 'en') {
    regex = /^[a-zA-Z]+$/;
  } else {
    // Default fallback
    regex = /^[a-zA-Z]+$/;
  }

  return regex.test(word);
}

/**
 * Fetches a random word from a large dataset or external API.
 * This is an ASYNC function because asking an API takes time.
 * @param {string} language - The language code ('es', 'en', etc.)
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {Promise<string>} - The random word in uppercase
 */
export async function fetchRandomWord(language = 'es', difficulty = 'medium') {
  try {
    /* TODO: Implement actual fetching logic here.
      For a professional app, you have two options:
      1. Fetch from a REST API (e.g., fetch(`https://api.diccionario.com/word?lang=${language}`))
      2. Import a large local JSON file and pick a random element.
    */

    // Simulated API Call delay for realism (1 second)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulated dynamic response based on language
    if (language === 'es') {
      return "MURCIELAGO"; // Replace with actual dynamic fetch
    } else {
      return "KEYBOARD"; // Replace with actual dynamic fetch
    }

  } catch (error) {
    console.error("Error fetching word:", error);
    return "ERROR"; // Fallback word in case the API fails
  }
}

/**
 * Normalizes a word (removes accents and converts to uppercase)
 * Useful so players don't have to type accents to guess "ÁRBOL"
 * @param {string} word 
 * @returns {string}
 */
export function normalizeWord(word) {
  return word
    .normalize("NFD") // Separates accents from letters
    .replace(/[\u0300-\u036f]/g, "") // Removes the accents
    .toUpperCase();
}