import React, { useState } from 'react';
import { RotateCw, Undo2 } from 'lucide-react';

interface FlipCardProps {
  id?: string;
  className?: string;
  frontContent: (isFlipped: boolean, toggleFlip: (e?: React.MouseEvent) => void) => React.ReactNode;
  backContent: (isFlipped: boolean, toggleFlip: (e?: React.MouseEvent) => void) => React.ReactNode;
  language?: 'en' | 'my';
  flipLabel?: string;
  flipBackLabel?: string;
  minHeightClass?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  id,
  className = '',
  frontContent,
  backContent,
  language = 'en',
  flipLabel,
  flipBackLabel,
  minHeightClass = 'min-h-[260px]',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsFlipped((prev) => !prev);
  };

  const defaultFlipText = flipLabel || (language === 'my' ? 'လှန်ဖတ်ရန်' : 'Tap to Flip');
  const defaultFlipBackText = flipBackLabel || (language === 'my' ? 'ပြန်လှန်ရန်' : 'Flip Back');

  return (
    <div
      id={id}
      className={`flip-card-perspective relative w-full ${minHeightClass} ${className}`}
    >
      <div
        className={`flip-card-inner h-full ${isFlipped ? 'is-flipped' : ''}`}
      >
        {/* Front Face */}
        <div
          className={`flip-card-front h-full flex flex-col justify-between ${
            isFlipped ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        >
          {frontContent(isFlipped, toggleFlip)}
        </div>

        {/* Back Face */}
        <div
          className={`flip-card-back absolute inset-0 h-full flex flex-col justify-between ${
            !isFlipped ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        >
          {backContent(isFlipped, toggleFlip)}
        </div>
      </div>
    </div>
  );
};
