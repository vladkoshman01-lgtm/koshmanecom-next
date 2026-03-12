'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [siteOrNiche, setSiteOrNiche] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://us-central1-koshman-ecom-landing-729-54b1a.cloudfunctions.net/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, telegram, siteOrNiche }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Помилка відправки. Будь ласка, спробуйте ще раз.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Помилка відправки. Будь ласка, спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
        setTimeout(() => {
            setName('');
            setPhone('');
            setTelegram('');
            setSiteOrNiche('');
            setIsSubmitted(false);
        }, 300); 
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative max-w-lg w-full">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors">
          <X size={24} />
        </button>
        
        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Дякуємо!</h2>
            <p className="text-slate-600">Ваша заявка успішно відправлена. Ми зв'яжемося з вами найближчим часом.</p>
             <button 
                onClick={onClose}
                className="mt-6 w-full px-8 py-4 bg-brand-orange text-white font-bold rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/30"
              >
                Закрити
              </button>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Заявка на консультацію</h2>
            <p className="text-slate-600 mb-8">Заповніть форму, і ми зв'яжемося з вами найближчим часом.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Ім'я</label>
                <input 
                  type="text" 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-brand-orange focus:border-brand-orange transition"
                  placeholder="Ваше ім'я"
                />
              </div>
              <div>
                <label htmlFor="telegram" className="block text-sm font-medium text-slate-700 mb-2">Telegram</label>
                <input 
                  type="text" 
                  id="telegram" 
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-brand-orange focus:border-brand-orange transition"
                  placeholder="@your_username"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Номер телефону</label>
                <input 
                  type="tel" 
                  id="phone" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-brand-orange focus:border-brand-orange transition"
                  placeholder="+380 XX XXX XX XX"
                />
              </div>
              <div>
                <label htmlFor="siteOrNiche" className="block text-sm font-medium text-slate-700 mb-2">Адреса сайту або ніша</label>
                <input 
                  type="text" 
                  id="siteOrNiche" 
                  value={siteOrNiche}
                  onChange={(e) => setSiteOrNiche(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-brand-orange focus:border-brand-orange transition"
                  placeholder="example.com або 'Продаж свічок'"
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full mt-6 px-8 py-4 bg-brand-orange text-white font-bold rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/30 disabled:bg-slate-400 disabled:shadow-none"
              >
                {isSubmitting ? 'Відправка...' : 'Отримати консультацію'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
