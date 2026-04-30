// 🔹 BASE URL
const BASE_URL = "https://api.shrigaar.com/api/v1/shringar/Screens";

// 🆔 GET OR CREATE SESSION
const getSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    sessionId = "session_" + Date.now();
    localStorage.setItem("sessionId", sessionId);
  }

  return sessionId;
};

// 👤 GET USER INFO (AUTO SYNC FROM USER OBJECT ALSO)
const getUserData = () => {
  let userId = localStorage.getItem("userId");
  let email = localStorage.getItem("email");
  let phone = localStorage.getItem("phone");

  // 🔥 fallback (if stored as full user object)
  if (!userId) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      userId = user.id || user._id || null;
      email = user.Email || user.email || null;
      phone = user.phoneNumber || user.phone || null;

      // ✅ SAVE FOR NEXT TIME
      if (userId) localStorage.setItem("userId", userId);
      if (email) localStorage.setItem("email", email);
      if (phone) localStorage.setItem("phone", phone);
    }
  }

  return { userId, email, phone };
};

// 🚫 PREVENT DUPLICATE TRACKING
let lastScreen = null;

// 🟢 TRACK SCREEN
export const trackScreen = async (screen, screenKey, productId = null) => {
  try {
    // ❌ Avoid duplicate calls
    if (lastScreen === screen) return;
    lastScreen = screen;

    const sessionId = getSessionId();
    const { userId, email, phone } = getUserData();

    const payload = {
      userId,
      email,
      phone,
      sessionId,
      screen,
      screenKey,
      productId,
    };

    await fetch(`${BASE_URL}/enter/api67`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("📊 Screen tracked:", payload);

  } catch (error) {
    console.error("❌ Tracking error:", error);
  }
};

// 🔥 TRACK ACTION (CLICKS / EVENTS)
export const trackAction = async (action, productId = null) => {
  try {
    const sessionId = getSessionId();
    const { userId, email, phone } = getUserData();

    const payload = {
      userId,
      email,
      phone,
      sessionId,
      screen: action,
      screenKey: action,
      productId,
    };

    await fetch(`${BASE_URL}/enter/api67`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("🔥 Action tracked:", payload);

  } catch (error) {
    console.error("❌ Action tracking error:", error);
  }
};

// 🔴 EXIT SCREEN (IMPROVED WITH FALLBACK)
export const exitScreen = () => {
  try {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) return;

    const payload = JSON.stringify({ sessionId });

    // ✅ Primary: sendBeacon
    const success = navigator.sendBeacon(
      `${BASE_URL}/exit/api68`,
      new Blob([payload], { type: "application/json" })
    );

    // 🔥 Fallback (VERY IMPORTANT)
    if (!success) {
      fetch(`${BASE_URL}/exit/api68`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
        keepalive: true, // important for unload
      });
    }

  } catch (error) {
    console.error("❌ Exit tracking error:", error);
  }
};

// 🚀 AUTO EXIT TRACK (GLOBAL)
export const initAutoTracking = () => {
  // tab close / refresh
  window.addEventListener("beforeunload", exitScreen);

  // tab switch
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      exitScreen();
    }
  });
};