import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ZustandReRendering from './example/zustand/ZustandReRendering';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/zustandTest'} element={<ZustandReRendering />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
