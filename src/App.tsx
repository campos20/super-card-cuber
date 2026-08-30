import { useEffect, useState } from "react";
import { isValidWcaId } from "./lib/wca.util";
import { fetchCompetitorInfo } from "./lib/wca.api";
import type { CompetitorInfoDto } from "./lib/dto";
import { Card } from "./components/Card";
import "./App.css";

interface FetchResult {
  competitorId: string;
  status: "loaded" | "error";
  data?: CompetitorInfoDto;
}

export const App = () => {
  const [competitorId, setCompetitorId] = useState("2015CAMP17");
  const [result, setResult] = useState<FetchResult | null>(null);

  const isValid = isValidWcaId(competitorId);

  useEffect(() => {
    if (!isValid) return;

    let cancelled = false;

    fetchCompetitorInfo(competitorId)
      .then((data) => {
        if (cancelled) return;
        setResult({ competitorId, status: "loaded", data });
      })
      .catch(() => {
        if (cancelled) return;
        setResult({ competitorId, status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [competitorId, isValid]);

  const isStale = result?.competitorId !== competitorId;
  const status = !isValid
    ? competitorId
      ? "invalid"
      : "idle"
    : isStale
      ? "loading"
      : result.status;

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Super Card Cuber</h1>
        <p className="app__subtitle">
          Turn any WCA competitor into a trading card
        </p>
      </header>

      <input
        className="app__input"
        placeholder="Enter a WCA ID, e.g. 2015CAMP17"
        maxLength={10}
        value={competitorId}
        onChange={(e) => setCompetitorId(e.target.value.toUpperCase())}
      />

      <div className="app__result">
        {status === "loading" && (
          <div className="app__spinner" role="status" aria-label="Loading" />
        )}
        {status === "invalid" && (
          <p className="app__message">
            Enter a valid WCA ID, e.g. 2015CAMP17.
          </p>
        )}
        {status === "error" && (
          <p className="app__message app__message--error">
            Couldn't find that competitor. Double-check the ID.
          </p>
        )}
        {status === "loaded" && result?.data && (
          <Card competitor={result.data} />
        )}
      </div>
    </div>
  );
};
