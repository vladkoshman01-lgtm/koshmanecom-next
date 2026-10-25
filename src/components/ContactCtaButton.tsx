'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useContactModal } from './ContactModalProvider';

type ContactCtaButtonProps = {
  label: string;
  className: string;
  showArrow?: boolean;
};

const ContactCtaButton: React.FC<ContactCtaButtonProps> = ({
  label,
  className,
  showArrow = true,
}) => {
  const { openModal } = useContactModal();

  return (
    <button onClick={openModal} className={className} type="button">
      {label}
      {showArrow ? <ArrowRight className="h-4 w-4" /> : null}
    </button>
  );
};

export default ContactCtaButton;
