'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Reviews: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      company: "Бренд одягу",
      author: "Анна та Поліна",
      image: "/2rev.jpg",
      quote: "Ми працюємо з Koshman Ecom другий місяць. Команда займається всім: SEO, оновленням лістингів, фото, Pinterest та навіть комунікацією з покупцями. Результатом задоволені — трафік і продажі ростуть.",
      metric: "+320% доходу"
    },
    {
      company: "WoodArt Studio",
      author: "Марія Коваль",
      image: "/1rev.jpg",
      quote: "Koshman Ecom зробили нам магазин на Shopify буквально з нуля. Все виглядає чисто, сучасно і дуже зручно. Окремо дякую за терпіння та поради щодо структури каталогу — це реально допомогло розкласти все по поличках.",
      metric: "ROI 450%"
    },
    {
      company: "Home & Pillow",
      author: "Оксана Литвин",
      image: "/3rev.jpg",
      quote: "Koshman Ecom повністю привели мій Etsy-магазин у порядок. Ми продавали подушки ручної роботи, але лістинги були оформлені хаотично, і продажів майже не було. Команда переробила описи, підібрала правильні теги, зробила нові фото та порадила, як краще показувати деталі ручної роботи. Уже через два тижні магазин ожив — з’явилися перегляди, фаворити і перші замовлення. Дуже дякую за професійність і уважність до дрібниць!",
      metric: "TOP Seller"
    }
  ];

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section id="reviews" className="py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Довіра українських брендів</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Реальні історії підприємців, які вийшли на міжнародні ринки разом з нами.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Content Container */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
            
            {/* Image Side */}
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <img 
                src={reviews[activeIndex].image} 
                alt={reviews[activeIndex].company} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold">{reviews[activeIndex].company}</h3>
                <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-lg mt-2 text-sm font-semibold">
                  {reviews[activeIndex].metric}
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative">
              <Quote className="text-orange-100 w-16 h-16 absolute top-8 left-8 -z-0" />
              
              <div className="flex gap-1 mb-6 text-yellow-400 relative z-10">
                {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={20} />)}
              </div>

              <blockquote className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed mb-8 relative z-10">
                "{reviews[activeIndex].quote}"
              </blockquote>

              <div className="mt-auto">
                <div className="font-bold text-slate-900 text-lg">{reviews[activeIndex].author}</div>
                <div className="text-slate-500 text-sm">Owner, {reviews[activeIndex].company}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-800 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-colors shadow-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-800 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-colors shadow-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;