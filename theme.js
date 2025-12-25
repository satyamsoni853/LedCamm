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

// Inject Dark Mode Styles
const style = document.createElement("style");
style.textContent = `
  body.dark-mode {
    background-color: #121212 !important;
    color: #ffffff !important;
  }
  body.dark-mode h1, 
  body.dark-mode h2, 
  body.dark-mode h3, 
  body.dark-mode h4, 
  body.dark-mode h5, 
  body.dark-mode h6,
  body.dark-mode p,
  body.dark-mode span,
  body.dark-mode li,
  body.dark-mode a {
    color: #ffffff !important;
  }
  body.dark-mode .navbar,
  body.dark-mode .card,
  body.dark-mode .footer {
    background-color: #1e1e1e !important;
    color: #ffffff !important;
  }
`;
document.head.appendChild(style);
