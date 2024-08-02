import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoanApplication from './pages/LoanApplication';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from '@mui/material';
import nwlogo from './nwlogo.png';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Container style={{ minHeight: 'calc(100vh - 64px - 48px)', padding: '16px' }}>
          <Routes>
            <Route path="/" element={<LoanApplication />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;