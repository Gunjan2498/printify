import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const preventDefault = (e) => e.preventDefault();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginView, setIsLoginView] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [globalMessage, setGlobalMessage] = useState('');


  // Effect to clear the global message after 3 seconds
  useEffect(() => {
    if (globalMessage) {
      const timer = setTimeout(() => {
        setGlobalMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [globalMessage]);

  // Effect to handle body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);


  const handleSignUp = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password !== confirmPassword) {
      setFormMessage('Error: Passwords do not match!');
      return;
    }
    // Clear form message on success
    setFormMessage('');
    // Close modal and set global message
    setIsModalOpen(false);
    setGlobalMessage('Success: Account created successfully!');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Clear form message on success
    setFormMessage('');
    // Close modal and set global message
    setIsModalOpen(false);
    setGlobalMessage('Success: Logged in successfully!');
  };

  // Reset form message when switching views or closing
  useEffect(() => {
    if (!isModalOpen || isLoginView) {
      setFormMessage('');
    }
  }, [isModalOpen, isLoginView])


  const AuthModal = () => (
    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={() => setIsModalOpen(false)}>
          &times;
        </button>

        {formMessage && <div className={`message-popup ${formMessage.startsWith('Success') ? 'success' : 'error'}`}>{formMessage}</div>}

        {isLoginView ? (
          // Login Form
          <div className="auth-container">
            <h2 className="auth-title">Welcome Back!</h2>
            <p className="auth-subtitle">We missed you! Please enter your details.</p>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="login-email">Email</label>
                <input id="login-email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="input-group">
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" placeholder="Enter your password" required />
              </div>
              <div className="extra-options">
                <div className="checkbox-group">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" onClick={preventDefault} className="forgot-password">Forgot password?</a>
              </div>
              <button type="submit" className="auth-button">Sign In</button>
            </form>
            <div className="divider">or</div>
            <button className="google-btn">
              <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
              Sign in with Google
            </button>
            <p className="auth-switch">
              Don't have an account?{' '}
              <span onClick={() => setIsLoginView(false)}>Sign up</span>
            </p>
          </div>
        ) : (
          // Sign Up Form
          <div className="auth-container">
            <h2 className="auth-title">Create an Account</h2>
            <p className="auth-subtitle">Join us and start your journey!</p>
            <form onSubmit={handleSignUp}>
              <div className="input-group">
                <label htmlFor="signup-name">Full Name</label>
                <input id="signup-name" type="text" placeholder="Enter your full name" required />
              </div>
              <div className="input-group">
                <label htmlFor="signup-email">Email</label>
                <input id="signup-email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="input-group">
                <label htmlFor="signup-phone">Phone</label>
                <input id="signup-phone" type="tel" placeholder="Enter your phone number" required />
              </div>
              <div className="input-group">
                <label htmlFor="signup-password">Create a Password</label>
                <input id="signup-password" name="password" type="password" placeholder="Create a strong password" required />
              </div>
              <div className="input-group">
                <label htmlFor="signup-confirm-password">Confirm Password</label>
                <input id="signup-confirm-password" name="confirmPassword" type="password" placeholder="Confirm your password" required />
              </div>
              <div className="checkbox-group">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">I agree to the <a href="#" onClick={preventDefault}>Terms & Policy</a></label>
              </div>
              <button type="submit" className="auth-button">Sign Up</button>
            </form>
            <p className="auth-switch">
              Already have an account?{' '}
              <span onClick={() => setIsLoginView(true)}>Sign In</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {globalMessage && <div className={`global-message-popup ${globalMessage.startsWith('Success') ? 'success' : 'error'}`}>{globalMessage}</div>}
      <header className="app-header">
        <div className="header-container">
          <h1 className="header-logo">Printify</h1>
          <nav className="header-nav">
            <a href="#" onClick={preventDefault}>Home</a>
            <Link to="/">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className="header-actions">
            <div className="search-container">
              <input type="text" placeholder="Search..." className="search-input" />
              <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <a href="#" className="profile" onClick={() => setIsModalOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="header-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </a>
            <Link to="/wishlist" className="heart">
              <svg xmlns="http://www.w3.org/2000/svg" className="header-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
            <Link to="/cart" className="cart">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="header-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {isModalOpen && <AuthModal />}

      <style>{`
        /* --- Existing Header Styles (Unchanged) --- */
        .app-header {
          font-family: 'Poppins', Arial, sans-serif;
          background: #2c3e50;
          color: #FFFFFF;
          padding: 1rem 1.5rem;
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .header-logo {
          font-size: 1.75rem;
          font-weight: bold;
          font-family: serif;
        }
        .header-nav {
          display: flex;
          gap: 1.5rem;
        }
        .header-nav a {
          color: #FFFFFF;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s ease-in-out;
        }
        .header-nav a:hover {
          opacity: 0.8;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .search-container {
          display: flex;
          position: relative;
        }
        .search-input {
          padding: 0.5rem 0.75rem 0.5rem 2.5rem;
          border-radius: 9999px;
          border: 1px solid #ccc;
          background-color: #FFFFFF;
          color: #333;
          outline: none;
          transition: border-color 0.2s ease-in-out;
        }
        .search-input:focus {
          border-color: #5bc0de;
        }
        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1.25rem;
          height: 1.25rem;
          color: #9CA3AF;
        }
        .header-actions a {
          color: #FFFFFF;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .header-actions a.profile:hover,
        .header-actions a.cart:hover {
          background-color: #FFFFFF;
          color: #2C3E50;
        }
        .header-actions a.heart:hover .header-icon {
          fill: #FFFFFF;
          stroke: #FFFFFF;
        }
        .header-actions a.cart .header-icon,
        .header-actions a.profile .header-icon,
        .header-actions a.heart .header-icon {
          width: 1.4rem;
          height: 1.4rem;
          stroke-width: 2;
          transition: stroke 0.3s ease, fill 0.3s ease;
        }
        .header-icon {
          width: 1.4rem;
          height: 1.4rem;
          stroke-width: 2;
        }
        
        /* --- Global Message Styles --- */
        .global-message-popup {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          color: #fff;
          z-index: 2000;
          font-size: 0.95rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          animation: slide-in-down 0.5s ease-out forwards;
        }

        @keyframes slide-in-down {
          from {
            top: -100px;
            opacity: 0;
          }
          to {
            top: 20px;
            opacity: 1;
          }
        }
        
        .global-message-popup.success {
          background-color: #28a745;
        }
        
        .global-message-popup.error {
          background-color: #dc3545;
        }

        /* --- Modal and Form Styles (Updated) --- */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }
        .modal-content {
          background: radial-gradient(circle at top right, #e8f5ff 10%, #ffffff 80%);
          padding: 1.5rem 2rem;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          width: 90%;
          max-width: 380px;
          position: relative;
          color: #333;
          animation: slide-down 0.3s ease-out;
        }

        @keyframes slide-down {
          from {
            transform: translateY(-30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .modal-close-button {
            position: absolute;
            top: 8px;
            right: 12px;
            background: none;
            border: none;
            font-size: 1.75rem;
            color: #aaa;
            cursor: pointer;
            line-height: 1;
        }
        .auth-container {
            text-align: center;
        }
        .auth-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2C3E50;
            margin-bottom: 0.25rem;
        }
        .auth-subtitle {
            color: #777;
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
        }
        .input-group {
            margin-bottom: 1rem;
            text-align: left;
        }
        .input-group label {
            display: block;
            margin-bottom: 0.4rem;
            font-weight: 500;
            color: #555;
            font-size: 0.85rem;
        }
        .input-group input {
            width: 100%;
            padding: 0.65rem;
            border-radius: 8px;
            border: 1px solid #ddd;
            font-size: 0.9rem;
            box-sizing: border-box; 
        }
        .input-group input:focus {
            outline: none;
            border-color: #297dd0ff;
        }
        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.85rem;
        }
        .checkbox-group a, .forgot-password {
          color: #297dd0ff;
          text-decoration: none;
          font-size: 0.85rem;
        }
         .checkbox-group a:hover, .forgot-password:hover {
          text-decoration: underline;
        }
        .extra-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.25rem;
        }
        .auth-button {
            width: 100%;
            padding: 0.75rem;
            border-radius: 8px;
            border: none;
            background-color: #2C3E50;
            color: #fff;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-bottom: 1rem;
        }
        .auth-button:hover {
            background-color: #2a4561ff;
        }
        .google-btn {
            width: 100%;
            padding: 0.75rem;
            border-radius: 8px;
            border: 1px solid #ddd;
            background-color: #fff;
            color: #555;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
        }
        .google-btn:hover {
            background-color: #f7f7f7;
        }
        .google-icon {
            width: 18px;
            height: 18px;
        }
        .divider {
            font-size: 0.8rem;
            color: #aaa;
            text-transform: uppercase;
            margin: 0rem 0 1rem;
            display: flex;
            align-items: center;
        }
        .divider::before, .divider::after {
            content: '';
            flex-grow: 1;
            background: #ddd;
            height: 1px;
            margin: 0 0.5rem;
        }
        .auth-switch {
            margin-top: 1.25rem;
            color: #777;
            font-size: 0.9rem;
        }
        .auth-switch span {
            color: #297dd0ff;
            font-weight: 600;
            cursor: pointer;
        }
        .message-popup {
          padding: 0.8rem;
          border-radius: 8px;
          color: #fff;
          text-align: center;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          animation: fade-in 0.3s ease-out;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .message-popup.success {
          background-color: #28a745;
        }
        .message-popup.error {
          background-color: #dc3545;
        }
      `}</style>
    </>
  );
};

export default Header;

