import React from 'react';
import './Footer.css';

interface NavLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Concerts', href: '#performances' },
  { label: 'Recordings', href: '#recordings' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks: SocialLink[] = [
  { label: 'Spotify', href: 'https://open.spotify.com/artist/4Ah3rE2VcUyH39Y9tdgz1u?si=Xvh0EPJjRRCUL3x0U6rzmQ' },
  { label: 'Apple Music', href: 'https://music.apple.com/gb/album/bulgarian-classics/1459958586' },
  { label: 'Facebook', href: 'https://www.facebook.com/dobromirtsenovpianist/' },
  { label: 'YouTube', href: 'https://www.youtube.com/user/cazq100' },
];

export default function Footer(): React.JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__name">Dobromir Tsenov</p>

        <nav className="footer__nav">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="footer__nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="footer__social">
          {socialLinks.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="footer__social-link">
              {s.label}
            </a>
          ))}
        </div>

        <p className="footer__copy">
          ©2026 Dobromir Tsenov. Photography by Hwan Hee Kim.
        </p>
      </div>
    </footer>
  );
}
