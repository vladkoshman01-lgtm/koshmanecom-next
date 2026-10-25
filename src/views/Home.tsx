import React from 'react';
import Hero from '@/components/home/Hero';
import ClientsMarquee from '@/components/home/ClientsMarquee';
import ForWhom from '@/components/home/ForWhom';
import LostSales from '@/components/home/LostSales';
import Services from '@/components/home/Services';
import TelegramStrip from '@/components/home/TelegramStrip';
import Results from '@/components/home/Results';
import Cases from '@/components/home/Cases';
import Reviews from '@/components/home/Reviews';
import LeadForm from '@/components/LeadForm';
import Resources from '@/components/home/Resources';
import BlogTeaser from '@/components/home/BlogTeaser';
import Faq from '@/components/home/Faq';
import FinalCta from '@/components/home/FinalCta';

/**
 * Головна сторінка. Складається з секцій у `src/components/home/`.
 * Під EN/SK тут зʼявиться проп локалі — сторінки `/en`, `/sk` будуть
 * тонкими обгортками над цим компонентом.
 */
export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <ClientsMarquee />
      <ForWhom />
      <LostSales />
      <Services />
      <TelegramStrip />
      <Results />
      <Cases />
      <Reviews />
      <LeadForm theme="dark" />
      <Resources />
      <BlogTeaser />
      <Faq />
      <FinalCta />
    </div>
  );
}
