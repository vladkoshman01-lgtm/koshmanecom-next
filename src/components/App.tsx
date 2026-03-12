'use client';

import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import TargetAudience from './TargetAudience';
import About from './About';
import Process from './Process';
import Services from './Services';
import Cases from './Cases';
import Reviews from './Reviews';
import Contact from './Contact';
import Footer from './Footer';
import ContactModal from './ContactModal';
import SeoGenie from './SeoGenie';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen font-sans text-slate-800 selection:bg-orange-100 selection:text-orange-900">
      <Navbar onContactClick={openModal} />
      <main>
        <Hero onContactClick={openModal} />
        <TargetAudience />
        <About />
        <Process />
        <Services />
        <Cases />
        <Reviews />
        <Contact />
        <SeoGenie />
      </main>
      <Footer />
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
