import React, { useState, useEffect } from 'react';
import './Navbar.css';
 
import { AiFillSpotify } from "react-icons/ai";
import { AiOutlineSpotify } from "react-icons/ai";
import { IoMusicalNotes } from "react-icons/io5";
import { RiFacebookCircleFill } from "react-icons/ri";
import { RiFacebookCircleLine } from "react-icons/ri";
import { AiFillYoutube } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";
 
interface NavLink {
  label: string;
  href: string;
}
 
interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}
 
const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Concerts', href: '#performances' },
  { label: 'Recordings', href: '#recordings' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];
 
export default function Navbar(): React.JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
 
  const socialLinks: SocialLink[] = [
    {
      label: 'Spotify',
      href: 'https://open.spotify.com/artist/4Ah3rE2VcUyH39Y9tdgz1u?si=Xvh0EPJjRRCUL3x0U6rzmQ',
      icon: scrolled ? <AiFillSpotify size={25} /> : <AiOutlineSpotify size={25} />,
    },
    {
      label: 'Apple Music',
      href: 'https://music.apple.com/gb/album/l-pipkov-complete-piano-music-vol-3-a-pipkov/1863831642',
      icon: (
        <div
          style={{
            backgroundColor: scrolled ? '#4a4540' : 'transparent',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: (!scrolled && !menuOpen) ? 'rgba(255,255,255,0.75)' : '#4a4540',
            borderRadius: '50%',
            width: '22px',
            height: '22px',
          }}
        >
          <IoMusicalNotes size={scrolled ? 15 : 13} color={!scrolled ? '' : 'rgb(250, 249, 247, 0.96)'} style={{ marginBottom: scrolled ? '2.5px' : '3.5px' }} />
        </div>
      ),
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/dobromirtsenovpianist/',
      icon: scrolled ? <RiFacebookCircleFill size={25} /> : <RiFacebookCircleLine size={25} />,
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/user/cazq100',
      icon: scrolled ? <AiFillYoutube size={25} /> : <AiOutlineYoutube size={25} />,
    },
  ];
 
  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 60);
      setMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
 
  return (
    <header className={`navbar${(scrolled || menuOpen) ? ' navbar--scrolled' : ' navbar--transparent'}`}>
      <div className="navbar__social">
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="navbar__social-link"
          >
            {s.icon}
          </a>
        ))}
      </div>
 
      <nav className="navbar__name">
        <a href="#home" className="navbar__logo">Dobromir Tsenov</a>
      </nav>
 
      <button
        className="navbar__burger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
 
      <nav className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
        <button
          className="navbar__close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          &#x2715;
        </button>

        {navLinks.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="navbar__link"
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </a>
        ))}
        
        <div className="navbar__menu-social">
          {socialLinks.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}