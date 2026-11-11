/* Vellum Studio — shared site script: sitewide "Next Update" countdown */
(function () {
  // Anchor date for the update cycle. Change to your last real release
  // date any time; the countdown keeps looping from it.
  var CYCLE_START = new Date("2026-07-22T00:00:00Z").getTime();
  var CYCLE_DAYS = 45;
  var CYCLE_MS = CYCLE_DAYS * 24 * 60 * 60 * 1000;

  function pad(n) { return String(n).padStart(2, "0"); }

  function build() {
    if (document.getElementById("vl-countdown")) return;
    var bar = document.createElement("div");
    bar.id = "vl-countdown";
    bar.className = "vl-bar";
    bar.setAttribute("role", "timer");
    bar.setAttribute("aria-label", "Countdown to next update");
    bar.innerHTML =
      '<span class="vl-dot" aria-hidden="true"></span>' +
      '<span class="vl-label">Next update in</span>' +
      '<span class="vl-time">' +
      '<b id="vl-d">00</b><i>d</i><b id="vl-h">00</b><i>h</i>' +
      '<b id="vl-m">00</b><i>m</i><b id="vl-s">00</b><i>s</i>' +
      "</span>";
    var skip = document.querySelector(".skip-link");
    if (skip && skip.parentNode === document.body) {
      skip.insertAdjacentElement("afterend", bar);
    } else {
      document.body.insertBefore(bar, document.body.firstChild);
    }
  }

  function tick() {
    var remaining = CYCLE_MS - ((Date.now() - CYCLE_START) % CYCLE_MS);
    var set = function (id, v) {
      var el = document.getElementById(id);
      if (el) el.textContent = pad(v);
    };
    set("vl-d", Math.floor(remaining / 86400000));
    set("vl-h", Math.floor((remaining / 3600000) % 24));
    set("vl-m", Math.floor((remaining / 60000) % 60));
    set("vl-s", Math.floor((remaining / 1000) % 60));
  }

  function start() {
    build();
    tick();
    setInterval(tick, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
