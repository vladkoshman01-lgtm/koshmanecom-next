import type React from 'react';

/** <koshman-compass> — веб-компонент із public/vendor/koshman-compass.js */
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'koshman-compass': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          theme?: 'light' | 'dark';
          accent?: string;
          speed?: string;
          labels?: string;
        },
        HTMLElement
      >;
    }
  }
}
