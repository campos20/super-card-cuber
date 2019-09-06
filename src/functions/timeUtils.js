let zfill = function(number, zeroes) {
  let length = ("" + number).length;
  let result = "";
  for (var i = 0; i < zeroes - length; i++) {
    result += "0";
  }
  return result + number;
};

const mills2time = function(mills) {
  // We assign "-" for empty values
  if (mills === "-") {
    return mills;
  }

  // Just in case
  let time = Number(mills);
  if (time === -1) {
    return "DNF";
  }

  let sec = Math.floor(time / 100);
  time %= 100;

  let min = Math.floor(sec / 60);
  sec %= 60;

  let hour = Math.floor(min / 60);
  min %= 60;

  let out = sec + "." + zfill(time, 2);

  if (min > 0) {
    if (sec < 10) {
      out = min + ":0" + out;
    } else {
      out = min + ":" + out;
    }
  }

  if (hour > 0) {
    if (min < 10) {
      out = hour + ":0" + out;
    } else {
      out = hour + ":" + out;
    }
  }

  return out;
};

// Currently, for MBLD only
const sec2time = function(TTTTT) {
  if (TTTTT === 99999) {
    return "Unknown";
  }
  let hour = Math.floor(TTTTT / 3600);
  TTTTT -= hour * 3600;

  let min = Math.floor(TTTTT / 60);
  TTTTT -= min * 60;

  let sec = Math.floor(TTTTT);

  if (hour > 0) {
    return hour + ":" + zfill(min, 2) + zfill(sec, 2);
  }

  return min + ":" + zfill(sec, 2);
};

/**
 *
 * @param {*} result
 * @param {*} wcaEvent
 * @param {*} type is either single or average
 * @param {*} spec is best (if PR), national_rank, continent_rank, world_rank
 */
const timeConverter = function(result, wcaEvent, type) {
  if (wcaEvent === "333fm" && type === "single") {
    return result;
  }

  if (wcaEvent === "333mbf" && type === "single") {
    // https://www.worldcubeassociation.org/results/misc/export.html

    result += "";

    let DD = Number(result.substring(0, 2));
    let TTTTT = Number(result.substring(2, 2 + 5));
    let MM = Number(result.substring(7, 7 + 2));

    let difference = 99 - DD;
    let timeInSeconds = sec2time(TTTTT);
    let missed = MM;
    let solved = difference + missed;
    let attempted = solved + missed;
    return solved + "/" + attempted + " [" + timeInSeconds + "]";
  }

  return mills2time(result);
};

export default timeConverter;
