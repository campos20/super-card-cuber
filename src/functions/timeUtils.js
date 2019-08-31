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

const timeConverter = function(result, event) {
  if (event === "333fm") {
    return result;
  }

  // TODO fix this
  if (event === "333mbf") {
    return result;
  }

  return mills2time(result);
};

export default timeConverter;
