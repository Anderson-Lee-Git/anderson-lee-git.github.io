import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';
import Navigation from './components/Navigation';
import About from './pages/About';
import Blog from './pages/Blog';
import Publications from './pages/Publications';
import Experience from './pages/Experience';
import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navigation />
        <main style={{ marginTop: '60px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="*" element={<Navigate to="/about" replace />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
