export function sanitizeText(input: string) {
  // Replace U+FFFD replacement characters with a regular space so paragraphs stay readable.
  return input.replace(/\uFFFD+/g, ' ');
}
