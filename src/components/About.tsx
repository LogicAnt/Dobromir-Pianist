import React from 'react';
import './About.css';
import portraitImage from '../assets/Dob3.jpg';
import { useReveal } from '../hooks/useReveal';

export default function About(): React.JSX.Element {
  const imageRef = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const textRef = useReveal<HTMLDivElement>({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div className="about__image-col reveal reveal-left" ref={imageRef}>
          <img
            src={portraitImage}
            alt="Dobromir Tsenov"
            className="about__image"
          />
          <blockquote className="about__quote">
            <p>"Tsenov really has the measure of this music."</p>
            <cite>— Ivan Moody, <em>Gramophone</em></cite>
            <span>Ľubomir Pipkov: Complete Piano Music, Volume 1</span>
          </blockquote>
        </div>

        <div className="about__text-col reveal reveal-right" ref={textRef}>
          <h2 className="section-title about__heading">About Dobromir</h2>
          <p className="about__role">Pianist &amp; Recording Artist</p>

          <div className="about__bio">
            <p>
              Dobromir Tsenov is a Bulgarian pianist, researcher, and educator based in Liverpool, UK.
              He is currently in his final year of a PhD in Performance at the Royal Northern College
              of Music (RNCM) in Manchester, where he is researching and recording the complete piano
              works of Ľubomir Pipkov under the supervision of Dr Adam Swayne and Dr Annika Forkert as
              well as Dr Rachel Rimmer-Piekarczyk. His doctoral studies are supported by a fully funded
              RNCM Studentship and the Bulgarian National Culture Fund.
            </p>
            <p>
              In 2024–26, Tsenov performed Pipkov's music extensively across the UK, giving numerous
              first performances of this repertoire outside Bulgaria. His research and performance work
              has been presented at major international conferences in the UK and Europe, including
              events in Helsinki, London, and Birmingham. He is also active as an organiser and advocate
              for artistic research, having founded the RNCM Postgraduate Research Showcase.
            </p>
            <p>
              Alongside his research and performance career, Tsenov is an experienced teacher. He has
              taught piano and musicianship in China, and currently works as a Deputy Teacher at the
              Junior RNCM, combining performance, research, and pedagogy in his professional practice.
            </p>
            <p>
              A prize-winner of national and international competitions, Tsenov graduated with
              Distinction in both the MMus (RNCM) and BMus (Royal Birmingham Conservatoire), where he
              studied with Prof Julian Jacobson and Prof Daniel Browell. His critically acclaimed
              recordings on Toccata Classics have received praise from <em>Gramophone</em>, <em>Fanfare</em>,{' '}
              <em>American Record Guide</em>, <em>MusicWeb International</em>, <em>Classics Today</em>,{' '}
              <em>Classical Music Daily</em>, and have been broadcast internationally.
            </p>
          </div>

          <a
            href="https://www.dobromirtsenov.com/_files/ugd/fb5cce_7f7dc312a6cb4607ad6520b95dd554f2.pdf"
            target="_blank"
            rel="noreferrer"
            className="about__bio-link"
          >
            Full Biography
          </a>
        </div>
      </div>
    </section>
  );
}
