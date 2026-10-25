/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'brand-orange': '#FF5B2B',
        // Шкала виведена з брендового #FF5B2B, щоб стандартні orange-* класи
        // по сайту давали один відтінок, а не дефолтний помаранчевий Tailwind.
        // Ключові значення — з хендоффу: tint #FFF1EB, світлий #FF8A5C,
        // ховер #E64A1C, глибокий #C93E14.
        orange: {
          50: '#FFF1EB',
          100: '#FFE0D3',
          200: '#FFC2A8',
          300: '#FF8A5C',
          400: '#FF7445',
          500: '#FF5B2B',
          600: '#E64A1C',
          700: '#C93E14',
          800: '#A63310',
          900: '#7A250B',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
