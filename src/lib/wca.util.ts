const regex = /^[0-9]{4}[A-Z]{4}[0-9]{2}$/;

// Validates if a string is a valid WCA ID.
// A valid WCA ID is a string that matches the following pattern:
// - 4 digits (year of first competition)
// - 4 uppercase letters (first 4 letters of the competitor's name)
// - 2 digits (the last two digits of the competitor's ID)
export const isValidWcaId = (id: string): boolean => {
  return regex.test(id);
};
