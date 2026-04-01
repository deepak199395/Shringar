import "./Contact.css";

export default function ContactForm() {
  return (
    <form className="contact-form">
      <label>
        Name
        <input type="text" placeholder="Your name" required />
      </label>
      <label>
        Email
        <input type="email" placeholder="Your email" required />
      </label>
      <label>
        Message
        <textarea placeholder="Your message" required></textarea>
      </label>
      <button type="submit">Send</button>
    </form>
  );
}
