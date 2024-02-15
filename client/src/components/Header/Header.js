import React, { useState, useEffect, useRef } from 'react';
import "../../App.css";
import logoImage from "../../assets/0001374_MusicArtIncubator-Logo-transparent.png";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <div className='span'><span><a href="/mentori">Mentori</a></span><span className="dropdown-icon" onClick={handleMentorsToggle}>&#9662;</span>
</div>
                        <ul className={`dropdown-content ${isMentorsDropdownOpen ? "show" : ""}`}>
                            <li><a href="/mentor1">Mentor 1</a></li>
                            <li><a href="/mentor2">Mentor 2</a></li>
                            <li><a href="/mentor3">Mentor 3</a></li>
                        </ul>
                    </li>
                    <li className='p dropdown' onClick={toggleProgramsDropdown}>
                        <div className='span'><span><a href="/programs">Programi</a></span><span className="dropdown-icon" onClick={handleProgramsToggle}>&#9662;</span></div>
                        <ul className={`dropdown-content ${isProgramsDropdownOpen ? "show" : ""}`}>
                            <li><a href="/program1">Program 1</a></li>
                            <li><a href="/program2">Program 2</a></li>
                            <li><a href="/program3">Program 3</a></li>
                            <li><a href="/program1">Program 4</a></li>
                            <li><a href="/program2">Program 5</a></li>
                            <li><a href="/program3">Program 6</a></li>
                            <li><a href="/program1">Program 7</a></li>
                            <li><a href="/program2">Program 8</a></li>
                            <li><a href="/program3">Program 9</a></li>
                            <li><a href="/program1">Program 10</a></li>
                            <li><a href="/program2">Program 11</a></li>
                            <li><a href="/program3">Program 12</a></li>
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
