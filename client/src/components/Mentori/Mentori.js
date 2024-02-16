import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Icon } from '@iconify/react';

function Mentori({mentori}) {
  const [showTopBtn, setShowTopBtn] = useState(false);
  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 3) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
/*
    const fetchMentori = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${ApiConfig.baseUrl}/api/mentori`);
        const data = await response.json();
        setMentori(data);
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      }
    };

    fetchMentori();
    setIsLoading(false);
*/
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
  <div className='naslov'>
    <h1>MENTORI</h1>
  </div>
    <div className="mentori">
      <div className="mentors-list">
        {mentori.map((mentor) => (
          <Link key={mentor._id} to={`/mentori/${mentor._id}`} className="mentor-link">
            <div className="mentor">
              <h3>{mentor.ime} {mentor.prezime}</h3>
            </div>
          </Link>
        ))}
      </div>
      {showTopBtn && <button onClick={scrollToTop} id="backToTopBtn"><Icon icon="solar:double-alt-arrow-up-linear" /></button>}
    </div>
    </>
  );
}

export default Mentori;
