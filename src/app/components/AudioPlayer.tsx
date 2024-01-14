'use client';

import { useEffect, useState } from 'react';
import useTone, { getRandomChord } from '@/hooks/useTone';
import * as Tone from 'tone';
import { Frequency } from 'tone/build/esm/core/type/Units';

const possibleNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

interface ChordType {
  name: string;
  notes: Frequency[];
}

const AudioPlayer = () => {
  const { isToneInitialized } = useTone();
  const [loaded, setLoaded] = useState(false);
  const [sampler, setSampler] = useState<Tone.Sampler | null>(null);
  const [dailyChord, setDailyChord] = useState<ChordType>({
    name: '',
    notes: [],
  });
  const [userGuess, setUserGuess] = useState<string>('');

  useEffect(() => {
    const newChord = getRandomChord();
    setDailyChord(newChord);
    setUserGuess('');
  }, []);

  useEffect(() => {
    if (isToneInitialized) {
      const noteUrls: { [key: string]: string } = {};
      const possibilities = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3'];

      possibilities.forEach(note => {
        noteUrls[note] = `/assets/guitar-acoustic/${note}.mp3`;
      });

      const newSampler = new Tone.Sampler({
        urls: noteUrls,
        onload: () => {
          setLoaded(true);
        },
      }).toDestination();

      setSampler(newSampler);
    }
  }, [isToneInitialized]);

  const playChord = (chord: string): void => {
    if (loaded && sampler) {
      Tone.start();
      sampler.triggerAttackRelease(dailyChord.notes, 1);
    }
  };

  const handleGuess = (chord: string): void => {
    setUserGuess(chord);
  };

  return (
    <div>
      <p className="font-bold text-white">Acorde do dia: {dailyChord?.name}</p>
      <p className="font-bold text-white">notas: {dailyChord?.notes}</p>

      <div>
        {possibleNotes.map(note => (
          <button
            key={note}
            className={`bg-gray-800 text-white font-bold p-4 m-2 rounded-lg ${
              userGuess === note ? 'bg-blue-500' : ''
            }`}
            onClick={() => {
              playChord(note);
              handleGuess(note);
            }}
            disabled={!loaded || !isToneInitialized}
          >
            {note}
          </button>
        ))}

        {possibleNotes.map(note => (
          <button
            key={`${note}min`}
            className={`bg-gray-800 text-white font-bold p-4 m-2 rounded-lg`}
            onClick={() => {
              playChord(note);
              handleGuess(`${note}m`);
            }}
            disabled={!loaded || !isToneInitialized}
          >
            {note}m
          </button>
        ))}
      </div>

      {userGuess && (
        <p
          className={`text-center text-xl ${
            userGuess === dailyChord?.name ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {userGuess === dailyChord?.name ? 'Correto!' : 'Incorreto!'}
        </p>
      )}
    </div>
  );
};

export default AudioPlayer;
