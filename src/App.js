import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Wallets from './components/Wallets';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/wallets' element={<Wallets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
