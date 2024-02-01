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
import MusicButton from './MusicButton';
import Modal from './Modal';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { notesPossibilities } from '@/utils/notesPossibilities';

interface ChordType {
  name: string;
  notes: string[];
}

const AudioPlayer = () => {
  const [loaded, setLoaded] = useState(false);
  const [sampler, setSampler] = useState<Tone.Sampler | null>(null);
  const [userGuess, setUserGuess] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [accuracy, setAccuracy] = useState(70);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hitModal, setHitModal] = useState(false);
  const [isCorrectModal, setIsCorrectModal] = useState(false);
  const [dailyChord, setDailyChord] = useState<ChordType>({
    name: '',
    notes: [],
  });

  const { instrument } = useContext(InstrumentContext);
  const { isToneInitialized } = useTone();
  const session = useSession();
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (path === '/playground') {
      return generateNewChord();
    }

    const getChordData = async () => {
      const lastRequestDate = localStorage.getItem('lastChordRequestDate');
      const today = new Date().toISOString().split('T')[0];

      if (path === '/') {
        if (lastRequestDate === today && localStorage.getItem('dailyChord')) {
          setAttempts(JSON.parse(localStorage.getItem('attempts')));
          setDailyChord(JSON.parse(localStorage.getItem('dailyChord')));
          setIsCorrectModal(localStorage.getItem('chordIsCorrect') === 'true');
          setIsCorrect(localStorage.getItem('chordIsCorrect') === 'true');

          return;
        }

        const { data } = await axios.get('/api/daily-chord');
        setDailyChord(data);

        // Atualizar a data da última requisição no localStorage
        localStorage.setItem('lastChordRequestDate', today);

        // Salvar o acorde no localStorage
        localStorage.setItem('dailyChord', JSON.stringify(data));
      }
    };

    getChordData();
  }, [path]);

  useEffect(() => {
    if (userGuess === dailyChord?.name && userGuess !== '') {
      setHitModal(true);
    }
  }, [userGuess, dailyChord?.name]);

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

  const generateNewChord = () => {
    let newChord = getRandomChord();
    newChord = {
      ...newChord,
      name: newChord.name.replace('4', ''),
    };

    setDailyChord(newChord);
  };

  const capitalizeFirstLetter = (input: string) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  const calculateAccuracy = (userGuess: string, correctNotes: string[]) => {
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
        notesPossibilities,
      );
      totalDistance += distance;
    }

    // Calcula a pontuação com base na distância total
    const accuracyPercentage = calculateOverallAccuracy(
      totalDistance,
      userNotes.length,
    );

    setAccuracy(accuracyPercentage);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput) return alert('Field is empty!');

    setUserGuess(userInput);
    calculateAccuracy(userInput, dailyChord.notes);

    if (userInput === dailyChord.name && !session.data?.user) {
      return setHitModal(true);
    }

    if (path === '/' && attempts < 5) {
      setAttempts(prevAttempts => prevAttempts + 1);
      localStorage.setItem('attempts', JSON.stringify(attempts + 1));

      if (userInput === dailyChord.name) {
        const deduction = 20 * attempts;
        const calculatedPoints = Math.max(100 - deduction, 0);
        const userEmail = session.data?.user.email;
        localStorage.setItem('chordIsCorrect', 'true');
        setIsCorrect(true);
        setHitModal(true);

        await axios.post('/api/guess-chord', {
          userEmail,
          userInput,
          calculatedPoints,
        });
      }
    }
  };

  const handleRestartGame = () => {
    setUserInput('');
    setUserGuess('');
    setHitModal(false);
    setAccuracy(70);
    generateNewChord();
  };

  return (
    <div className="bg-[#231C24] w-[95%] rounded-2xl flex-1 flex p-3">
      {path === '/' && isCorrectModal && (
        <Modal
          title="Congratulations!"
          message="You've already hit the chord of the day!"
          buttonText="Go to Playground"
          onClose={() => setIsCorrectModal(false)}
          onGoToPlayground={() => {
            setIsCorrectModal(false);
            router.push('/playground');
          }}
        />
      )}
      {hitModal && (
        <Modal
          title="Congratulations!"
          message={`Great job! You've correctly identified the chord`}
          chord={dailyChord.name}
          buttonText={path === '/playground' && 'Play again'}
          onClose={
            path === '/playground'
              ? handleRestartGame
              : () => setHitModal(false)
          }
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-3 items-center justify-center"
      >
        <input
          type="text"
          value={userInput}
          onChange={e => setUserInput(capitalizeFirstLetter(e.target.value))}
          placeholder="Ex: F#m"
          className={`bg-transparent border-b-8 border-primary text-white text-center font-bold text-8xl py-4 outline-none w-[500px] disabled:opacity-50 disabled:pointer-events-none`}
          disabled={!loaded || !isToneInitialized || attempts > 4 || isCorrect}
        />
        <div className="mt-5 w-full flex justify-center gap-3">
          <MusicButton
            icon={FaPlay}
            size={60}
            disabled={
              !loaded || !isToneInitialized || attempts > 4 || isCorrect
            }
            onClick={() => playChord(dailyChord)}
          />
          <MusicButton
            icon={GiMusicalNotes}
            size={60}
            disabled={
              !loaded || !isToneInitialized || attempts > 4 || isCorrect
            }
            onClick={() => playChordArpeggiated(dailyChord)}
          />
          <MusicButton
            icon={FaArrowTurnDown}
            variant="secondary"
            text="Enter"
            disabled={
              !loaded || !isToneInitialized || attempts > 4 || isCorrect
            }
          />
        </div>
      </form>
      <div>
        <Correctometer accuracy={accuracy} />
      </div>
    </div>
  );
};

export default AudioPlayer;
