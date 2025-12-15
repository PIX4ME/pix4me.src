/*
 * Copyright (c) 2025–present
 * PIX4ME Authors
 *
 * All rights reserved.
*/

(() => {
  const body = document.body;
  const html = document.documentElement;
  let currentScroll = window.scrollY || window.pageYOffset;
  let targetScroll = currentScroll;
  let isScrolling = false;
  const ease = 0.1;
  function smoothScroll() {
    currentScroll += (targetScroll - currentScroll) * ease;
    window.scrollTo(0, currentScroll);
    if (Math.abs(targetScroll - currentScroll) > 0.5) {
      requestAnimationFrame(smoothScroll);
    } else {
      isScrolling = false;
    }
  }
  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      targetScroll += e.deltaY;
      targetScroll = Math.max(
        0,
        Math.min(targetScroll, html.scrollHeight - window.innerHeight)
      );
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScroll);
      }
    },
    { passive: false }
  );
  window.addEventListener("keydown", (e) => {
    let delta = 0;
    switch (e.key) {
      case "ArrowDown":
        delta = 40;
        break;
      case "ArrowUp":
        delta = -40;
        break;
      case "PageDown":
        delta = window.innerHeight;
        break;
      case "PageUp":
        delta = -window.innerHeight;
        break;
      case "Home":
        delta = -targetScroll;
        break;
      case "End":
        delta = html.scrollHeight;
        break;
      default:
        return;
    }
    e.preventDefault();
    targetScroll += delta;
    targetScroll = Math.max(
      0,
      Math.min(targetScroll, html.scrollHeight - window.innerHeight)
    );
    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(smoothScroll);
    }
  });
})();