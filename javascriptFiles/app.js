/*
 * Copyright (c) 2025–present
 * PIX4ME Authors
 *
 * All rights reserved.
*/

function sanitize(s) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9 .-]/g, "")
    .trim();
}

function normalizePixKey(raw) {
  const k = raw.trim();

  if (/^\d{11}$/.test(k.replace(/\D/g, "")))
    return k.replace(/\D/g, "");

  if (/^\d{14}$/.test(k.replace(/\D/g, "")))
    return k.replace(/\D/g, "");

  if (/^\+?\d{10,13}$/.test(k.replace(/\D/g, "")))
    return "+55" + k.replace(/\D/g, "").replace(/^55/, "");

  return k;
}

function generate() {
  const raw = pixKey.value.trim();
  const digits = raw.replace(/\D/g, "");

  if (digits.length === 11 && !isValidCPF(digits))
    return alert("O CPF inserido é inválido.");

  if (digits.length === 14 && !isValidCNPJ(digits))
    return alert("O CNPJ inserido é inválido.");

  const data = {
    key: normalizePixKey(raw),
    name: sanitize(receiver.value).slice(0, 25),
    city: sanitize(city.value).slice(0, 15),
    amount: amount.value.trim().replace(",", ".") || "0.00",
    exp: Date.now() + 15 * 60 * 1000
  };

  if (!data.key || !data.name || !data.city)
    return alert("Preencha todos os campos.");

  location.hash = "PIX=" + btoa(JSON.stringify(data));
  render(data);
}

(function () {
  if (!location.hash.startsWith("#PIX=")) return;
  try {
    const d = JSON.parse(atob(location.hash.replace("#PIX=", "")));
    if (Date.now() > d.exp) throw 0;
    render(d);
  } catch {
    show404("Oops.. Código inválido.", "Este código PIX não existe, ou nunca existiu. 👻");
  }
})();

window.onload = () => {
  setTimeout(() => {
    loading.style.opacity = "0";
    setTimeout(() => loading.remove(), 600);
  }, 900);
};