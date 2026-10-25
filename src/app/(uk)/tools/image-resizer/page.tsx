import ImageResizerTool from '@/components/ImageResizerTool';


const faqItems = [
  {
    question: 'Чи зберігаються мої зображення? ',
    answer: 'Ні. Усі зміни виконуються локально у браузері і не зберігаються на сервері.',
  },
  {
    question: 'Які формати підтримуються? ',
    answer: 'Підтримуються JPG, PNG та WebP. Формат виходу можна обрати вручну.',
  },
  {
    question: 'Чи можна зробити кілька форматів одразу?',
    answer: 'Так, використайте “Завантажити всі пресети (ZIP)”.',
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  title: 'Social Media Image Resizer | Koshman Ecom',
  description:
    'Resize images for Instagram, Pinterest, Etsy, TikTok, Facebook, LinkedIn and YouTube. Upload, choose a preset, and download the correct size.',
  alternates: {
    canonical: `${siteUrl}/tools/image-resizer`,
  },
  openGraph: {
    title: 'Social Media Image Resizer | Koshman Ecom',
    description:
      'Resize images for Instagram, Pinterest, Etsy, TikTok, Facebook, LinkedIn and YouTube. Upload, choose a preset, and download the correct size.',
    url: `${siteUrl}/tools/image-resizer`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Social Media Image Resizer',
      },
    ],
  },
};

export default function ImageResizerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <ImageResizerTool />
    </>
  );
}


