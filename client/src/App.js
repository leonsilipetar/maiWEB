import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Naslovna from './components/Naslovna/Naslovna';
import AdminSignIn from './components/AdminPrijava/AdminPrijava';
import LoadingOverlay from './assets/LoadingOverlay.js';
import AdminDashboard from './AdminDashboard/Admin.js';
import Mentori from '../src/components/Mentori/Mentori.js';
import ApiConfig from './assets/ApiConfig.js';
import MentorDetails from './components/Mentori/Mentor.js';
import Programi from '../src/components/Programi/Programi.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [mentori, setMentori] = useState([]);
  const [kategorije, setKategorije] = useState([]);

  const fetchMentori = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${ApiConfig.baseUrl}/api/mentori`);
      const data = await response.json();
      setMentori(data);
    } catch (error) {
      console.error("Failed to fetch mentors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchKategorije = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${ApiConfig.baseUrl}/api/kategorije`);
      const data = await response.json();
      setKategorije(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchMentori();
    fetchKategorije();
  }, []);
  return (
    <>
    <div>
      {isLoading && <LoadingOverlay />}
      <Header mentori={mentori} kategorije={kategorije} />
      <Routes>
      <Route path="/*" element={<Naslovna mentori={mentori} kategorije={kategorije}/>} />
      <Route path="/mentori/*" element={<Mentori mentori={mentori} kategorije={kategorije}/>} />
      <Route path="/mentori/:mentorId" element={<MentorDetails mentori={mentori} kategorije={kategorije}/>} />
      <Route path="/kategorije/:kategorijaId" element={<Programi mantori={mentori} kategorije={kategorije}/>} />
      <Route path="/login" element={<AdminSignIn />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
    <Footer ></Footer>
    </div>
    </>
  );
}

export default App;
