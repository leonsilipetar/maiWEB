import React from 'react';
// Možete dodati CSS datoteku ako je potrebno
// import './Footer.css';

function Footer() {
    return (
        <>
        <footer className="site-footer">
            <div className='info-footer'>
                <h2>Naša lokacija</h2>
                <p>Ivana Gundulića 5a, 3. kat</p>
                <p><a href="mailto:musicartincubator@gmail.com">musicartincubator@gmail.com</a></p>
                <p><a href='tel:+385 (098) 58-98-70'>+385 (098) 58-98-70</a></p>
            </div>
            <div className='info-footer'>
                <h2>Informacije</h2>
                <p><a href='/kontakti'>Kontaktirajte nas</a></p>
                <p><a href='/opciuvjeti'>Opći uvjeti</a></p>
            </div>
            <div className='info-footer'>
                <h2>Društvene mreže</h2>
                <p><a>Instagram</a></p>
                <p><a>Facebook</a></p>
            </div>
        </footer>
        <p className='footer-p'>Autorska prava &copy;{new Date().getFullYear()} Music Art Incubator | Modern Art School | Sva prava pridržana.</p>
        </>
    );
}

export default Footer;
