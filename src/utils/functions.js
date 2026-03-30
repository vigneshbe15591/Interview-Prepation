export function findMinMax(arr) {
  return { min: Math.min(...arr), max: Math.max(...arr) };
}
export function findRepeatedWords(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g);
  const map = {};
  words.forEach((w) => (map[w] = (map[w] || 0) + 1));
  return Object.entries(map)
    .filter(([, c]) => c > 1)
    .map(([w, c]) => `${w} (${c}×)`);
}
export function encodeString(str) {
  const words = str.split(" "),
    map = {},
    encoded = [];
  let idx = 1;
  words.forEach((w) => {
    if (!map[w]) map[w] = idx++;
    encoded.push(map[w]);
  });
  return { encoded: encoded.join(" "), map };
}
export function decodeString(encodedStr, map) {
  const rev = {};
  for (let k in map) rev[map[k]] = k;
  return encodedStr
    .split(" ")
    .map((n) => rev[n])
    .join(" ");
}
