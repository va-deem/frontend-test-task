import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import History from './History';
import Main from './Main';
import ErrorPage from './ErrorPage';

function App() {
  return (
    <Router>
      <main className="app-container">
        <NavBar />
        <Routes>
          <Route path="/history" element={<History />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
