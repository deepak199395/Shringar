import React from "react";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  const phoneNumber = "919876543210"; // 👉 replace with your number
  const message = "Hi, I'm interested in your products";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="whatsapp-btn" onClick={handleClick}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
        alt="whatsapp"
      />
    </div>
  );
};

export default WhatsAppButton;