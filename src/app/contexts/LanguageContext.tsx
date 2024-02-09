'use client';

import { NextIntlClientProvider } from 'next-intl';
import en from '../../../messages/en.json';
import pt from '../../../messages/pt.json';

import React, { ReactNode, createContext, useEffect, useState } from 'react';

interface LanguageContextProps {
  translate: any;
  changeLanguage: (value: string) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
  translate: { name: 'en', value: en },
  changeLanguage: (value: string) => {},
});

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [translate, setTranslate] = useState('en');

  useEffect(() => {
    setTranslate(localStorage.getItem('language') ?? 'en');
  }, []);

  const changeLanguage = (value: string) => {
    if (value === 'en') {
      setTranslate('pt');
      localStorage.setItem('language', 'pt');
    } else {
      setTranslate('en');
      localStorage.setItem('language', 'en');
    }
  };

  return (
    <LanguageContext.Provider value={{ translate, changeLanguage }}>
      <NextIntlClientProvider
        messages={translate === 'pt' ? pt : en}
        locale={translate ?? 'en'}
      >
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
