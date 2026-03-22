import React from 'react';
import './Hero.css';
import heroImage from '../assets/dob4.jpg';

export default function Hero(): React.JSX.Element {
  return (
    <section className="hero" id="home">
      <div className="hero__image-wrap">
        <img
          src={heroImage}
          alt="Dobromir Tsenov"
          className="hero__image"
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        <p className="hero__subtitle">Pianist &amp; Recording Artist</p>
        <blockquote className="hero__blockquote">
          <p className="hero__quote">
            "Tsenov combines dazzling virtuosity with an ability to draw the listener into this sound world; one cannot fail to be utterly absorbed by this recording, bringing to life and championing this seldom heard music in style."
          </p>
          <cite className="hero__cite">— Daniel Browell, <em>Royal Birmingham Conservatoire</em></cite>
        </blockquote>
        <a href="#about" className="hero__cta">Discover</a>
      </div>
    </section>
  );
}
