export const parseTime = (s: number) => {
  let sec = 0;
  let min = 0;
  sec = s % 60;
  min = parseInt((s / 60).toString());
  return min + 'm' + sec + 's';
};
