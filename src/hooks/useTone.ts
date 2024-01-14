import { useEffect, useState } from 'react';
import * as Tone from 'tone';

const possibleNotes = [
  'C4',
  'C#4',
  'D4',
  'D#4',
  'E4',
  'F4',
  'F#4',
  'G4',
  'G#4',
  'A4',
  'A#4',
  'B4',
];

export const getRandomChord = () => {
  const randomNoteIndex = Math.floor(Math.random() * possibleNotes.length);
  const randomNote = possibleNotes[randomNoteIndex];
  const chordType = Math.random() < 0.5 ? '' : 'm';

  let chordName = '';
  const chordNotes = [];
  const rootIndex = possibleNotes.indexOf(randomNote);

  const thirdNoteIndex = (rootIndex + (chordType === 'm' ? 3 : 4)) % 12; // Terça menor ou maior
  const fifthNoteIndex = (rootIndex + 7) % 12; // Quinta perfeita

  chordNotes.push(possibleNotes[rootIndex]);
  chordNotes.push(possibleNotes[thirdNoteIndex]);
  chordNotes.push(possibleNotes[fifthNoteIndex]);

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
