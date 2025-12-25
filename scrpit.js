function resizeIframe(obj) {
  try {
    obj.style.height =
      obj.contentWindow.document.documentElement.scrollHeight + "px";
  } catch (e) {
    console.warn(
      "Cannot auto-resize iframe due to CORS or security restrictions:",
      e
    );
  }
}

const iframes = document.querySelectorAll("iframe");
iframes.forEach((iframe) => {
  iframe.onload = function () {
    resizeIframe(this);
  };
});

// Theme Orchestration
window.addEventListener("message", (event) => {
  if (event.data.type === "toggle-theme") {
    const newTheme = event.data.theme;

    // Broadcast to all iframes
    iframes.forEach((iframe) => {
      iframe.contentWindow.postMessage(
        { type: "theme-change", theme: newTheme },
        "*"
      );
    });
  }
});
