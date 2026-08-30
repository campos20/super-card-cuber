// Fetch competitor info by wcaId from the WCA API
export const fetchCompetitorInfo = async (wcaId: string) => {
  const response = await fetch(
    `https://www.worldcubeassociation.org/api/v0/persons/${wcaId}`,
  );
  return response.json();
};
