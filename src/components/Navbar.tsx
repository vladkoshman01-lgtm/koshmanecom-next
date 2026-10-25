'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onContactClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Для кого', href: '/#audience' },
    { name: 'Послуги', href: '/services' },
    { name: 'Кейси', href: '/#cases' },
    { name: 'Про нас', href: '/about' },
    { name: 'Як ми працюємо', href: '/#process' },
    { name: 'Відгуки', href: '/#reviews' },
    { name: 'Блог', href: '/blog' },
    { name: 'Інструменти', href: '/tools' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="/logo.png" alt="Koshman Ecom Logo" className="h-8 w-auto" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-brand-orange transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <button
            onClick={() => onContactClick?.()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white text-sm font-bold rounded-full hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
          >
            Залишити заявку
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-slate-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 p-6 flex flex-col space-y-4 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-slate-800 py-2 border-b border-slate-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              onContactClick?.();
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-center py-3 bg-brand-orange text-white font-bold rounded-lg mt-4"
          >
            Залишити заявку
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
