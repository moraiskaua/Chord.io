'use client';

import { useContext, useEffect, useState } from 'react';
import useTone, { getChordNotes, getRandomChord } from '@/hooks/useTone';
import * as Tone from 'tone';
import { notesUrl } from '@/data/notes';
import { InstrumentContext } from '@/contexts/InstrumentContext';
import Correctometer from './Correctometer';
import { FaPlay } from 'react-icons/fa';
import { GiMusicalNotes } from 'react-icons/gi';
import { FaArrowTurnDown } from 'react-icons/fa6';
import {
  calculateCircularNoteDistance,
  calculateOverallAccuracy,
} from '@/utils/calculateAccurancy';

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
  const [accuracy, setAccuracy] = useState(70);
  const [dailyChord, setDailyChord] = useState<ChordType>({
    name: '',
    notes: [],
  });

  useEffect(() => {
    console.log('Acorde: ' + dailyChord?.name);
    console.log('Notas: ' + dailyChord?.notes);
  }, [dailyChord]);

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

  const capitalizeFirstLetter = (input: string) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  const calculateAccuracy = (userGuess: string, correctNotes: string[]) => {
    const possibilities = [
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

    const dailyNotes = correctNotes.map(note => note.replace('4', ''));
    const userNotes = getChordNotes(userGuess);

    let totalDistance = 0;

    // Calcula a distância total entre as notas
    for (let i = 0; i < userNotes.length; i++) {
      const userNote = userNotes[i];
      const correctNote = dailyNotes[i];
      const distance = calculateCircularNoteDistance(
        userNote,
        correctNote,
        possibilities,
      );
      totalDistance += distance;
    }

    if (userNotes === dailyNotes) {
      return setAccuracy(prev => accuracyPercentage);
    }

    // Calcula a pontuação com base na distância total
    const accuracyPercentage = calculateOverallAccuracy(
      totalDistance,
      userNotes.length,
    );

    setAccuracy(prev => accuracyPercentage);
  };

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput) alert('Field is empty!');
    setUserGuess(userInput);
    calculateAccuracy(userInput, dailyChord.notes);
  };

  return (
    <div className="bg-[#231C24] w-[95%] rounded-2xl flex-1 flex p-3">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-3 items-center justify-center"
      >
        <input
          type="text"
          value={userInput}
          onChange={e => setUserInput(capitalizeFirstLetter(e.target.value))}
          placeholder="Ex: F#m"
          className={`bg-transparent border-b-8 border-primary text-white text-center font-bold text-8xl py-4 outline-none w-[500px]`}
          disabled={!loaded || !isToneInitialized}
        />
        {userGuess && (
          <p
            className={`text-center text-xl uppercase font-bold ${
              accuracy === 100
                ? 'text-[#00F5B5]'
                : accuracy <= 99 && accuracy >= 90
                ? 'text-[#23C5C8]'
                : 'text-[#FB037A]'
            }`}
          >
            {accuracy === 100
              ? 'Right!'
              : accuracy <= 99 && accuracy >= 90
              ? 'Almost!'
              : 'Wrong!'}
          </p>
        )}
        <div className="mt-5 w-full flex justify-center gap-3">
          <button
            className="bg-primary p-6 rounded-2xl"
            type="button"
            onClick={() => playChord(dailyChord)}
          >
            <FaPlay size={60} color="#8C52B9" />
          </button>
          <button
            className="bg-primary p-6 rounded-2xl"
            type="button"
            onClick={() => playChordArpeggiated(dailyChord)}
          >
            <GiMusicalNotes size={60} color="#8C52B9" />
          </button>
          <button
            className="bg-[#8C52B9] text-white border-2 border-primary rounded-2xl p-6 uppercase font-bold flex flex-col justify-center items-center gap-2"
            type="submit"
          >
            Enter
            <FaArrowTurnDown className="rotate-90" />
          </button>
        </div>
      </form>
      <div>
        <Correctometer accuracy={accuracy} />
      </div>
    </div>
  );
};

export default AudioPlayer;
