export function generateUniqueId(length: number): string {
  if (!length) {
    length = 8;
  }
  var str = '';
  for (var i = 1; i < length + 1; i = i + 8) {
    str += Math.random().toString(36).substr(2, 10);
  }
  return ('_' + str).substr(0, length);
}

export function minMax(a: number, b: number, c: number): number {
  return Math.min(Math.max(a, b), c);
};