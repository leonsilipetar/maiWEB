import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeroSection from '../HeroSection/HeroSection';
import { Icon } from '@iconify/react';

function Naslovna() {
    const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 3) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
    return (
        <div className="home-page">
            <Header />
            <HeroSection />
            {showTopBtn && <button onClick={scrollToTop} id="backToTopBtn"><Icon icon="solar:double-alt-arrow-up-linear" /></button>}
            <Footer />
        </div>
    );
}

export default Naslovna;
