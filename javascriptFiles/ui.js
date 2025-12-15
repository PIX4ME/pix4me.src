/*
 * Copyright (c) 2025–present
 * PIX4ME Authors
 *
 * All rights reserved.
*/

let pixPayload = "";
let countdownTimer = null;

function startCountdown(exp) {
  clearInterval(countdownTimer);

  const tick = () => {
    const diff = exp - Date.now();
    if (diff <= 0)
      return show404("Oops.. Código expirado.", "Peça ao remetente para criar uma nova cobrança.");

    const m = Math.floor(diff / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    countdown.innerText = `Expira em ${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  };

  tick();
  countdownTimer = setInterval(tick, 1000);
}

function render(d) {
  pixPayload = makePix(d.key, d.name, d.city, d.amount);
  const v = Number(d.amount);

  payText.innerText = `PAGUE R$ ${v.toFixed(2).replace(".",",")} para ${d.name}`;
  qr.src = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(pixPayload);

  viewKey.innerText = d.key;
  pixCode.innerText = pixPayload;

  form.style.display = "none";
  notFound.style.display = "none";
  view.style.display = "block";

  startCountdown(d.exp);
}

function show404(t, m) {
  if (errorTitle) errorTitle.innerText = t;
  if (nfText) nfText.innerText = m;
  form.style.display = view.style.display = "none";
  notFound.style.display = "block";
}

function copyPix() {
  navigator.clipboard.writeText(pixPayload);
  alert("Código PIX copiado!");
}

function openWebsite() {
  window.location.href = 'https://pix4me.github.io';
}

function toggleAbout() {
  document.getElementById("aboutModal").classList.toggle("active");
}

function closeAbout(e) {
  if (e.target.id === "aboutModal") {
    toggleAbout();
  }
}