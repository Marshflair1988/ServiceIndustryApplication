import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import Register from './components/Register';

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowSignIn(false);
  };

  const closeModals = () => {
    setShowSignIn(false);
    setShowRegister(false);
  };

  return (
    <AuthProvider>
      <div className="App">
        <Header
          onSignInClick={handleSignInClick}
          onRegisterClick={handleRegisterClick}
        />
        <Hero
          onSignInClick={handleSignInClick}
          onRegisterClick={handleRegisterClick}
        />
        <Features />
        <About />
        <Services />
        <Testimonials />
        <Footer />

        <SignIn isOpen={showSignIn} onClose={closeModals} />
        <Register isOpen={showRegister} onClose={closeModals} />
      </div>
    </AuthProvider>
  );
}

export default App;
