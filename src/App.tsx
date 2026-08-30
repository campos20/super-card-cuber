import { useEffect, useRef, useState } from "react";
import { isValidWcaId } from "./lib/wca.util";
import { fetchCompetitorInfo } from "./lib/wca.api";
import type { CompetitorInfoDto } from "./lib/dto";
import type { StatId } from "./lib/stats";
import {
  BUILTIN_TEMPLATES,
  createTemplateId,
  loadCustomTemplates,
  saveCustomTemplates,
  type Layout,
  type Template,
} from "./lib/templates";
import { wcaEvents } from "./lib/wca.events";
import { Card } from "./components/Card";
import { CardActions } from "./components/CardActions";
import { CustomizePanel } from "./components/CustomizePanel";
import { TemplatePicker } from "./components/TemplatePicker";
import "./App.css";

interface FetchResult {
  competitorId: string;
  status: "loaded" | "error";
  data?: CompetitorInfoDto;
}

// Show only the 3x3x3 Cube event until the user picks more.
const DEFAULT_HIDDEN_EVENTS = new Set(
  wcaEvents.filter((event) => event.id !== "333").map((event) => event.id),
);

export const App = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [competitorId, setCompetitorId] = useState("");
  const [result, setResult] = useState<FetchResult | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [hiddenStats, setHiddenStats] = useState<ReadonlySet<StatId>>(
    new Set(),
  );
  const [hiddenEvents, setHiddenEvents] = useState<ReadonlySet<string>>(
    () => DEFAULT_HIDDEN_EVENTS,
  );
  const [showIcons, setShowIcons] = useState(true);
  const [layout, setLayout] = useState<Layout>("classic");
  const [activeTemplateId, setActiveTemplateId] = useState("classic");
  const [customTemplates, setCustomTemplates] = useState<Template[]>(() =>
    loadCustomTemplates(),
  );

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

  const loadedCompetitor = status === "loaded" ? result?.data : undefined;
  const availableEvents = loadedCompetitor
    ? wcaEvents.filter((event) => loadedCompetitor.personal_records[event.id])
    : [];

  const toggleStat = (id: StatId) => {
    setHiddenStats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleEvent = (id: string) => {
    setHiddenEvents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const templates = [...BUILTIN_TEMPLATES, ...customTemplates];

  const applyTemplate = (template: Template) => {
    setLayout(template.layout);
    if (template.builtin) {
      setHiddenStats(new Set());
      setHiddenEvents(new Set());
      setShowIcons(true);
    } else {
      setHiddenStats(new Set(template.hiddenStats));
      setHiddenEvents(new Set(template.hiddenEvents));
      setShowIcons(template.showIcons);
    }
    setActiveTemplateId(template.id);
  };

  const createTemplate = (name: string) => {
    const template: Template = {
      id: createTemplateId(),
      name,
      layout,
      builtin: false,
      hiddenStats: Array.from(hiddenStats),
      hiddenEvents: Array.from(hiddenEvents),
      showIcons,
    };
    const next = [...customTemplates, template];
    setCustomTemplates(next);
    saveCustomTemplates(next);
    setActiveTemplateId(template.id);
  };

  const deleteTemplate = (id: string) => {
    const next = customTemplates.filter((template) => template.id !== id);
    setCustomTemplates(next);
    saveCustomTemplates(next);
    if (activeTemplateId === id) setActiveTemplateId("classic");
  };

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

      {status === "loaded" && (
        <TemplatePicker
          templates={templates}
          activeTemplateId={activeTemplateId}
          onSelect={applyTemplate}
          onCreate={createTemplate}
          onDelete={deleteTemplate}
        />
      )}

      {status === "loaded" && (
        <button
          type="button"
          className="app__customize-toggle"
          onClick={() => setIsCustomizing((prev) => !prev)}
        >
          {isCustomizing ? "Hide options ▲" : "Add or remove items ▼"}
        </button>
      )}

      {status === "loaded" && isCustomizing && (
        <CustomizePanel
          hiddenStats={hiddenStats}
          onToggleStat={toggleStat}
          events={availableEvents}
          hiddenEvents={hiddenEvents}
          onToggleEvent={toggleEvent}
          onShowAllEvents={() => setHiddenEvents(new Set())}
          onHideAllEvents={() =>
            setHiddenEvents(new Set(availableEvents.map((event) => event.id)))
          }
          showIcons={showIcons}
          onToggleIcons={() => setShowIcons((prev) => !prev)}
        />
      )}

      <div className="app__result">
        {status === "loading" && (
          <div className="app__spinner" role="status" aria-label="Loading" />
        )}
        {status === "invalid" && (
          <p className="app__message">Enter a valid WCA ID, e.g. 2015CAMP17.</p>
        )}
        {status === "error" && (
          <p className="app__message app__message--error">
            Couldn't find that competitor. Double-check the ID.
          </p>
        )}
        {loadedCompetitor && (
          <>
            <Card
              ref={cardRef}
              competitor={loadedCompetitor}
              hiddenStats={hiddenStats}
              hiddenEvents={hiddenEvents}
              showIcons={showIcons}
              layout={layout}
            />
            <CardActions
              cardRef={cardRef}
              fileName={`${loadedCompetitor.person.wca_id}-card.png`}
            />
          </>
        )}
      </div>
    </div>
  );
};
