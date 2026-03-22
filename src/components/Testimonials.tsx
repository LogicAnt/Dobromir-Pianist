import React, { useRef, useEffect } from 'react';
import { IoIosMusicalNote } from 'react-icons/io';
import './Testimonials.css';
import { useReveal } from '../hooks/useReveal';
 
interface Testimonial {
  text: string;
  author: string;
}
 
const TESTIMONIALS: Testimonial[] = [
  {
    text: 'The attention to detail is paramount and the pitfalls are all too obvious but they present no problem for Tsenov, for whom the music is demonstrably in his blood; thus we are treated to a truly great set of interpretations which fully comply with the huge demands on the pianist to accurately reflect all the nuances within this brilliant music.',
    author: 'Steve Arloff',
  },
  {
    text: "Pianist Dobromir Tsenov imbues each and every selection with idiomatic perception, striking a natural balance between vocally informed and percussive phrases, and perfectly capturing the music's divergent moods. The pianist's extensive and scholarly notes further demonstrate his deep commitment to this repertoire.",
    author: 'Jed Distler',
  },
  {
    text: "The Bulgarian pianist Dobromir Tsenov is an impressive young performer with a very fine technique and pronounced rhythmic skills. These pieces would be quite a challenge, even if the rhythms are part of one's national heritage. Tsenov's commitment, stylish playing and clarity of execution are outstanding.",
    author: 'Geoff Pearce',
  },
];
 
function TestimonialCard({ testimonial }: { testimonial: Testimonial }): React.JSX.Element {
  return (
    <div className="testimonials__item">
      <div className="testimonials__card">
        <p className="testimonials__text">"{testimonial.text}"</p>
        <p className="testimonials__author">— {testimonial.author}</p>
      </div>
      <IoIosMusicalNote className="testimonials__music-divider-icon" />
    </div>
  );
}
 
export default function Testimonials(): React.JSX.Element {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef<boolean>(false);
  const positionRef = useRef<number>(0);
  const headingRef = useReveal<HTMLDivElement>();
  const viewportRef = useReveal<HTMLDivElement>({ threshold: 0.1 });
 
  const items = [...TESTIMONIALS, ...TESTIMONIALS];
 
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
 
    const speed = 0.4;
    let animationId: number;
 
    const animate = (): void => {
      if (!pausedRef.current) {
        positionRef.current -= speed;
        const halfWidth = track.scrollWidth / 2;
        if (Math.abs(positionRef.current) >= halfWidth) {
          positionRef.current = 0;
        }
        track.style.transform = `translateX(${positionRef.current}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };
 
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []); // runs once only — no restart on pause
 
  return (
    <section className="testimonials" id="reviews">
      <div className="testimonials__header reveal" ref={headingRef}>
        <h2 className="section-title">Reviews</h2>
        <div className="underline" />
      </div>
 
      <div
        className="testimonials__viewport reveal"
        ref={viewportRef}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div className="testimonials__fade testimonials__fade--left" />
        <div className="testimonials__track" ref={trackRef}>
          {items.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
        <div className="testimonials__fade testimonials__fade--right" />
      </div>
    </section>
  );
}
 