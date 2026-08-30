import type { StatId } from "./stats";

export type Layout = "classic" | "compact" | "poster";

export interface Template {
  id: string;
  name: string;
  layout: Layout;
  builtin: boolean;
  hiddenStats: StatId[];
  hiddenEvents: string[];
  showIcons: boolean;
}

// Built-in templates are pure layout presets: picking one always resets the
// card to fully visible content in that layout.
export const BUILTIN_TEMPLATES: Template[] = [
  {
    id: "classic",
    name: "Classic",
    layout: "classic",
    builtin: true,
    hiddenStats: [],
    hiddenEvents: [],
    showIcons: true,
  },
  {
    id: "compact",
    name: "Compact",
    layout: "compact",
    builtin: true,
    hiddenStats: [],
    hiddenEvents: [],
    showIcons: true,
  },
  {
    id: "poster",
    name: "Poster",
    layout: "poster",
    builtin: true,
    hiddenStats: [],
    hiddenEvents: [],
    showIcons: true,
  },
];

const STORAGE_KEY = "scc-custom-templates";

export const loadCustomTemplates = (): Template[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Template[]) : [];
  } catch {
    return [];
  }
};

export const saveCustomTemplates = (templates: Template[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch {
    // Storage can be unavailable (private mode, quota) — a saved template
    // just won't persist across reloads in that case.
  }
};

export const createTemplateId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};
