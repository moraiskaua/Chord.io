'use client';

import { useEffect, useState } from 'react';
import useTone, { getRandomChord, getChordNotes } from '@/hooks/useTone';
import * as Tone from 'tone';
import { Frequency } from 'tone/build/esm/core/type/Units';

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
  const [userInput, setUserInput] = useState<string>('');

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
          // Toca o acorde quando a página carrega
          playDailyChord();
        },
      }).toDestination();

      setSampler(newSampler);
    }
  }, [isToneInitialized]);

  const playChord = (chord: string): void => {
    const notes = getChordNotes(chord);
    console.log('Chord:', chord);
    console.log('Notes:', notes);

    if (loaded && sampler) {
      Tone.start();
      sampler.triggerAttackRelease(notes, 1);
    }
  };

  const handleGuess = (chord: string): void => {
    setUserGuess(chord);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setUserInput(event.target.value);
  };

  const handleUserSubmit = (): void => {
    playChord(userInput);
    handleGuess(userInput);
  };

  const playDailyChord = (): void => {
    playChord(dailyChord.name);
  };

  return (
    <div>
      <p className="font-bold text-white">Acorde do dia: {dailyChord?.name}</p>
      <p className="font-bold text-white">
        Notas: {dailyChord?.notes.join(', ')}
      </p>

      <div>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Digite o acorde"
          className="bg-gray-800 text-white font-bold p-4 m-2 rounded-lg"
          disabled={!loaded || !isToneInitialized}
        />

        <button
          onClick={handleUserSubmit}
          className="bg-gray-800 text-white font-bold p-4 m-2 rounded-lg"
          disabled={!loaded || !isToneInitialized}
        >
          Enviar
        </button>

        {/* Botão para tocar o acorde diário novamente */}
      </div>
      <button
        onClick={playDailyChord}
        className="bg-gray-800 text-white font-bold p-4 m-2 rounded-lg"
        disabled={!loaded || !isToneInitialized}
      >
        Tocar Acorde do Dia Novamente
      </button>

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
