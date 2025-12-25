// function to resize iframe based on content height
function resizeIframe(iframe) {
  if (!iframe.contentWindow || !iframe.contentWindow.document) return;

  try {
    const doc = iframe.contentWindow.document;
    // Reset height to allow shrinking
    iframe.style.height = "auto";

    const height = Math.max(
      doc.body.scrollHeight,
      doc.body.offsetHeight,
      doc.documentElement.clientHeight,
      doc.documentElement.scrollHeight,
      doc.documentElement.offsetHeight
    );

    // Add a small buffer to ensure no scrollbars appear due to sub-pixel rendering
    iframe.style.height = height + 4 + "px";
  } catch (e) {
    console.warn("Iframe resize failed (likely CORS):", e);
  }
}

// Observe iframes for loading and resizing
const iframes = document.querySelectorAll("iframe");

iframes.forEach((iframe) => {
  // 1. Resize on load
  iframe.addEventListener("load", () => {
    resizeIframe(iframe);

    // 2. Observe mutations inside the iframe if possible
    try {
      const doc = iframe.contentWindow.document;
      const resizeObserver = new ResizeObserver(() => {
        resizeIframe(iframe);
      });
      resizeObserver.observe(doc.body);

      // Also listen to window resize inside iframe
      iframe.contentWindow.addEventListener("resize", () =>
        resizeIframe(iframe)
      );
    } catch (e) {
      // Cannot access contentWindow due to CORS
    }
  });
});

// 3. Resize on main window resize
window.addEventListener("resize", () => {
  iframes.forEach(resizeIframe);
});

// Fallback interval for safety
setInterval(() => {
  iframes.forEach(resizeIframe);
}, 1000);

// Theme Orchestration
window.addEventListener("message", (event) => {
  if (event.data.type === "toggle-theme") {
    const newTheme = event.data.theme;
    iframes.forEach((iframe) => {
      iframe.contentWindow.postMessage(
        { type: "theme-change", theme: newTheme },
        "*"
      );
    });
  }
});
