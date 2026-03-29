// services/firebaseService.js
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Tu archivo de configuración

/**
 * Generates a random 4-character room code (e.g., "X7B2")
 */
function generateRoomCode() {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

/**
 * Creates a new multiplayer room
 * @param {string} playerName - The name of the host creating the room
 * @returns {Promise<string>} - The generated room code
 */
export async function createRoom(playerName) {
  const roomCode = generateRoomCode();
  const roomRef = doc(db, "rooms", roomCode);

  // Initial room state
  await setDoc(roomRef, {
    status: "waiting", // 'waiting', 'playing', 'finished'
    secretWord: "",
    guessedLetters: [],
    players: [
      { id: "player_1", name: playerName, mistakes: 0 }
    ],
    hostId: "player_1",
    turn: "player_1" // Whose turn is it to guess
  });

  return roomCode;
}

/**
 * Joins an existing room if it has less than 4 players
 * @param {string} roomCode - The 4-character code
 * @param {string} playerName - The joining player's name
 * @returns {Promise<string|null>} - Returns the new player's ID or null if full/not found
 */
export async function joinRoom(roomCode, playerName) {
  const roomRef = doc(db, "rooms", roomCode);
  const roomSnap = await getDoc(roomRef);

  if (!roomSnap.exists()) {
    console.error("Room does not exist.");
    return null;
  }

  const roomData = roomSnap.data();

  if (roomData.players.length >= 4) {
    console.error("Room is full.");
    return null;
  }

  if (roomData.status !== "waiting") {
    console.error("Game has already started.");
    return null;
  }

  const newPlayerId = `player_${roomData.players.length + 1}`;
  const newPlayer = { id: newPlayerId, name: playerName, mistakes: 0 };

  // Add the new player to the array
  await updateDoc(roomRef, {
    players: arrayUnion(newPlayer)
  });

  return newPlayerId;
}

/**
 * The 'Elector' sets the word for the others to guess
 * @param {string} roomCode 
 * @param {string} word - The validated uppercase word
 */
export async function setSecretWord(roomCode, word) {
  const roomRef = doc(db, "rooms", roomCode);
  await updateDoc(roomRef, {
    secretWord: word,
    status: "playing",
    guessedLetters: [] // Reset guesses for the new round
  });
}

/**
 * A player attempts to guess a letter
 * @param {string} roomCode 
 * @param {string} letter - The guessed letter
 */
export async function submitGuess(roomCode, letter) {
  const roomRef = doc(db, "rooms", roomCode);

  // arrayUnion ensures the letter is only added once
  await updateDoc(roomRef, {
    guessedLetters: arrayUnion(letter)
  });
}

/* NOTE: Handling individual mistakes (updating a specific player's mistake count inside an array)
  is better handled inside the React Hook to avoid complex Firestore array overwrites,
  or by using a subcollection. We will manage the logic of mistakes in our custom hook!
*/