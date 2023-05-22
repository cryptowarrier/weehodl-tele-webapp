import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Wallets from './components/Wallets';


const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
  })
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/wallets' element={<Wallets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
