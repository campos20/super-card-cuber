import { GENERAL_STATS, type StatId } from "../lib/stats";
import type { WcaEvent } from "../lib/wca.events";
import "./CustomizePanel.css";

interface Props {
  hiddenStats: ReadonlySet<StatId>;
  onToggleStat: (id: StatId) => void;
  events: WcaEvent[];
  hiddenEvents: ReadonlySet<string>;
  onToggleEvent: (id: string) => void;
  onShowAllEvents: () => void;
  onHideAllEvents: () => void;
}

export const CustomizePanel = ({
  hiddenStats,
  onToggleStat,
  events,
  hiddenEvents,
  onToggleEvent,
  onShowAllEvents,
  onHideAllEvents,
}: Props) => {
  return (
    <div className="cp">
      <div className="cp__group">
        <span className="cp__label">Stats</span>
        <div className="cp__chip-row">
          {GENERAL_STATS.map((stat) => (
            <button
              key={stat.id}
              type="button"
              className={`cp__chip ${hiddenStats.has(stat.id) ? "" : "cp__chip--active"}`}
              aria-pressed={!hiddenStats.has(stat.id)}
              onClick={() => onToggleStat(stat.id)}
            >
              <span aria-hidden="true">{stat.icon}</span> {stat.label}
            </button>
          ))}
        </div>
      </div>

      {events.length > 0 && (
        <div className="cp__group">
          <div className="cp__label-row">
            <span className="cp__label">Events</span>
            <div className="cp__actions">
              <button type="button" className="cp__link" onClick={onShowAllEvents}>
                All
              </button>
              <button type="button" className="cp__link" onClick={onHideAllEvents}>
                None
              </button>
            </div>
          </div>
          <div className="cp__chip-row">
            {events.map((event) => (
              <button
                key={event.id}
                type="button"
                className={`cp__chip ${hiddenEvents.has(event.id) ? "" : "cp__chip--active"}`}
                aria-pressed={!hiddenEvents.has(event.id)}
                onClick={() => onToggleEvent(event.id)}
              >
                <span aria-hidden="true">{event.icon}</span> {event.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
