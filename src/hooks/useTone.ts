import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { Frequency } from 'tone/build/esm/core/type/Units';

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

export const getChordNotes = (chordName: string): string[] => {
  const possibilities = [
    'C',
    'Cs',
    'D',
    'Ds',
    'E',
    'F',
    'Fs',
    'G',
    'Gs',
    'A',
    'As',
    'B',
  ];
  const rootNote = chordName.slice(0, -1); // Remove o sufixo 'm' se for menor
  const isMinor = chordName.endsWith('m');

  const rootIndex = possibilities.indexOf(rootNote);
  if (rootIndex === -1) {
    return []; // Acorde não reconhecido
  }

  const thirdNoteIndex = (rootIndex + 3) % 12; // Terça menor ou maior
  const fifthNoteIndex = (rootIndex + 7) % 12; // Quinta perfeita

  const chordNotes: string[] = [
    `${possibilities[rootIndex]}3`,
    `${possibilities[thirdNoteIndex]}3`,
    `${possibilities[fifthNoteIndex]}3`,
  ];

  // Se for acorde menor, ajusta a terça
  if (isMinor) {
    chordNotes[1] = `${possibilities[(rootIndex + 3 - 1) % 12]}3`;
  }

  return chordNotes;
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
