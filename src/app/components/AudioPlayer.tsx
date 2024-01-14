'use client';

import { useEffect, useState } from 'react';
import * as Tone from 'tone';

interface AudioPlayerProps {
  note: string;
}

const AudioPlayer = ({ note }: AudioPlayerProps) => {
  const [loaded, setLoaded] = useState(false);
  const sampler = new Tone.Sampler({
    urls: {
      [note]: `/assets/guitar-acoustic/${note}.mp3`,
    },
    onload: () => {
      setLoaded(true);
    },
  }).toDestination();

  useEffect(() => {
    return () => {
      sampler.dispose();
    };
  }, [sampler]);

  const playNote = () => {
    if (loaded) {
      Tone.start();
      sampler.triggerAttackRelease(note, 1);
    }
  };

  return (
    <button
      className="bg-gray-800 text-white font-bold p-10 rounded-2xl"
      onClick={playNote}
    >
      {note}
    </button>
  );
};

export default AudioPlayer;
