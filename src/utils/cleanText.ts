/**
 * Utility to strip markdown asterisks (*, **, ***) and clean AI responses for user display.
 */
export function cleanMarkdownText(text: string): string {
  if (!text) return '';
  return text
    // Remove all markdown asterisks (*, **, ***)
    .replace(/\*{1,3}/g, '')
    // Standardize bullet points to clean dots
    .replace(/^[-*+]\s+/gm, '• ')
    .trim();
}
