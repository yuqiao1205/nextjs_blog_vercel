import './contact.css';
import Image from 'next/image';
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Contact Page",
  description: "Contact page for Lauren's Next.js Blog",
};

const ContactPage = () => {
  return (
    <div className="contact-container">
      <div className="contact-image-container">
        <Image src="/contact.png" alt="Contact Illustration" fill className="image-style"
        />
      </div>
      <div className="form-container">
        <form action="" className="form-style">
          <h1>Contact Me</h1>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="tel" placeholder="Phone Number" required />
          <textarea name="" id="" cols={30} rows={10} placeholder="Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;