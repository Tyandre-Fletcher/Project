import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Header from './components/Header';
import { AuthProvider } from './components/auth/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;