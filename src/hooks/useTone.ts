'use client';

import {
  notesPossibilities,
  toneNotesPossibilities,
} from '@/utils/notesPossibilities';
import { useEffect, useState } from 'react';
import * as Tone from 'tone';

export const getRandomChord = () => {
  const randomNoteIndex = Math.floor(
    Math.random() * toneNotesPossibilities.length,
  );
  const randomNote = toneNotesPossibilities[randomNoteIndex];
  const chordType = Math.random() < 0.5 ? '' : 'm';

  let chordName = '';
  const chordNotes = [];
  const rootIndex = toneNotesPossibilities.indexOf(randomNote);

  const thirdNoteIndex = (rootIndex + (chordType === 'm' ? 3 : 4)) % 12; // Terça menor ou maior
  const fifthNoteIndex = (rootIndex + 7) % 12; // Quinta perfeita

  chordNotes.push(toneNotesPossibilities[rootIndex]);
  chordNotes.push(toneNotesPossibilities[thirdNoteIndex]);
  chordNotes.push(toneNotesPossibilities[fifthNoteIndex]);

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
  const [rootNote, sharp] = chordName.split('#');
  const isMinor = chordName.includes('m');

  let rootIndex = notesPossibilities.indexOf(rootNote);

  if (sharp) {
    rootIndex = notesPossibilities.indexOf(rootNote + '#');
  } else if (isMinor) {
    rootIndex = notesPossibilities.indexOf(rootNote.slice(0, -1));
  } else {
    rootIndex = notesPossibilities.indexOf(chordName);
  }

  const thirdNoteIndex = (rootIndex + (isMinor ? 3 : 4)) % 12; // Terça menor ou maior
  const fifthNoteIndex = (rootIndex + 7) % 12; // Quinta perfeita

  return [
    notesPossibilities[rootIndex],
    notesPossibilities[thirdNoteIndex],
    notesPossibilities[fifthNoteIndex],
  ];
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
