// function to resize iframe based on content height
function resizeIframe(iframe) {
  if (!iframe.contentWindow || !iframe.contentWindow.document) return;

  try {
    const doc = iframe.contentWindow.document;
    const body = doc.body;
    const html = doc.documentElement;

    // We do NOT reset to 'auto' here as it causes flashing.
    // Instead we rely on scrollHeight/offsetHeight.
    // However, if the content shrank, scrollHeight might remain large in some browsers
    // unless we strictly check.
    // But for a linear page builder like this, growing checks are usually sufficient
    // and safer against loops.

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    // Only update if difference is significant (>2px) to prevent loop
    const currentHeight = iframe.getBoundingClientRect().height;

    if (Math.abs(height - currentHeight) > 2) {
      iframe.style.height = Math.ceil(height) + "px";
    }
  } catch (e) {
    // console.warn("Iframe resize failed (likely CORS):", e);
  }
}

// Observe iframes for loading and resizing
const iframes = document.querySelectorAll("iframe");

iframes.forEach((iframe) => {
  // 1. Initial resize on load
  iframe.addEventListener("load", () => {
    resizeIframe(iframe);

    // 2. Observe mutations inside the iframe
    try {
      const doc = iframe.contentWindow.document;

      // Use ResizeObserver on the body of the iframe
      const resizeObserver = new ResizeObserver(() => {
        resizeIframe(iframe);
      });

      if (doc.body) {
        resizeObserver.observe(doc.body);
      }

      // Also listen to window resize inside iframe
      iframe.contentWindow.addEventListener("resize", () => {
        resizeIframe(iframe);
      });
    } catch (e) {
      // Cannot access contentWindow due to CORS or not ready
    }
  });
});

// 3. Resize on main window resize
window.addEventListener("resize", () => {
  iframes.forEach(resizeIframe);
});

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

    // Also update main document body
    if (newTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }
});
