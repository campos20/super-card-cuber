let zfill = function(number, zeroes) {
  let length = ("" + number).length;
  let result = "";
  for (var i = 0; i < zeroes - length; i++) {
    result += "0";
  }
  return result + number;
};

const mills2time = function(mills) {
  let time = Number(mills);
  if (time === -1) {
    return "DNF";
  }

  let sec = time / 100;
  time %= 100;

  let min = sec / 60;
  sec %= 60;

  let hour = min / 60;
  min %= 60;

  return sec; // + zfill(time, 2);
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
