/*
 * Copyright (c) 2025–present
 * PIX4ME Authors
 *
 * All rights reserved.
*/

function isValidCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += cpf[i] * (10 - i);
  let d1 = (sum * 10) % 11;
  if (d1 === 10) d1 = 0;
  if (d1 != cpf[9]) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += cpf[i] * (11 - i);
  let d2 = (sum * 10) % 11;
  if (d2 === 10) d2 = 0;

  return d2 == cpf[10];
}

function isValidCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, "");
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;

  const calc = (b, f) => {
    let s = 0;
    for (let i = 0; i < f.length; i++) s += b[i] * f[i];
    let r = s % 11;
    return r < 2 ? 0 : 11 - r;
  };

  return (
    calc(cnpj, [5,4,3,2,9,8,7,6,5,4,3,2]) == cnpj[12] &&
    calc(cnpj, [6,5,4,3,2,9,8,7,6,5,4,3,2]) == cnpj[13]
  );
}