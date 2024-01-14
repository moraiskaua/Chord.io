'use client';

import { useEffect, useState } from 'react';
import useTone, { getRandomChord } from '@/hooks/useTone';
import * as Tone from 'tone';
import { notesUrl } from '@/data/notes';

interface ChordType {
  name: string;
  notes: string[];
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
    let newChord = getRandomChord();
    newChord = {
      ...newChord,
      name: newChord.name.replace('3', ''),
    };

    setDailyChord(newChord);
  }, []);

  useEffect(() => {
    if (isToneInitialized) {
      const noteUrls: { [key: string]: string } = {};
      Object.entries(notesUrl).forEach(([note, data]) => {
        noteUrls[note] = data.path;
      });

      const newSampler = new Tone.Sampler({
        urls: noteUrls,
        baseUrl: '/assets/guitar-acoustic/',
        onload: () => {
          setLoaded(true);
        },
      }).toDestination();

      setSampler(newSampler);
    }
  }, [isToneInitialized]);

  const playChord = ({ notes }: ChordType): void => {
    if (loaded && sampler) {
      Tone.start();
      sampler.triggerAttackRelease(notes, 1);
    }
  };

  const playChordArpeggiated = ({ notes }: ChordType): void => {
    if (loaded && sampler) {
      Tone.start();
      notes.forEach((note, index) => {
        setTimeout(() => {
          sampler.triggerAttackRelease(note, 1);
        }, index * 400);
      });
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setUserInput(event.target.value);
  };

  return (
    <div>
      <p className="font-bold text-white">Acorde do dia: {dailyChord?.name}</p>
      <p className="font-bold text-white">
        Notas: {dailyChord?.notes.join(', ')}
      </p>

      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Digite o acorde"
          className="bg-gray-800 text-white font-bold p-4 m-2 rounded-lg"
          disabled={!loaded || !isToneInitialized}
        />

        <button
          onClick={() => setUserGuess(userInput)}
          className="bg-gray-800 text-white font-bold p-4 m-2 rounded-lg"
          disabled={!loaded || !isToneInitialized}
        >
          Enviar
        </button>

        {/* Botão para tocar o acorde diário novamente */}
      </form>
      <button
        onClick={() => playChord(dailyChord)}
        className="bg-gray-800 text-white font-bold p-4 m-2 rounded-lg"
        disabled={!loaded || !isToneInitialized}
      >
        Tocar acorde
      </button>
      <button
        onClick={() => playChordArpeggiated(dailyChord)}
        className="bg-gray-800 text-white font-bold p-4 m-2 rounded-lg"
        disabled={!loaded || !isToneInitialized}
      >
        Tocar nota por nota
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
