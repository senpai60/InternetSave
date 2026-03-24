document.getElementById("btn").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      // prevent duplicate
      if (window.saveModeActive) return;

      window.saveModeActive = true;

      // 🔹 Create glow box
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

      // 🔹 Handlers
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

      // 🔹 NEW: Handle Click
      // 🔹 NEW: Handle Click (Updated for Responsiveness & URL)
      function handleClick(e) {
        if (!window.saveModeActive) return;

        // Don't intercept clicks on our own Exit button
        if (e.target.id === "saveModeBtn") return;

        // Stop the website's default click behavior
        e.preventDefault();
        e.stopPropagation();

        const target = e.target;
        const rect = target.getBoundingClientRect();

        // 1. Capture current device/viewport size
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const documentWidth = document.documentElement.scrollWidth;
        const documentHeight = document.documentElement.scrollHeight;

        // 2. Calculate Responsive Positions
        // Converting pixels to Viewport Width (vw) and Viewport Height (vh)
        const responsivePosition = {
          leftVW:
            parseFloat(((rect.left / viewportWidth) * 100).toFixed(2)) + "vw",
          topVH:
            parseFloat(((rect.top / viewportHeight) * 100).toFixed(2)) + "vh",
          widthVW:
            parseFloat(((rect.width / viewportWidth) * 100).toFixed(2)) + "vw",
          heightVH:
            parseFloat(((rect.height / viewportHeight) * 100).toFixed(2)) +
            "vh",
          // Percentage relative to the entire scrollable page (good for absolute positioning)
          absoluteLeftPercent:
            parseFloat(
              (((rect.left + window.scrollX) / documentWidth) * 100).toFixed(2),
            ) + "%",
          absoluteTopPercent:
            parseFloat(
              (((rect.top + window.scrollY) / documentHeight) * 100).toFixed(2),
            ) + "%",
        };

        // 3. Gather all the data
        const elementData = {
          url: window.location.href, // Capture the current URL
          viewport: {
            width: viewportWidth,
            height: viewportHeight,
          },
          position: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            absoluteTop: rect.top + window.scrollY,
            absoluteLeft: rect.left + window.scrollX,
          },
          responsivePosition: responsivePosition, // Add the calculated responsive layout
          content: target.innerText || target.value || "No text content",
          tagName: target.tagName,
        };

        console.log("Element Saved:", elementData);

        // Copy the data to the user's clipboard
        navigator.clipboard
          .writeText(JSON.stringify(elementData, null, 2))
          .then(() => alert("Element data copied! Check your clipboard."))
          .catch((err) => console.error("Failed to copy!", err));
      }

      // 🔹 Attach listeners (Note the 'true' for handleClick to catch it in the capture phase)
      document.addEventListener("mouseover", handleMouseOver);
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("click", handleClick, true);

      // 🔹 Create exit button
      const btn = document.createElement("button");
      btn.id = "saveModeBtn";
      btn.innerText = "Exit Save Mode";

      Object.assign(btn.style, {
        position: "fixed",
        top: "10px",
        right: "10px",
        backgroundColor: "black",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        zIndex: 9999,
      });

      btn.addEventListener("click", () => {
        window.saveModeActive = false;

        // ❌ REMOVE listeners
        document.removeEventListener("mouseover", handleMouseOver);
        document.removeEventListener("mouseleave", handleMouseLeave);
        document.removeEventListener("click", handleClick, true);

        // ❌ remove glow & button
        glowBox.remove();
        btn.remove();

        console.log("Save Mode OFF");
      });

      document.body.appendChild(btn);

      console.log("Save Mode ON");
    },
  });
});
