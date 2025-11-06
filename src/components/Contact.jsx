import React, { useState, useEffect } from 'react';

// SVG Icon Components for better reusability and control
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" width="22" height="22">
    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="22" height="22">
    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.2-46.2 11.5l-39.7 49.6c-59.2-35.1-112.2-88.1-147.3-147.3l49.6-39.7c13.7-11 18.2-30 11.5-46.2l-40-96z" />
  </svg>
);

// Updated EnvelopeIcon to be solid
const EnvelopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="22" height="22">
    <path d="M48 64H464c26.5 0 48 21.5 48 48V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48zM0 112V400c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V112c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64zM256 224L448 112H64L256 224zM448 400H64V146.6l176.4 102.8c12.3 7.2 26.9 7.2 39.2 0L448 146.6V400z" />
  </svg>
);


const FacebookIcon = () => <i className="fab fa-facebook fa-lg" aria-label="Facebook"></i>;
const WhatsappIcon = () => <i className="fab fa-whatsapp" aria-label="Whatsapp"></i>;
const YoutubeIcon = () => <i className="fab fa-youtube" aria-label="YouTube"></i>;
const InstagramIcon = () => <i className="fab fa-instagram" aria-label="Instagram"></i>;

export default function Contact() {
  const [isNavActive, setIsNavActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [notification, setNotification] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setNotification('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('');
      }, 4000); // Notification disappears after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', Arial, sans-serif;
            background: #fff;
            color: #2c3e50;
            line-height: 1.6;
        }

        .contact-intro {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 3rem 1rem 0rem 0rem;
        }

        .contact-content {
            max-width: 700px;
        }

        .contact-content h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.1rem;
            color: #2c3e50;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .contact-content p {
            font-size: 1rem;
            color: #34495e;
            line-height: 1.6;
        }

        .main-contact {
            max-width: 1000px;
            margin: 60px auto;
            background: radial-gradient(circle at top right, #e8f5ff 10%, #ffffff 80%);
            padding: 40px 30px 60px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 70px;
            border-radius: 10px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .contact-info h1 {
            font-weight: 700;
            font-size: 1.5em;
            margin-bottom: 15px;
        }
        
        .contact-info > p {
            font-size: 1em;
            color: #34495e;
            margin: 15px 0;
        }

        .contact-list {
            list-style: none;
            padding: 0;
            margin: 0 0 20px 0;
        }

        .contact-list li {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .contact-list hr {
            border: none;
            border-top: 1px solid #ccc;
            margin: 20px 0;
        }

        .icon-box {
            background-color: #ecf0f1;
            color: #2c3e50;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
        }

        .text-box strong {
            display: block;
            font-size: 16px;
            color: #2c3e50;
            margin-bottom: 1px;
        }

        .text-box p {
            margin: 0;
            font-size: 14px;
            color: #34495e;
        }
        
        .social-icons h2 {
            font-weight: 700;
            font-size: 1.5em;
            margin-bottom: 15px;
        }

        .social-icons {
            margin-top: 25px;
        }

        .social-icons a {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            margin-right: 15px;
            font-size: 22px;
            background-color: #ffffffff;
            border-radius: 50%;
            transition: color 0.3s, background 0.3s;
            text-decoration: none;
        }
        
        .social-icons a:hover {
            opacity: 0.8;
        }

        .social-icons .fa-facebook-f, .social-icons .fa-facebook {
            color: #1877F2;
        }

        .social-icons .fa-whatsapp {
            color: #25D366;
        }

        .social-icons .fa-youtube {
            color: #FF0000;
        }

        .social-icons .fa-instagram {
            background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 4%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .message-box {
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
            border-radius: 15px;
            background: white;
            padding: 30px;
            transition: box-shadow 0.3s ease-in-out;
        }

        .message-box:hover {
            box-shadow: 0 16px 30px rgba(0, 0, 0, 0.2);
        }

        .message-box form {
            padding: 30px 25px;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            background: white;
        }
        
        .message-box form h2 {
            font-weight: 700;
            font-size: 1.3em;
            margin-bottom: 20px;
        }

        .message-box form input, .message-box form textarea {
            margin-bottom: 20px;
            padding: 15px 12px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 1em;
            font-family: inherit;
        }

        .message-box form textarea {
            resize: vertical;
            min-height: 120px;
        }

        .message-box form input:focus, .message-box form textarea:focus {
            border-color: #2c3e50;
            outline: none;
        }

        .consent-text {
            font-size: 12px;
            color: #898585;
            margin-bottom: 20px;
            line-height: 1.4;
        }

        .message-box form button {
            background-color: #2c3e50;
            color: white;
            padding: 12px 30px;
            font-size: 16px;
            font-weight: bold;
            border: none;
            border-radius: 999px;
            cursor: pointer;
            transition: background-color 0.3s;
            align-self: flex-end;
        }

        .message-box form button:hover {
            background-color: #212f3c;
        }

        .map {
            max-width: 1000px;
            margin: 0 auto 40px;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), inset 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .map iframe {
            width: 100%;
            height: 320px;
            border: none;
        }

        .notification-toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #2c3e50;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1001;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.4s ease, visibility 0.4s ease, bottom 0.4s ease;
        }
        
        .notification-toast.show {
            opacity: 1;
            visibility: visible;
            bottom: 40px;
        }

        @media(max-width: 992px) {
            .main-contact {
                grid-template-columns: 1fr;
                row-gap: 40px;
            }
        }

        @media(max-width: 768px) {
            .nav-links {
                display: none;
                flex-direction: column;
                background: #fff;
                position: absolute;
                top: 60px;
                right: 0;
                width: 220px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                padding: 1rem;
            }

            .nav-links.active {
                display: flex;
            }

            .menu-toggle {
                display: block;
            }
        }
      `}</style>

      <div className="contact-page-container">
        <section className="contact-intro">
          <div className="contact-content">
            <h1>Contact Us</h1>
            <p>Have questions or need support? We're just a message away.</p>
          </div>
        </section>

        <section className="main-contact">
          <div className="contact-info">
            <h1>Get In Touch</h1>
            <p>
              We're here to answer your questions, assist with inquiries, and provide the support you need. Whether
              you're looking for more information, need help with our services, or simply want to connect—reach out to
              us anytime.
            </p>
            <ul className="contact-list">
              <li>
                <span className="icon-box"><LocationIcon /></span>
                <div className="text-box">
                  <strong>Address</strong>
                  <p>Akola, Maharashtra</p>
                </div>
              </li>
              <li>
                <span className="icon-box"><PhoneIcon /></span>
                <div className="text-box">
                  <strong>Phone Number</strong>
                  <p>+91 1234567890</p>
                </div>
              </li>
              <li>
                <span className="icon-box"><EnvelopeIcon /></span>
                <div className="text-box">
                  <strong>E-Mail</strong>
                  <p>mailto@printify.com</p>
                </div>
              </li>
            </ul>
            <hr />
            <div className="social-icons">
              <h2>Follow Us</h2>
              <a href="#"><FacebookIcon /></a>
              <a href="#"><WhatsappIcon /></a>
              <a href="#"><YoutubeIcon /></a>
              <a href="#"><InstagramIcon /></a>
            </div>
          </div>

          <div className="message-box">
            <form onSubmit={handleSubmit}>
              <h2>Send a Message</h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
              <p className="consent-text">
                By submitting, you agree to the processing of your personal data by Printify as described in the Privacy Statement.
              </p>
              <button type="submit">Submit</button>
            </form>
          </div>
        </section>

        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.492398453316!2d77.00832381538418!3d20.70955898622415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd731e71154b505%3A0x59b778dcc7898204!2sPrintify!5e0!3m2!1sen!2sin!4v1622012345678!5m2!1sen!2sin"
            width="100%"
            height="320"
            style={{ border: 0, borderRadius: '10px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Map showing Printify location"
          ></iframe>
        </div>

        <div className={`notification-toast ${notification ? 'show' : ''}`}>
          {notification}
        </div>
      </div>
    </>
  );
}

