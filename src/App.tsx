import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Performances from './components/Performances';
import Recordings from './components/Recordings';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App(): React.JSX.Element {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Performances />
      <Recordings />
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollToTop/>
    </div>
  );
}

export default App;
