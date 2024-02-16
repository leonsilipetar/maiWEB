import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Icon } from '@iconify/react';// Make sure to update this path to where your ApiConfig is located
import ApiConfig from '../../assets/ApiConfig';

function Programi() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { kategorijaId } = useParams();
  const [programi, setProgrami] = useState([]);

  useEffect(() => {
    // Handle scroll for the "back to top" button
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > window.innerHeight / 3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
     const fetchProgramiForKategorija = async () => {
       try {
         const response = await fetch(`${ApiConfig.baseUrl}/api/programi?kategorija=${kategorijaId}`);
         const data = await response.json();
         setProgrami(data);
       } catch (error) {
         console.error("Failed to fetch programs for category:", error);
       }
     };
   
     if (kategorijaId) {
       fetchProgramiForKategorija();
     }
   }, [kategorijaId]);
   

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className='naslov'>
        <h1>{programi.length > 0 ? programi[0].kategorijaNaziv : 'Kategorija'} | PROGRAMI</h1>
      </div>
      <div className="mentori">
        <div className="mentors-list">
          {programi.map((program) => (
            <div key={program._id} className="mentor">
              <h3>{program.naziv}</h3>
              <p>{program.cijena}</p>
            </div>
          ))}
        </div>
        {showTopBtn && <button onClick={scrollToTop} id="backToTopBtn"><Icon icon="solar:double-alt-arrow-up-linear" /></button>}
      </div>
    </>
  );
}

export default Programi;
