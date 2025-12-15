/*
 * Copyright (c) 2025–present
 * PIX4ME Authors
 *
 * All rights reserved.
*/

function formatPixKey(input) {
  let v = input.value.trim();
  if (v.includes("@")) return (input.value = v.toLowerCase());

  let d = v.replace(/\D/g, "");

  if (d.length <= 11)
    return (input.value = d
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2"));

  if (d.length <= 14)
    return (input.value = d
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2"));

  input.value = d
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})$/, "$1-$2");
}

function formatCity(input) {
  input.value = input.value.replace(/[0-9]/g, "").slice(0, 25);
}

function formatAmount(input) {
  let v = input.value.replace(/\D/g, "");
  if (+v > 9999999) v = "9999999";
  input.value = (v / 100).toFixed(2).replace(".", ",");
}