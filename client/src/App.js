import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Naslovna from './components/Naslovna/Naslovna';
import AdminSignIn from './components/AdminPrijava/AdminPrijava';
import LoadingOverlay from './assets/LoadingOverlay.js';
import AdminDashboard from './AdminDashboard/Admin.js';
import Mentori from '../src/components/Mentori/Mentori.js';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
    <div>
      {isLoading && <LoadingOverlay />}
      <Routes>
      <Route path="/*" element={<Naslovna />} />
      <Route path="/mentori/*" element={<Mentori/>} />
      <Route path="/login" element={<AdminSignIn />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
    </div>
    </>
  );
}

export default App;
