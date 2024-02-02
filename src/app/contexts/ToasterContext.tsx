'use client';

import { Toaster } from 'react-hot-toast';

const ToasterContext = () => {
  return (
    <Toaster
      toastOptions={{
        iconTheme: {
          primary: '#C47BFD',
          secondary: 'black',
        },
        style: {
          backgroundColor: '#231C24',
          color: 'white',
        },
      }}
    />
  );
};

export default ToasterContext;
