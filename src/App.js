import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Wallets from './components/Wallets';
import ProjectList from './components/ProjectList';
import Project from './components/Project';


const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
  })
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/wallets' element={<Wallets />} />
        <Route path='/projects' element={<ProjectList />} />
        <Route path='/project' element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
