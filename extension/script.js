document.getElementById("btn").addEventListener("click", async () => {
  // 1. Check if user is logged in BEFORE injecting the glow script
  const cookie = await chrome.cookies.get({
    url: "http://localhost:8000",
    name: "token",
  });
  if (!cookie) {
    alert("Please log in to the Linkora web app to use the extension.");
    window.open("http://localhost:5173/login", "_blank"); // Redirect to login
    return;
  }

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      if (window.saveModeActive) return;
      window.saveModeActive = true;

      const glowBox = document.createElement("div");
      Object.assign(glowBox.style, {
        position: "absolute",
        pointerEvents: "none",
        zIndex: "1000000",
        border: "2px solid #00f2ff",
        boxShadow: "0 0 15px #00f2ff, inset 0 0 10px #00f2ff",
        borderRadius: "2px",
        transition: "all 0.15s ease-out",
        display: "none",
        boxSizing: "border-box",
      });
      document.body.appendChild(glowBox);

      // Replace your empty handleMouseOver and handleMouseLeave with this:
      function handleMouseOver(e) {
        if (!window.saveModeActive) return;

        const target = e.target;

        if (target === document.body || target === document.documentElement) {
          glowBox.style.display = "none";
          return;
        }

        const rect = target.getBoundingClientRect();

        glowBox.style.display = "block";
        glowBox.style.width = `${rect.width}px`;
        glowBox.style.height = `${rect.height}px`;
        glowBox.style.top = `${rect.top + window.scrollY}px`;
        glowBox.style.left = `${rect.left + window.scrollX}px`;
      }

      function handleMouseLeave() {
        glowBox.style.display = "none";
      }

      function handleClick(e) {
        if (!window.saveModeActive) return;
        if (e.target.id === "saveModeBtn") return;

        e.preventDefault();
        e.stopPropagation();

        const target = e.target;
        const rect = target.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const documentWidth = document.documentElement.scrollWidth;
        const documentHeight = document.documentElement.scrollHeight;

        const elementData = {
          url: window.location.href,
          viewport: { width: viewportWidth, height: viewportHeight },
          position: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            absoluteTop: rect.top + window.scrollY,
            absoluteLeft: rect.left + window.scrollX,
          },
          content: target.innerText || target.value || "No text content",
          tagName: target.tagName,
        };

        // 2. Send to background script instead of clipboard
        chrome.runtime.sendMessage({
          type: "SAVE_ELEMENT",
          data: elementData,
        });

        // Optional visual feedback
        const originalBg = target.style.backgroundColor;
        target.style.backgroundColor = "#00f2ff55";
        setTimeout(() => (target.style.backgroundColor = originalBg), 300);
      }

      document.addEventListener("mouseover", handleMouseOver);
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("click", handleClick, true);

      const btn = document.createElement("button");
      btn.id = "saveModeBtn";
      btn.innerText = "Exit Save Mode";
      Object.assign(btn.style, {
        /* ... keep existing styles ... */
      });

      btn.addEventListener("click", () => {
        /* ... keep existing logic ... */
      });
      document.body.appendChild(btn);
    },
  });
});
