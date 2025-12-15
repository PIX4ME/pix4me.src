/*
 * Copyright (c) 2025–present
 * PIX4ME Authors
 *
 * All rights reserved.
*/

function crc16(p) {
  let c = 0xffff;
  for (let i = 0; i < p.length; i++) {
    c ^= p.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      c = c & 0x8000 ? (c << 1) ^ 0x1021 : c << 1;
      c &= 0xffff;
    }
  }
  return c.toString(16).toUpperCase().padStart(4, "0");
}

const f = (i, v) => i + v.length.toString().padStart(2, "0") + v;

function makePix(key, name, city, amount) {
  const k = normalizePixKey(key);
  const n = sanitize(name).slice(0, 25);
  const c = sanitize(city).slice(0, 15);
  const a = amount && Number(amount) > 0 ? (+amount).toFixed(2) : null;

  let p = "000201";
  p += f("26", f("00", "BR.GOV.BCB.PIX") + f("01", k));
  p += "52040000";
  p += "5303986";

  if (a) p += f("54", a);

  p += "5802BR";
  p += f("59", n);
  p += f("60", c);
  p += "62070503***";
  p += "6304";

  return p + crc16(p);
}