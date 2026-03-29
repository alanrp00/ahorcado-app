// utils/gameLogic.js

// Maximum number of mistakes allowed before losing (head, torso, 2 arms, 2 legs)
export const MAX_MISTAKES = 6;

/**
 * Returns an array with discovered letters or "_" (underscores)
 * @param {string} secretWord - The word to guess (e.g., "GATO")
 * @param {array} guessedLetters - Array of letters the player has tried (e.g., ["A", "X"])
 * @returns {array} - Array representing the word state (e.g., ["_", "A", "_", "_"])
 */
export function generateHiddenLines(secretWord, guessedLetters) {
  return secretWord.split('').map((letter) => {
    if (guessedLetters.includes(letter)) {
      return letter;
    } else {
      return "_";
    }
  });
}

/**
 * Checks if the player won, lost, or is still playing
 * @param {string} secretWord - The word to guess
 * @param {array} guessedLetters - Array of letters the player has tried
 * @param {number} mistakes - Number of wrong attempts
 * @returns {string} - 'playing', 'won', or 'lost'
 */
export function checkGameState(secretWord, guessedLetters, mistakes) {
  if (mistakes >= MAX_MISTAKES) {
    return 'lost';
  }

  const isWon = secretWord.split('').every((letter) => {
    return guessedLetters.includes(letter);
  });

  if (isWon) {
    return 'won';
  }

  return 'playing';
}