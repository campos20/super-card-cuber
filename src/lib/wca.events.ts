export interface WcaEvent {
  id: string;
  name: string;
  icon: string;
}

// Official WCA events in their canonical display order.
export const wcaEvents: WcaEvent[] = [
  { id: "333", name: "3x3x3 Cube", icon: "🟩" },
  { id: "222", name: "2x2x2 Cube", icon: "🟦" },
  { id: "444", name: "4x4x4 Cube", icon: "🟨" },
  { id: "555", name: "5x5x5 Cube", icon: "🟧" },
  { id: "666", name: "6x6x6 Cube", icon: "🟥" },
  { id: "777", name: "7x7x7 Cube", icon: "⬛" },
  { id: "333bf", name: "3x3x3 Blindfolded", icon: "🙈" },
  { id: "333fm", name: "3x3x3 Fewest Moves", icon: "🔢" },
  { id: "333oh", name: "3x3x3 One-Handed", icon: "🤚" },
  { id: "333ft", name: "3x3x3 With Feet", icon: "🦶" },
  { id: "clock", name: "Clock", icon: "🕐" },
  { id: "minx", name: "Megaminx", icon: "🔷" },
  { id: "pyram", name: "Pyraminx", icon: "🔺" },
  { id: "skewb", name: "Skewb", icon: "💎" },
  { id: "sq1", name: "Square-1", icon: "🟪" },
  { id: "444bf", name: "4x4x4 Blindfolded", icon: "🙈" },
  { id: "555bf", name: "5x5x5 Blindfolded", icon: "🙈" },
  { id: "333mbf", name: "3x3x3 Multi-Blind", icon: "🙈" },
];
