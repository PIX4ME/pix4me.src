/*
 * Copyright (c) 2025–present
 * PIX4ME Authors
 *
 * All rights reserved.
*/

function setTheme(light) {
  document.body.classList.toggle("light", light);
  const src = light ? "assets/img/logoBlack.png" : "assets/img/logoWhite.png";
  logo.src = src;
  localStorage.setItem("theme", light ? "light" : "dark");
}

(function () {
  const saved = localStorage.getItem("theme");
  if (saved) setTheme(saved === "light");
})();