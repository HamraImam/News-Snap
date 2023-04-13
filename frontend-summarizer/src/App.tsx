import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import GenericSummarizerPage from './pages/GenericSummarizerPage';
import AspectSummarizerPage from './pages/AspectSummarizerPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/generic-summarizer" element={<GenericSummarizerPage />} />
        <Route path="/aspect-summarizer" element={<AspectSummarizerPage />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;
