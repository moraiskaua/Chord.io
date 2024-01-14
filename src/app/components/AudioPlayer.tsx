'use client';

import { useContext, useEffect, useState } from 'react';
import useTone, { getRandomChord } from '@/hooks/useTone';
import * as Tone from 'tone';
import { notesUrl } from '@/data/notes';
import { InstrumentContext } from '@/contexts/InstrumentContext';
import Correctometer from './Correctometer';

interface ChordType {
  name: string;
  notes: string[];
}

const AudioPlayer = () => {
  const { instrument } = useContext(InstrumentContext);
  const { isToneInitialized } = useTone();
  const [loaded, setLoaded] = useState(false);
  const [sampler, setSampler] = useState<Tone.Sampler | null>(null);
  const [userGuess, setUserGuess] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [dailyChord, setDailyChord] = useState<ChordType>({
    name: '',
    notes: [],
  });

  useEffect(() => {
    let newChord = getRandomChord();
    newChord = {
      ...newChord,
      name: newChord.name.replace('4', ''),
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
        baseUrl: `/assets/${instrument}/`,
        onload: () => {
          setLoaded(true);
        },
      }).toDestination();

      setSampler(newSampler);
    }
  }, [isToneInitialized, instrument]);

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

  return (
    <div className="bg-[#231C24] w-[95%] md:h-[580px] rounded-2xl flex-1 flex">
      <div>
        <p className="font-bold text-white">
          Acorde do dia: {dailyChord?.name}
        </p>
        <p className="font-bold text-white">
          Notas: {dailyChord?.notes.join(', ')}
        </p>
      </div>

      <form
        onSubmit={e => e.preventDefault()}
        className="w-full flex justify-center items-center"
      >
        <input
          type="text"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          placeholder="F#m"
          className={`bg-transparent border-b-8 border-primary text-white text-center font-bold text-8xl py-4 outline-none w-[500px]`}
          disabled={!loaded || !isToneInitialized}
        />
      </form>

      <div>
        <Correctometer />
      </div>

      {/* <div className="w-full flex justify-center items-center">
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
      </div> */}
    </div>
  );
};

export default AudioPlayer;
