import React, { useState, useEffect, useRef } from 'react';
import "../../App.css";
import logoImage from "../../assets/0001374_MusicArtIncubator-Logo-transparent.png";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

function Header({mentori, kategorije}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    console.log("Kategorije:", kategorije)

    const [isMentorsDropdownOpen, setIsMentorsDropdownOpen] = useState(false);
    const [isProgramsDropdownOpen, setIsProgramsDropdownOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(true);

    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (lastScrollY.current < currentScrollY && currentScrollY > 100) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleMentorsDropdown = () => setIsMentorsDropdownOpen(!isMentorsDropdownOpen);
    const toggleProgramsDropdown = () => setIsProgramsDropdownOpen(!isProgramsDropdownOpen);

    const handleMentorsToggle = (event) => {
        event.stopPropagation();
        toggleMentorsDropdown();
    };

    // Funkcija za sprječavanje propagacije i prebacivanje stanja za Programe
    const handleProgramsToggle = (event) => {
        event.stopPropagation();
        toggleProgramsDropdown();
    };
    return (
        <header className={`site-header ${showHeader ? '' : 'hide-header'}`}>
            <div className='logo'>
                <a href="/">
                    <img src={logoImage} alt="Music School Logo" className="logo-img"/>
                </a>
            </div>
            <div className="burger-menu" onClick={toggleMenu}>☰</div>
            <nav className={isMenuOpen ? "" : "nav-closed"}>
                <ul className='flex-row p'>
                    <li className='p'><a href="/">Naslovna</a></li>
                    <li className='p'><a href="/blog">Blog</a></li>
                    <li className='p'><a href="/about">O Nama</a></li>
                    <li className='p dropdown'>
                        <div className='span'><span><a href="/mentori">Mentori</a></span><span className="dropdown-icon" onClick={handleMentorsToggle}><Icon className='ikonica' icon="solar:alt-arrow-down-linear" /></span>
</div>
                        <ul className={`dropdown-content ${isMentorsDropdownOpen ? "show" : ""}`}>
                        {mentori && mentori.map((mentor) => (
                            <Link key={mentor._id} to={`/mentori/${mentor._id}`} className="mentor-link">
                                <li>
                                <div className='a'>{mentor.ime} {mentor.prezime}</div>
                                </li>
                            </Link>
                            ))}
                        </ul>
                    </li>
                    <li className='p dropdown' onClick={toggleProgramsDropdown}>
                        <div className='span'><span><a>Programi</a></span><span className="dropdown-icon" onClick={handleProgramsToggle}><Icon className='ikonica' icon="solar:alt-arrow-down-linear" /></span></div>
                        <ul className={`dropdown-content ${isProgramsDropdownOpen ? "show" : ""}`}>
                        {kategorije && kategorije.map((kat) => (
                            <Link key={kat._id} to={`/kategorije/${kat._id}`} className="mentor-link">
                                <li>
                                <div className='a'>{kat.naziv}</div>
                                </li>
                            </Link>
                            ))}
                        </ul>
                    </li>
                    <li className='p'><a href="/terms">Opći uvjeti</a></li>
                    <li className='p login'><a href="/login">prijava</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
