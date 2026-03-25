document.getElementById("btn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
  if (window.saveModeActive) return;
  window.saveModeActive = true;

  // 1. Create the Glow Box
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

  // 2. Mouse Handlers
  function handleMouseOver(e) {
    if (!window.saveModeActive) return;

    const target = e.target;
    // Corrected to use a class selector (.) instead of ID (#)
    if (
      target === document.body ||
      target === document.documentElement ||
      target.closest(".linkora-extension-ui")
    ) {
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

  // 3. Form Modal Generator
  function showSaveModal(elementData) {
    const existing = document.getElementById("linkora-save-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "linkora-save-modal";
    modal.className = "linkora-extension-ui";

    Object.assign(modal.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1e1e2f",
      color: "#fff",
      padding: "20px",
      zIndex: "10000001",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      borderRadius: "8px",
      width: "350px",
      fontFamily: "Arial, sans-serif",
      border: "1px solid #333",
    });

    modal.innerHTML = `
          <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #00f2ff;">Save to Linkora</h3>
          <label style="display: block; font-size: 12px; margin-bottom: 5px; color: #aaa;">Title</label>
          <input type="text" id="linkora-title" placeholder="Enter title manually..." style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 4px; border: 1px solid #444; background: #2a2a3a; color: #fff; box-sizing: border-box;">
          <label style="display: block; font-size: 12px; margin-bottom: 5px; color: #aaa;">Content / Media Src</label>
          <textarea id="linkora-content" style="width: 100%; height: 80px; margin-bottom: 15px; padding: 8px; border-radius: 4px; border: 1px solid #444; background: #2a2a3a; color: #fff; box-sizing: border-box; resize: none;">${elementData.content}</textarea>
          <label style="display: block; font-size: 12px; margin-bottom: 5px; color: #aaa;">Source URL</label>
          <input type="text" id="linkora-url" value="${elementData.url}" style="width: 100%; padding: 8px; margin-bottom: 20px; border-radius: 4px; border: 1px solid #444; background: #2a2a3a; color: #fff; box-sizing: border-box;">
          <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button id="linkora-cancel" style="padding: 8px 15px; border-radius: 4px; border: none; background: #444; color: #fff; cursor: pointer;">Cancel</button>
            <button id="linkora-save-btn" style="padding: 8px 15px; border-radius: 4px; border: none; background: #00f2ff; color: #000; font-weight: bold; cursor: pointer;">Save Data</button>
          </div>
        `;
    document.body.appendChild(modal);

    document.getElementById("linkora-cancel").onclick = (e) => {
      e.preventDefault();
      modal.remove();
    };

    document.getElementById("linkora-save-btn").onclick = (e) => {
      e.preventDefault();
      elementData.title = document.getElementById("linkora-title").value;
      elementData.content = document.getElementById("linkora-content").value;
      elementData.url = document.getElementById("linkora-url").value;

      chrome.runtime.sendMessage({ type: "SAVE_ELEMENT", data: elementData });

      modal.innerHTML = `<h3 style="margin: 0; color: #00ffaa; text-align: center; padding: 20px 0;">Item Saved! ✓</h3>`;
      setTimeout(() => modal.remove(), 1500);
    };
  }

  // 4. Handle Clicks
  function handleClick(e) {
    if (!window.saveModeActive) return;

    if (e.target.closest(".linkora-extension-ui")) return;

    e.preventDefault();
    e.stopPropagation();

    const target = e.target;
    const rect = target.getBoundingClientRect();
    glowBox.style.display = "none";

    const url = window.location.href;
    let extractedContent = "";

    if (url.includes("youtube.com")) {
      const video = target.closest("video") || document.querySelector("video");
      extractedContent = video ? (video.src || video.currentSrc || url) : url;
    } else if (url.includes("unsplash.com") || url.includes("pinterest.")) {
      const img = target.closest("img") || (target.closest("div") && target.closest("div").querySelector("img")) || target.querySelector("img");
      extractedContent = img ? (img.src || img.currentSrc) : "";
    } else if (target.tagName === "IMG") {
      extractedContent = target.src || target.currentSrc;
    } else if (target.tagName === "VIDEO" || target.tagName === "AUDIO") {
      extractedContent = target.src || target.currentSrc || (target.querySelector("source") && target.querySelector("source").src);
    } 
    
    if (!extractedContent) {
      extractedContent = (
        target.innerText ||
        target.value ||
        target.alt ||
        "No text/media content found"
      )
        .trim()
        .substring(0, 500);
    }

    const elementData = {
      url: url,
      position: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        absoluteTop: rect.top + window.scrollY,
        absoluteLeft: rect.left + window.scrollX,
      },
      content: extractedContent,
      tagName: target.tagName,
    };

    showSaveModal(elementData);
  }

  document.addEventListener("mouseover", handleMouseOver);
  document.addEventListener("mouseleave", handleMouseLeave);
  document.addEventListener("click", handleClick, true);

  // 5. Exit Button
  const btn = document.createElement("button");
  btn.id = "saveModeBtn";
  btn.className = "linkora-extension-ui";
  btn.innerText = "Exit Save Mode";
  Object.assign(btn.style, {
    position: "fixed",
    top: "10px",
    right: "10px",
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    border: "2px solid #333",
    cursor: "pointer",
    zIndex: 9999999,
    fontWeight: "bold",
  });

  btn.addEventListener("click", () => {
    window.saveModeActive = false;
    document.removeEventListener("mouseover", handleMouseOver);
    document.removeEventListener("mouseleave", handleMouseLeave);
    document.removeEventListener("click", handleClick, true);

    const modal = document.getElementById("linkora-save-modal");
    if (modal) modal.remove();
    glowBox.remove();
    btn.remove();
  });

  document.body.appendChild(btn);
    }
  });
  window.close();
});
