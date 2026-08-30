const zfill = (value: number, length: number): string => {
  return String(value).padStart(length, "0");
};

// Converts a WCA result in centiseconds into a human readable clock time.
const centisecondsToTime = (centiseconds: number): string => {
  if (centiseconds === -1) return "DNF";
  if (centiseconds === -2) return "DNS";

  let time = centiseconds;
  let sec = Math.floor(time / 100);
  time %= 100;

  let min = Math.floor(sec / 60);
  sec %= 60;

  const hour = Math.floor(min / 60);
  min %= 60;

  let out = `${sec}.${zfill(time, 2)}`;

  if (min > 0) {
    out = `${min}:${sec < 10 ? "0" : ""}${out}`;
  }
  if (hour > 0) {
    out = `${hour}:${min < 10 ? "0" : ""}${out}`;
  }

  return out;
};

const secondsToTime = (totalSeconds: number): string => {
  if (totalSeconds === 99999) return "Unknown";

  let seconds = totalSeconds;
  const hour = Math.floor(seconds / 3600);
  seconds -= hour * 3600;

  const min = Math.floor(seconds / 60);
  seconds -= min * 60;

  if (hour > 0) {
    return `${hour}:${zfill(min, 2)}${zfill(seconds, 2)}`;
  }
  return `${min}:${zfill(seconds, 2)}`;
};

// Decodes the packed WCA 3x3x3 Multi-Blind result (DDTTTTTMM) into "solved/attempted [time]".
const decodeMultiBlind = (best: number): string => {
  const raw = zfill(best, 9);
  const dd = Number(raw.slice(0, 2));
  const attemptSeconds = Number(raw.slice(2, 7));
  const missed = Number(raw.slice(7, 9));

  const difference = 99 - dd;
  const solved = difference + missed;
  const attempted = solved + missed;

  return `${solved}/${attempted} [${secondsToTime(attemptSeconds)}]`;
};

/**
 * Formats a WCA "best" value for a given event/type into its human readable form.
 * 333fm single is a move count, 333mbf single is a packed multi-blind result,
 * everything else is stored as centiseconds.
 */
export const formatResult = (
  best: number,
  eventId: string,
  type: "single" | "average",
): string => {
  if (eventId === "333fm" && type === "single") {
    return String(best);
  }

  if (eventId === "333mbf" && type === "single") {
    return decodeMultiBlind(best);
  }

  return centisecondsToTime(best);
};
