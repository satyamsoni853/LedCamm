// Listen for theme changes from the parent
window.addEventListener("message", (event) => {
  if (event.data.type === "theme-change") {
    applyTheme(event.data.theme);
  }
});

function applyTheme(theme) {
  const body = document.body;
  if (theme === "dark") {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
}
