export const trackScreen = async (screen, screenKey, productId = null) => {
  try {
    // 🆔 Get or create sessionId
    let sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      sessionId = "session_" + Date.now();
      localStorage.setItem("sessionId", sessionId);
    }

    // 👤 Get userId (if logged in)
    const userId = localStorage.getItem("userId") || null;

    // 📡 Call your backend API
    await fetch(
      "https://www.shrigaar.com/api/v1/shringar/Screens/enter/api67",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          sessionId,
          screen,
          screenKey,
          productId,
        }),
      }
    );

    console.log("📊 Screen tracked:", screen);

  } catch (error) {
    console.error("❌ Tracking error:", error);
  }
};

// 🔴 EXIT SCREEN (NEW ADD)
export const exitScreen = () => {
  try {
    const sessionId = localStorage.getItem("sessionId");

    if (!sessionId) return;

    const data = JSON.stringify({ sessionId });

    navigator.sendBeacon(
      "https://www.shrigaar.com/api/v1/shringar/Screens/exit/api68",
      new Blob([data], { type: "application/json" }) 
    );

  } catch (error) {
    console.error("Exit tracking error:", error);
  }
};