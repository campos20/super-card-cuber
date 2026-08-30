import type { CompetitorInfoDto } from "./dto";

export type StatId =
  | "competitions"
  | "gold"
  | "silver"
  | "bronze"
  | "records"
  | "solves";

export interface StatDef {
  id: StatId;
  label: string;
  icon: string;
}

// General card stats, in display order. Any of these can be toggled off.
export const GENERAL_STATS: StatDef[] = [
  { id: "competitions", label: "Comps", icon: "🏆" },
  { id: "solves", label: "Solves", icon: "⏱️" },
  { id: "records", label: "Records", icon: "📜" },
  { id: "gold", label: "Gold", icon: "🥇" },
  { id: "silver", label: "Silver", icon: "🥈" },
  { id: "bronze", label: "Bronze", icon: "🥉" },
];

export const getStatValue = (
  competitor: CompetitorInfoDto,
  id: StatId,
): number => {
  switch (id) {
    case "competitions":
      return competitor.competition_count;
    case "gold":
      return competitor.medals.gold;
    case "silver":
      return competitor.medals.silver;
    case "bronze":
      return competitor.medals.bronze;
    case "records":
      return competitor.records.total;
    case "solves":
      return competitor.total_solves;
  }
};
