/**
 * Unified Text-To-Speech (TTS) Utility for SHOW CARE MYANMAR
 * Fully supports Burmese (my-MM) & English (en-US) text-to-speech
 * using Native SpeechSynthesis with automatic Google Cloud Audio API fallback.
 */

export interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

let activeAudioElement: HTMLAudioElement | null = null;
let currentSpeechUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Clean markdown symbols, HTML tags, and unnecessary special characters for clean TTS reading
 */
export function cleanTextForTTS(text: string): string {
  if (!text) return '';
  return text
    // Remove Markdown headers, bold, italics, code blocks
    .replace(/#{1,6}\s+/g, '')
    .replace(/[*_~`]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // replace markdown links with label
    // Remove bullet points symbols
    .replace(/^[-*+]\s+/gm, '')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Replace multiple spaces or newlines with a single space
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Check if the browser supports TTS
 */
export function isTTSSupported(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Stop any ongoing TTS playback (both native speech and cloud audio player)
 */
export function stopTTS(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (activeAudioElement) {
    activeAudioElement.pause();
    activeAudioElement.currentTime = 0;
    activeAudioElement = null;
  }
  currentSpeechUtterance = null;
}

/**
 * Split long Burmese / English text into logical sentence chunks (< 150 chars) for smooth cloud audio playback
 */
export function chunkTextForSpeech(text: string, maxChunkLength = 150): string[] {
  const cleaned = cleanTextForTTS(text);
  if (!cleaned) return [];

  // Split by Burmese sentence end (॥), Burmese comma (၊), full stop, colon, or newline
  const rawSegments = cleaned.split(/(?<=[॥၊\.\:\n])/g);
  const chunks: string[] = [];
  let currentChunk = '';

  for (const seg of rawSegments) {
    const trimmedSeg = seg.trim();
    if (!trimmedSeg) continue;

    if ((currentChunk + ' ' + trimmedSeg).length <= maxChunkLength) {
      currentChunk = currentChunk ? `${currentChunk} ${trimmedSeg}` : trimmedSeg;
    } else {
      if (currentChunk) chunks.push(currentChunk);
      if (trimmedSeg.length > maxChunkLength) {
        // Force split if a single segment is longer than maxChunkLength
        let start = 0;
        while (start < trimmedSeg.length) {
          chunks.push(trimmedSeg.slice(start, start + maxChunkLength));
          start += maxChunkLength;
        }
        currentChunk = '';
      } else {
        currentChunk = trimmedSeg;
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

/**
 * Play Burmese / English text directly using Google Translate Audio engine in browser
 */
function speakWithCloudAudio(
  text: string,
  lang: 'my' | 'en',
  options: TTSOptions = {}
) {
  stopTTS();

  const chunks = chunkTextForSpeech(text);
  if (chunks.length === 0) {
    options.onEnd?.();
    return;
  }

  options.onStart?.();

  let currentIndex = 0;

  const playNextChunk = () => {
    if (currentIndex >= chunks.length) {
      activeAudioElement = null;
      options.onEnd?.();
      return;
    }

    const chunk = chunks[currentIndex];
    const targetLang = lang === 'my' ? 'my' : 'en';
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk)}&tl=${targetLang}&client=tw-ob`;
    const audio = new Audio(audioUrl);
    activeAudioElement = audio;

    audio.onended = () => {
      currentIndex++;
      playNextChunk();
    };

    audio.onerror = (e) => {
      console.warn('Cloud audio chunk playback error, attempting next chunk:', e);
      currentIndex++;
      if (currentIndex < chunks.length) {
        playNextChunk();
      } else {
        activeAudioElement = null;
        options.onError?.(e);
      }
    };

    audio.play().catch((err) => {
      console.error('Audio play failed:', err);
      activeAudioElement = null;
      options.onError?.(err);
    });
  };

  playNextChunk();
}

/**
 * Speak text aloud in specified language (Burmese or English)
 * Automatically picks native SpeechSynthesis if a valid voice exists, or falls back to Google Cloud TTS in browser.
 */
export function speakText(
  text: string,
  lang: 'my' | 'en' = 'my',
  options: TTSOptions = {}
): void {
  stopTTS();

  const cleanedText = cleanTextForTTS(text);
  if (!cleanedText) return;

  // Check if browser native speech synthesis has a Burmese voice installed
  let hasNativeBurmeseVoice = false;
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices();
    hasNativeBurmeseVoice = voices.some(
      (v) =>
        v.lang.startsWith('my') ||
        v.lang.toLowerCase().includes('burmese') ||
        v.lang.includes('MM')
    );
  }

  // If language is Burmese and NO native Burmese voice is installed on device, use Cloud TTS directly!
  if (lang === 'my' && !hasNativeBurmeseVoice) {
    speakWithCloudAudio(cleanedText, 'my', options);
    return;
  }

  // Use Native SpeechSynthesis if available
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    currentSpeechUtterance = utterance;
    utterance.rate = options.rate ?? 0.85;
    utterance.pitch = options.pitch ?? 1.0;
    utterance.volume = options.volume ?? 1.0;
    utterance.lang = lang === 'my' ? 'my-MM' : 'en-US';

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      if (lang === 'my') {
        const myVoice = voices.find(
          (v) =>
            v.lang.startsWith('my') ||
            v.lang.toLowerCase().includes('burmese') ||
            v.lang.includes('MM')
        );
        if (myVoice) utterance.voice = myVoice;
      } else {
        const enVoice = voices.find((v) => v.lang.startsWith('en'));
        if (enVoice) utterance.voice = enVoice;
      }
    }

    if (options.onStart) utterance.onstart = options.onStart;
    utterance.onend = () => {
      currentSpeechUtterance = null;
      options.onEnd?.();
    };
    utterance.onerror = (err) => {
      currentSpeechUtterance = null;
      // Fallback to Cloud Audio on native error
      console.warn('Native speech error, falling back to Cloud Audio TTS:', err);
      speakWithCloudAudio(cleanedText, lang, options);
    };

    window.speechSynthesis.speak(utterance);
  } else {
    // Browser does not support SpeechSynthesis at all -> use Cloud Audio
    speakWithCloudAudio(cleanedText, lang, options);
  }
}
