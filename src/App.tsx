import { useEffect, useState } from "react";
import { isValidWcaId } from "./lib/wca.util";
import { fetchCompetitorInfo } from "./lib/wca.api";
import type { CompetitorInfoDto } from "./lib/dto";
import { Card } from "./components/Card";

export const App = () => {
  const [competitorId, setCompetitorId] = useState("2015CAMP17");
  const [competitorInfo, setCompetitorInfo] =
    useState<CompetitorInfoDto | null>(null);

  useEffect(() => {
    const isValid = isValidWcaId(competitorId);
    console.log(`Is the competitor ID valid? ${isValid}`);

    if (isValid) {
      fetchCompetitorInfo(competitorId).then((data) => {
        setCompetitorInfo(data);
      });
    }
  }, [competitorId]);

  return (
    <div>
      <h1>Super Card Cuber</h1>
      <input
        placeholder="Enter the ID of a competitor"
        value={competitorId}
        onChange={(e) => setCompetitorId(e.target.value)}
      />
      {!!competitorInfo && <Card competitor={competitorInfo} />}
    </div>
  );
};
