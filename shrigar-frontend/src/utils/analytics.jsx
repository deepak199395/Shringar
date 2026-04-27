// 🔹 BASE URL
const BASE_URL = "https://www.shrigaar.com/api/v1/shringar/Screens";

// 🆔 GET OR CREATE SESSION
const getSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    sessionId = "session_" + Date.now();
    localStorage.setItem("sessionId", sessionId);
  }

  return sessionId;
};

// 👤 GET USER INFO
const getUserData = () => {
  return {
    userId: localStorage.getItem("userId") || null,
    email: localStorage.getItem("email") || null,
    phone: localStorage.getItem("phone") || null,
  };
};



// 🟢 TRACK SCREEN
export const trackScreen = async (screen, screenKey, productId = null) => {
  try {
    const sessionId = getSessionId();
    const { userId, email, phone } = getUserData();

    await fetch(`${BASE_URL}/enter/api67`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        email,     // ✅ NEW
        phone,     // ✅ NEW
        sessionId,
        screen,
        screenKey,
        productId,
      }),
    });

    console.log("📊 Screen tracked:", screen);

  } catch (error) {
    console.error("❌ Tracking error:", error);
  }
};



// 🔥 TRACK ACTION (IMPORTANT FOR BUSINESS)
export const trackAction = async (action, productId = null) => {
  try {
    const sessionId = getSessionId();
    const { userId, email, phone } = getUserData();

    await fetch(`${BASE_URL}/enter/api67`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        email,
        phone,
        sessionId,
        screen: action,      // 👉 reuse screen field for actions
        screenKey: action,
        productId,
      }),
    });

    console.log("🔥 Action tracked:", action);

  } catch (error) {
    console.error("❌ Action tracking error:", error);
  }
};



// 🔴 EXIT SCREEN (KEEP AS IS BUT CLEAN)
export const exitScreen = () => {
  try {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) return;

    const data = JSON.stringify({ sessionId });

    navigator.sendBeacon(
      `${BASE_URL}/exit/api68`,
      new Blob([data], { type: "application/json" })
    );

  } catch (error) {
    console.error("❌ Exit tracking error:", error);
  }
};