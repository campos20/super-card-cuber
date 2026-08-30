// Converts a two-letter ISO country code into its flag emoji
// by mapping each letter to a Unicode regional indicator symbol.
export const flagEmoji = (iso2: string): string => {
  return iso2
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(char.charCodeAt(0) + 127397),
    );
};
