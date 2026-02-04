const music = document.getElementById("bg-music");

if (music) {
  music.volume = 0.6;

  // Resume if user already allowed music
  if (localStorage.getItem("music") === "on") {
    music.play().catch(() => {});
  }

  // First user interaction unlocks audio
  document.addEventListener("click", () => {
    if (localStorage.getItem("music") !== "on") {
      music.play().then(() => {
        localStorage.setItem("music", "on");
      }).catch(() => {});
    }
  }, { once: true });
}
