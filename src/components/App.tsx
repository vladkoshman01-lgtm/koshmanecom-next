'use client';

import React from 'react';
import Hero from './Hero';
import TargetAudience from './TargetAudience';
import About from './About';
import Process from './Process';
import Services from './Services';
import Cases from './Cases';
import Reviews from './Reviews';
import Contact from './Contact';
import SeoGenie from './SeoGenie';
import { useContactModal } from './ContactModalProvider';

function App() {
  const { openModal } = useContactModal();

  return (
    <div className="min-h-screen font-sans text-slate-800 selection:bg-orange-100 selection:text-orange-900">
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
    </div>
  );
}

export default App;
