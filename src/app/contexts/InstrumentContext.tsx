import React, { ReactNode, createContext, useEffect, useState } from 'react';

type InstrumentType = 'guitar-acoustic' | 'piano';

interface InstrumentContextProps {
  instrument: InstrumentType;
  setInstrument: React.Dispatch<React.SetStateAction<InstrumentType>>;
}

export const InstrumentContext = createContext<InstrumentContextProps>({
  instrument: 'guitar-acoustic',
  setInstrument: () => {},
});

const InstrumentProvider = ({ children }: { children: ReactNode }) => {
  const [instrument, setInstrument] = useState<InstrumentType>('piano');

  useEffect(() => {
    setInstrument(
      (localStorage.getItem('instrument') as InstrumentType) ?? 'piano',
    );
  }, []);

  return (
    <InstrumentContext.Provider value={{ instrument, setInstrument }}>
      {children}
    </InstrumentContext.Provider>
  );
};

export default InstrumentProvider;
