import Layout from "../../components/layout/Layout";
import ContactForm from "./ContactForm";
import "./Contact.css";

export default function ContactPage() {
  return (
    <Layout>
      <div className="contact-container">
        <h1>Contact Us</h1>
        <ContactForm />
      </div>
    </Layout>
  );
}
