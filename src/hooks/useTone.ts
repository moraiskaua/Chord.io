import { useEffect, useState } from 'react';
import * as Tone from 'tone';

const possibleNotes = [
  'C3',
  'C#3',
  'D3',
  'D#3',
  'E3',
  'F3',
  'F#3',
  'G3',
  'G#3',
  'A3',
  'A#3',
  'B3',
];

export const getRandomChord = () => {
  const randomNoteIndex = Math.floor(Math.random() * possibleNotes.length);
  const randomNote = possibleNotes[randomNoteIndex];
  const chordType = Math.random() < 0.5 ? '' : 'm';

  const chordNotes = [];
  const rootIndex = possibleNotes.indexOf(randomNote);

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
