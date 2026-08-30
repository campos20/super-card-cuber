import { useEffect, useState } from "react";
import { isValidWcaId } from "./lib/wca.util";

export const App = () => {
  const [competitorId, setCompetitorId] = useState("2015CAMP17");

  useEffect(() => {
    const isValid = isValidWcaId(competitorId);
    console.log(`Is the competitor ID valid? ${isValid}`);
  }, [competitorId]);

  return (
    <div>
      <h1>Super Card Cuber</h1>
      <input
        placeholder="Enter the ID of a competitor"
        value={competitorId}
        onChange={(e) => setCompetitorId(e.target.value)}
      />
    </div>
  );
};
