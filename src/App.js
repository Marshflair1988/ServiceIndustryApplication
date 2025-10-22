import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
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
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

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
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <>
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
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <SignIn isOpen={showSignIn} onClose={closeModals} />
          <Register isOpen={showRegister} onClose={closeModals} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
