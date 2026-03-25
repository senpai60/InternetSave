import axios from "axios";
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SAVE_ELEMENT") {
    chrome.cookies.get(
      { url: "http://localhost:8000", name: "token" },
      (cookie) => {
        if (!cookie) {
          console.error("User is not logged in!");
          return;
        }
        fetch("http://localhost:8000/api/items", {
          // Update to your actual save route
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.value}`, // Pass token safely
          },
          body: JSON.stringify(message.data),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Successfully saved to database:", data);
          })
          .catch((err) => console.error("Database save failed:", err));
      },
    );
  }
});
