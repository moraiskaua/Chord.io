import { useEffect, useState } from 'react';
import * as Tone from 'tone';

export const getRandomChord = () => {
  const possibleNotes = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ];

  const randomNoteIndex = Math.floor(Math.random() * possibleNotes.length);
  const randomNote = possibleNotes[randomNoteIndex];
  const chordType = Math.random() < 0.5 ? '' : 'm';

  const chordNotes = [];
  const rootIndex = possibleNotes.indexOf(randomNote);

  // Índices ajustados para garantir que estejam dentro do array
  const thirdNoteIndex = (rootIndex + 3) % 12; // Terça menor ou maior
  const fifthNoteIndex = (rootIndex + 7) % 12; // Quinta perfeita

  chordNotes.push(possibleNotes[rootIndex]);
  chordNotes.push(possibleNotes[thirdNoteIndex]);
  chordNotes.push(possibleNotes[fifthNoteIndex]);

  let chordName = '';

  switch (chordType) {
    case 'm':
      chordName = chordNotes[0] + 'm';
      break;
    default:
      chordName = chordNotes[0];
      break;
  }

  return {
    notes: chordNotes,
    name: chordName,
  };
};

const useTone = () => {
  const [isToneInitialized, setIsToneInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Tone.start();
      setIsToneInitialized(true);
    }
  }, []);

  return { isToneInitialized };
};

export default useTone;
