// hooks/useGame.js
import { useCallback, useEffect, useState } from 'react';
import { fetchRandomWord, normalizeWord } from '../services/dictionary-service';
import { checkGameState, generateHiddenLines, MAX_MISTAKES } from '../utils/game-logic';

export function useGame() {
  // --- ESTADOS DE REACT (React States) ---
  const [secretWord, setSecretWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameState, setGameState] = useState('loading'); // 'loading', 'playing', 'won', 'lost'
  const [hiddenLines, setHiddenLines] = useState([]);

  // --- EFECTO: Reaccionar a cada jugada ---
  // Cada vez que cambien las letras o los fallos, actualizamos la pantalla
  useEffect(() => {
    if (!secretWord) return;

    // 1. Generar los guiones o letras descubiertas
    const lines = generateHiddenLines(secretWord, guessedLetters);
    setHiddenLines(lines);

    // 2. Comprobar si ganamos o perdimos
    const currentStatus = checkGameState(secretWord, guessedLetters, mistakes);
    setGameState(currentStatus);
  }, [secretWord, guessedLetters, mistakes]);

  // --- ACCIÓN: Iniciar partida de 1 Jugador ---
  const startSinglePlayer = async (language = 'es', difficulty = 'medium') => {
    setGameState('loading');
    setGuessedLetters([]);
    setMistakes(0);

    // Traemos la palabra del servicio que creamos
    const newWord = await fetchRandomWord(language, difficulty);
    setSecretWord(normalizeWord(newWord));
    setGameState('playing');
  };

  // --- ACCIÓN: Intentar adivinar una letra ---
  const guessLetter = useCallback((letter) => {
    // Si el juego terminó, no hacemos nada
    if (gameState !== 'playing') return;

    const normalizedLetter = normalizeWord(letter);

    // Si ya intentamos esta letra antes, no hacemos nada
    if (guessedLetters.includes(normalizedLetter)) return;

    // Añadimos la letra a la lista de intentos
    setGuessedLetters((prev) => [...prev, normalizedLetter]);

    // Si la palabra secreta no tiene esa letra, sumamos un fallo
    if (!secretWord.includes(normalizedLetter)) {
      setMistakes((prev) => prev + 1);
    }
  }, [gameState, guessedLetters, secretWord]);

  // --- EXPORTAR LO NECESARIO PARA LA INTERFAZ ---
  return {
    secretWord,
    guessedLetters,
    mistakes,
    gameState,
    hiddenLines,
    maxMistakes: MAX_MISTAKES,
    startSinglePlayer,
    guessLetter
  };
}