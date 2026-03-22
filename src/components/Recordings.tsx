import React from 'react';
import './Recordings.css';
import album1 from '../assets/album1.jpg';
import album2 from '../assets/album2.jpg';
import album3 from '../assets/album3.jpg';
import album4 from '../assets/album4.jpg';
import { useReveal } from '../hooks/useReveal';
 
interface Recording {
  title: string;
  label: string;
  href: string;
  image: string;
  featured?: boolean;
}
 
const recordings: Recording[] = [
  {
    title: 'Bulgarian Classics',
    label: 'Spotify',
    href: 'https://open.spotify.com/album/1BShJX3jXt44KTCUx6NuCb?si=PoSXRYywR1mvWFx_OqQyFg',
    image: album1,
  },
  {
    title: 'Ľubomir Pipkov: Complete Piano Music, Volume 1',
    label: 'Toccata Classics',
    href: 'https://toccataclassics.com/product/lubomir-pipkov-complete-piano-music-volume-one/',
    image: album2,
  },
  {
    title: 'Ľubomir Pipkov: Complete Piano Music, Volume 2',
    label: 'Toccata Classics',
    href: 'https://toccataclassics.com/product/lubomir-pipkov-complete-piano-music-volume-two/',
    image: album3,
  },
  {
    title: 'Ľubomir Pipkov: Complete Piano Music, Volume 3',
    label: 'Toccata Classics — Latest Album',
    href: 'https://toccataclassics.com/product/lubomir-pipkov-complete-piano-music-volume-three/',
    image: album4,
    featured: true,
  },
];
 
const revealOptions = { threshold: 0.05, rootMargin: '0px 0px -20px 0px' };
 
export default function Recordings(): React.JSX.Element {
  const headingRef = useReveal<HTMLDivElement>(revealOptions);
  const gridRef = useReveal<HTMLDivElement>(revealOptions);
  const featuredRef = useReveal<HTMLDivElement>(revealOptions);
 
  const featured = recordings.find((r) => r.featured);
  const rest = recordings.filter((r) => !r.featured);
 
  return (
    <section className="recordings" id="recordings">
      <div className="recordings__inner">
        <div className="reveal" ref={headingRef}>
          <h2 className="section-title">Recordings</h2>
          <div className="underline" />
        </div>
 
        <div className="recordings__grid reveal" ref={gridRef}>
          {rest.map((r, i) => (
            <a key={i} href={r.href} target="_blank" rel="noreferrer" className="recordings__card">
              <img
                src={r.image}
                alt={r.title}
                className="recordings__cover"
              />
              <div className="recordings__card-info">
                <p className="recordings__card-title">{r.title}</p>
                <p className="recordings__card-label">{r.label}</p>
              </div>
            </a>
          ))}
        </div>
 
        {featured && (
          <div className="recordings__featured reveal" ref={featuredRef}>
            <a href={featured.href} target="_blank" rel="noreferrer" className="recordings__featured-link">
              <img
                src={featured.image}
                alt={featured.title}
                className="recordings__featured-cover"
              />
            </a>
            <div className="recordings__featured-info">
              <p className="recordings__featured-badge">Latest Album</p>
              <h3 className="recordings__featured-title">{featured.title}</h3>
              <p className="recordings__featured-body">
                With this volume Dobromir Tsenov completes his survey of the solo-piano music of his
                compatriot Ľubomir Pipkov (1904–74), one of the leading members of the 'second
                generation' of Bulgarian composers who helped establish a national tradition of
                classical music, blending western forms with the rhythms of local folksong and
                folk-dances. The first complete recording of the piano music of his father, Panayot
                Pipkov (1871–1942), one of the 'first generation', sets it in context, in its mix of
                folk roots and Lisztian bravura.
              </p>
              <a
                href="https://www.prestomusic.com/classical/products/9837400--lubomir-pipkov-complete-piano-music-vol-3"
                target="_blank"
                rel="noreferrer"
                className="recordings__order-btn"
              >
                Order Now
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}