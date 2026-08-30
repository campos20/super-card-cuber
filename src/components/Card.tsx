import type { Ref } from "react";
import type { CompetitorInfoDto } from "../lib/dto";
import { flagEmoji } from "../lib/flag.util";
import { GENERAL_STATS, getStatValue, type StatId } from "../lib/stats";
import type { Layout } from "../lib/templates";
import { formatResult } from "../lib/time.util";
import { wcaEvents } from "../lib/wca.events";
import "./Card.css";

interface Props {
  competitor: CompetitorInfoDto;
  hiddenStats?: ReadonlySet<StatId>;
  hiddenEvents?: ReadonlySet<string>;
  showIcons?: boolean;
  layout?: Layout;
  ref?: Ref<HTMLDivElement>;
}

type Tier = "bronze" | "silver" | "gold" | "legendary";

const TIER_LABEL: Record<Tier, string> = {
  bronze: "Rookie Cuber",
  silver: "Skilled Cuber",
  gold: "Elite Cuber",
  legendary: "Legendary Cuber",
};

// Tiers set the card's rarity look and feel, driven by total medal count.
const getTier = (totalMedals: number): Tier => {
  if (totalMedals >= 50) return "legendary";
  if (totalMedals >= 20) return "gold";
  if (totalMedals >= 5) return "silver";
  return "bronze";
};

export const Card = ({
  competitor,
  hiddenStats = new Set(),
  hiddenEvents = new Set(),
  showIcons = true,
  layout = "classic",
  ref,
}: Props) => {
  const { person, medals, records } = competitor;
  const tier = getTier(medals.total);

  const visibleStats = GENERAL_STATS.filter(
    (stat) => !hiddenStats.has(stat.id),
  );

  const events = wcaEvents.filter(
    (event) =>
      competitor.personal_records[event.id] && !hiddenEvents.has(event.id),
  );

  return (
    <div
      ref={ref}
      className={`sc-card sc-card--${tier} sc-card--layout-${layout}`}
    >
      <div className="sc-card__inner">
        <header className="sc-card__header">
          <span className="sc-card__tier">{TIER_LABEL[tier]}</span>
          <span className="sc-card__wca-id">{person.wca_id}</span>
        </header>

        <div className="sc-card__identity">
          <div className="sc-card__portrait">
            <img
              className="sc-card__avatar"
              src={person.avatar.url}
              alt={`${person.name}'s avatar`}
            />
            <span className="sc-card__flag" title={person.country.name}>
              {flagEmoji(person.country_iso2)}
            </span>
          </div>

          <div className="sc-card__name-plate">
            <h2 className="sc-card__name">{person.name}</h2>
            <p className="sc-card__location">{person.location}</p>
          </div>
        </div>

        {visibleStats.length > 0 && (
          <div className="sc-card__stats">
            {visibleStats.map((stat) => (
              <Stat
                key={stat.id}
                icon={showIcons ? stat.icon : undefined}
                label={stat.label}
                value={getStatValue(competitor, stat.id)}
                title={
                  stat.id === "records"
                    ? `National ${records.national} · Continental ${records.continental} · World ${records.world}`
                    : undefined
                }
              />
            ))}
          </div>
        )}

        {events.length > 0 && (
          <div className="sc-card__events">
            <div className="sc-card__events-header">
              <span>Event</span>
              <span>Single</span>
              <span>Average</span>
            </div>
            <div className="sc-card__events-list">
              {events.map((event) => {
                const pr = competitor.personal_records[event.id];
                return (
                  <div className="sc-card__event-row" key={event.id}>
                    <span className="sc-card__event-name">
                      {showIcons && (
                        <span
                          className={`cubing-icon event-${event.id} sc-card__event-icon`}
                          aria-hidden="true"
                        />
                      )}
                      {event.name}
                    </span>
                    <span className="sc-card__event-time">
                      {pr.single
                        ? formatResult(pr.single.best, event.id, "single")
                        : "-"}
                    </span>
                    <span className="sc-card__event-time">
                      {pr.average
                        ? formatResult(pr.average.best, event.id, "average")
                        : "-"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface StatProps {
  icon?: string;
  label: string;
  value: number;
  title?: string;
}

const Stat = ({ icon, label, value, title }: StatProps) => (
  <div className="sc-card__stat" title={title}>
    {icon && (
      <span className="sc-card__stat-icon" aria-hidden="true">
        {icon}
      </span>
    )}
    <span className="sc-card__stat-value">{value}</span>
    <span className="sc-card__stat-label">{label}</span>
  </div>
);
