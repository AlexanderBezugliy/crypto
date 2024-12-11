import React from 'react';
import { CryptoContextProvider } from './context/crypto-context';
import AppLayout from './components/layout/AppLayout';

//npm run dev    <---  запуск

const App = () => {

  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  )
}

export default App;