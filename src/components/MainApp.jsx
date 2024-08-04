import React, { useEffect, useState } from 'react';
import styles from '../styles/MainApp.module.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// import components and pages
import Navbar from './Navbar';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Basket from '../pages/Basket';
import Likes from '../pages/Likes';
import DreamTeam from '../pages/DreamTeam';
import MyDreamTeam from '../pages/MyDreamTeam';

export default function MainApp() {
  const [user, setUser] = useState(null);

  // Login
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className={styles.MainApp}>
      <BrowserRouter>
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/"
            element={user ? <Home user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-players"
            element={user ? <Likes user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-basket"
            element={user ? <Basket user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/alldreamTeam"
            element={
              user ? <DreamTeam user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/mydreamTeam"
            element={
              user ? <MyDreamTeam user={user} /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
