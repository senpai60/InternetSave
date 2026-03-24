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

      // 🔹 Handlers (IMPORTANT: named functions)
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

      // 🔹 Attach listeners
      document.addEventListener("mouseover", handleMouseOver);
      document.addEventListener("mouseleave", handleMouseLeave);

      // 🔹 Create button
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

        // ❌ remove glow
        glowBox.remove();

        // ❌ remove button
        btn.remove();

        console.log("Save Mode OFF");
      });

      document.body.appendChild(btn);

      console.log("Save Mode ON");
    },
  });
});
