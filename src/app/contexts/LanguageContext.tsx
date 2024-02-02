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
  const [translate, setTranslate] = useState({ name: 'en', value: en });

  useEffect(() => {
    setTranslate(
      JSON.parse(localStorage.getItem('language')) ?? { name: 'en', value: en },
    );
  }, []);

  const changeLanguage = (value: string) => {
    if (value === 'en') {
      setTranslate({ name: 'pt', value: pt });
      localStorage.setItem(
        'language',
        JSON.stringify({ name: 'pt', value: pt }),
      );
    } else {
      setTranslate({ name: 'en', value: en });
      localStorage.setItem(
        'language',
        JSON.stringify({ name: 'en', value: en }),
      );
    }
  };

  return (
    <LanguageContext.Provider value={{ translate, changeLanguage }}>
      <NextIntlClientProvider
        messages={translate.value}
        locale={translate.name}
      >
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
