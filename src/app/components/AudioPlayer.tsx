'use client';

import useTone from '@/hooks/useTone';
import { useEffect, useState } from 'react';
import * as Tone from 'tone';

interface AudioPlayerProps {
  note: string;
}

const AudioPlayer = ({ note }: AudioPlayerProps) => {
  const { isToneInitialized } = useTone();
  const [loaded, setLoaded] = useState(false);
  const [sampler, setSampler] = useState<Tone.Sampler | null>(null);

  useEffect(() => {
    if (isToneInitialized) {
      const newSampler = new Tone.Sampler({
        urls: {
          [note]: `/assets/guitar-acoustic/${note}.mp3`,
        },
        onload: () => {
          setLoaded(true);
        },
      }).toDestination();

      setSampler(newSampler);
    }
  }, [note, isToneInitialized]);

  const playNote = () => {
    if (loaded && sampler) {
      Tone.start();
      sampler.triggerAttackRelease(note, 1);
    }
  };

  return (
    <button
      className="bg-gray-800 text-white font-bold p-10 rounded-2xl"
      onClick={playNote}
      disabled={!loaded || !isToneInitialized}
    >
      {note}
    </button>
  );
};

export default AudioPlayer;
