export const wcaEvents = [
  {
    id: "333",
    name: "3x3x3 Cube",
    spec: ["single", "average"]
  },
  {
    id: "222",
    name: "2x2x2 Cube",
    spec: ["single", "average"]
  },
  {
    id: "444",
    name: "4x4x4 Cube",
    spec: ["single", "average"]
  },
  {
    id: "555",
    name: "5x5x5 Cube",
    spec: ["single", "average"]
  },
  {
    id: "666",
    name: "6x6x6 Cube",
    spec: ["single", "average"]
  },
  {
    id: "777",
    name: "7x7x7 Cube",
    spec: ["single", "average"]
  },
  {
    id: "333bf",
    name: "3x3x3 Blindfolded",
    spec: ["single", "average"]
  },
  {
    id: "333fm",
    name: "3x3x3 Fewest Moves",
    spec: ["single", "average"]
  },
  {
    id: "333oh",
    name: "3x3x3 One-Handed",
    spec: ["single", "average"]
  },
  {
    id: "333ft",
    name: "3x3x3 With Feet",
    spec: ["single", "average"]
  },
  {
    id: "clock",
    name: "Clock",
    spec: ["single", "average"]
  },
  {
    id: "minx",
    name: "Megaminx",
    spec: ["single", "average"]
  },
  {
    id: "pyram",
    name: "Pyraminx",
    spec: ["single", "average"]
  },
  {
    id: "skewb",
    name: "Skewb",
    spec: ["single", "average"]
  },
  {
    id: "sq1",
    name: "Square-1",
    spec: ["single", "average"]
  },
  {
    id: "444bf",
    name: "4x4x4 Blindfolded",
    spec: ["single", "average"]
  },
  {
    id: "555bf",
    name: "5x5x5 Blindfolded",
    spec: ["single", "average"]
  },
  {
    id: "333mbf",
    name: "3x3x3 Multi-Blind",
    spec: ["single"]
  }
];

export function getName(event) {
  for (var item in wcaEvents) {
    if (wcaEvents[item].id === event) {
      return wcaEvents[item].name;
    }
  }
}

export function isWcaEvent(event) {
  for (var item in wcaEvents) {
    if (wcaEvents[item].id === event) {
      return true;
    }
  }
  return false;
}

export function isValidWcaId(wcaId) {
  return /[0-9]{4}[A-Z]{4}[0-9]{2}/.test(wcaId);
}

export default { wcaEvents, isWcaEvent, getName, isValidWcaId };
