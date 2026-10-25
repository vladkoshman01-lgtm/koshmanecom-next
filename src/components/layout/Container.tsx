import React from 'react';

/**
 * Контейнер контенту: максимум 1440px, бокові падінги 86px на десктопі
 * і 20px на мобільному — як у макеті.
 */
export default function Container({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag className={`mx-auto w-full max-w-[90rem] px-5 md:px-[5.375rem] ${className}`}>
      {children}
    </Tag>
  );
}
