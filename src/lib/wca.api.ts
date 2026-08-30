import type { CompetitorInfoDto } from "./dto";

// Fetch competitor info by wcaId from the WCA API
export const fetchCompetitorInfo = async (
  wcaId: string,
): Promise<CompetitorInfoDto> => {
  const response = await fetch(
    `https://www.worldcubeassociation.org/api/v0/persons/${wcaId}`,
  );

  if (!response.ok) {
    throw new Error(`Competitor ${wcaId} not found`);
  }

  return response.json();
};
