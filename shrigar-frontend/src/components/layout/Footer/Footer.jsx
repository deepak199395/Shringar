import "./Footer.css";
import {
  SOCIAL_MEDIA,
  FOOTER_LINKS,
  CONTACT_INFO
} from "../../../config/social.config";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* Company */}
        <div>
          <h4>Company</h4>
          {FOOTER_LINKS.company.map((item) => (
            <a key={item.label} href={item.path}>{item.label}</a>
          ))}
        </div>

        {/* Support */}
        <div>
          <h4>Support</h4>
          {FOOTER_LINKS.support.map((item) => (
            <a key={item.label} href={item.path}>{item.label}</a>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4>Contact</h4>
          <p>{CONTACT_INFO.address}</p>
          <p>{CONTACT_INFO.phone}</p>
          <p>{CONTACT_INFO.email}</p>
        </div>

        {/* Social */}
        <div>
          <h4>Follow Us</h4>
          <div className="social-icons">
            {SOCIAL_MEDIA.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} Shrigar. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
