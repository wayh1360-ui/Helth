import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Square } from 'lucide-react';
import { speakText, stopTTS, isTTSSupported } from '../../utils/speech';

export interface TTSButtonProps {
  text: string;
  language?: 'en' | 'my';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'subtle' | 'solid' | 'outline' | 'iconOnly';
  className?: string;
  label?: string;
  onStateChange?: (isSpeaking: boolean) => void;
}

export const TTSButton: React.FC<TTSButtonProps> = ({
  text,
  language = 'my',
  size = 'md',
  variant = 'subtle',
  className = '',
  label,
  onStateChange
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const supported = isTTSSupported();

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (isSpeaking) {
        stopTTS();
      }
    };
  }, [isSpeaking]);

  if (!supported) return null;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isSpeaking) {
      stopTTS();
      setIsSpeaking(false);
      onStateChange?.(false);
    } else {
      setIsSpeaking(true);
      onStateChange?.(true);

      speakText(text, language, {
        onEnd: () => {
          setIsSpeaking(false);
          onStateChange?.(false);
        },
        onError: () => {
          setIsSpeaking(false);
          onStateChange?.(false);
        }
      });
    }
  };

  const buttonLabel = label || (language === 'my' 
    ? (isSpeaking ? 'ရပ်မည်' : 'အသံဖြင့် နားထောင်မည်') 
    : (isSpeaking ? 'Stop' : 'Read Aloud'));

  // Base styles depending on variant
  let variantStyles = 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20';
  if (variant === 'solid') {
    variantStyles = 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm';
  } else if (variant === 'outline') {
    variantStyles = 'border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200';
  } else if (variant === 'iconOnly') {
    variantStyles = 'hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-2 rounded-full';
  }

  // Size styles
  let sizeStyles = 'px-3 py-1.5 text-xs rounded-xl';
  let iconSize = 'w-3.5 h-3.5';
  if (size === 'sm') {
    sizeStyles = 'px-2 py-1 text-[11px] rounded-lg';
    iconSize = 'w-3 h-3';
  } else if (size === 'lg') {
    sizeStyles = 'px-4 py-2 text-sm rounded-2xl';
    iconSize = 'w-4 h-4';
  }

  if (variant === 'iconOnly') {
    return (
      <button
        type="button"
        onClick={handleToggle}
        title={buttonLabel}
        className={`transition-all duration-200 cursor-pointer flex items-center justify-center ${variantStyles} ${isSpeaking ? 'ring-2 ring-emerald-500 animate-pulse' : ''} ${className}`}
      >
        {isSpeaking ? (
          <Square className={`${iconSize} fill-current text-red-500`} />
        ) : (
          <Volume2 className={iconSize} />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 font-bold transition-all duration-200 cursor-pointer font-myanmar ${sizeStyles} ${variantStyles} ${
        isSpeaking ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30' : ''
      } ${className}`}
    >
      {isSpeaking ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <Square className={`${iconSize} fill-current`} />
          <span>{language === 'my' ? 'ရပ်မည်' : 'Stop'}</span>
        </>
      ) : (
        <>
          <Volume2 className={`${iconSize} text-emerald-600 dark:text-emerald-400`} />
          <span>{buttonLabel}</span>
        </>
      )}
    </button>
  );
};
