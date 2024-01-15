import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ZustandReRendering from './example/zustand/ZustandReRendering';
import Provider from './example/dnd/Provider';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/zustandTest'} element={<ZustandReRendering />} />
        <Route path={'/provider'} element={<Provider />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
