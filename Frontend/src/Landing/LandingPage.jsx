import React, { useContext } from 'react';
import './LandingPage.css';
import { MyContext } from '../MyContext.jsx';
import chatUI from '../assets/Chat_UI.png';
import chatScreenshot from '../assets/Chat_Screenshot.png';
import { 
  MessageSquare, 
  History, 
  ShieldCheck, 
  Moon, 
  Code2, 
  Smartphone,
  Zap,
  Lock,
  Cpu
} from 'lucide-react';

const LandingPage = ({ setShowLanding }) => {
  const { theme, setTheme } = useContext(MyContext);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleAuthRedirect = () => {
    setShowLanding(false);
  };

  return (
    <div className={`landing-container ${theme}`}>
      {/* 1. NAVBAR */}
      <nav className="landing-navbar">
        <div className="landing-logo">QuadGPT</div>
        <div className="landing-nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#tech-stack">Tech Stack</a>
          <div className="landing-theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <i className="fa-solid fa-sun"></i>
            ) : (
              <i className="fa-solid fa-moon"></i>
            )}
          </div>
          <button className="landing-login-btn" onClick={handleAuthRedirect}>Login</button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header id="home" className="landing-hero">
        <div className="landing-hero-content">
          <h1 className="landing-hero-title">QuadGPT — Intelligent AI Chat Assistant</h1>
          <p className="landing-hero-subtitle">
            MERN stack AI chat platform with secure authentication, persistent conversations, and Perplexity API integration.
          </p>
          <div className="landing-hero-btns">
            <button className="landing-primary-btn" onClick={handleAuthRedirect}>Get Started</button>
            <button className="landing-secondary-btn" onClick={() => window.open("https://quadgpt-frontend-1.onrender.com/", "_blank")}>View Demo</button>
          </div>
        </div>
        <div className="landing-hero-image">
          <div className="landing-image-container">
            <img src={chatUI} alt="Chat UI" className="landing-screenshot" />
          </div>
        </div>
      </header>

      {/* 3. FEATURES SECTION */}
      <section id="features" className="landing-features-section">
        <div className="landing-section-header">
          <span className="landing-badge">Features</span>
          <h2 className="landing-section-title">Powerful Capabilities</h2>
          <p className="landing-section-subtitle">
            Experience the next generation of AI interaction with our robust feature set designed for speed, security, and intelligence.
          </p>
        </div>
        
        <div className="landing-features-grid">
          <div className="landing-feature-card">
            <div className="landing-feature-icon-container">
              <div className="landing-feature-icon-bg"></div>
              <MessageSquare className="landing-feature-icon" />
            </div>
            <div className="landing-feature-content">
              <div className="landing-feature-tag">AI-Powered</div>
              <h3>AI Conversations</h3>
              <p>Engage in deep, meaningful conversations powered by advanced AI models for unparalleled accuracy.</p>
            </div>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon-container">
              <div className="landing-feature-icon-bg"></div>
              <History className="landing-feature-icon" />
            </div>
            <div className="landing-feature-content">
              <div className="landing-feature-tag">Persistent</div>
              <h3>Chat History</h3>
              <p>Your conversations are securely saved and accessible across all your devices, anytime you need them.</p>
            </div>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon-container">
              <div className="landing-feature-icon-bg"></div>
              <ShieldCheck className="landing-feature-icon" />
            </div>
            <div className="landing-feature-content">
              <div className="landing-feature-tag">Secure</div>
              <h3>Enterprise Security</h3>
              <p>Industry-standard JWT authentication and data encryption keep your personal information private.</p>
            </div>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon-container">
              <div className="landing-feature-icon-bg"></div>
              <Moon className="landing-feature-icon" />
            </div>
            <div className="landing-feature-content">
              <div className="landing-feature-tag">Adaptive</div>
              <h3>Theme Switching</h3>
              <p>A sleek, eye-friendly interface designed for long sessions, adapting perfectly to your environment.</p>
            </div>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon-container">
              <div className="landing-feature-icon-bg"></div>
              <Code2 className="landing-feature-icon" />
            </div>
            <div className="landing-feature-content">
              <div className="landing-feature-tag">Developer Friendly</div>
              <h3>Markdown & Code</h3>
              <p>Full support for markdown rendering and syntax highlighting across hundreds of programming languages.</p>
            </div>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon-container">
              <div className="landing-feature-icon-bg"></div>
              <Smartphone className="landing-feature-icon" />
            </div>
            <div className="landing-feature-content">
              <div className="landing-feature-tag">Fast</div>
              <h3>Responsive UI</h3>
              <p>A lightning-fast, mobile-first experience that works seamlessly across all modern browsers and devices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="landing-section">
        <h2 className="landing-section-title">How It Works</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-icon-container">
              <i className="fa-solid fa-user-plus"></i>
              <div className="landing-step-num">1</div>
            </div>
            <h3>Create Account</h3>
            <p>Sign up in seconds to start your personalized journey.</p>
          </div>
          <div className="landing-step">
            <div className="landing-step-icon-container">
              <i className="fa-solid fa-paper-plane"></i>
              <div className="landing-step-num">2</div>
            </div>
            <h3>Send Message</h3>
            <p>Ask anything, from complex code to creative writing.</p>
          </div>
          <div className="landing-step">
            <div className="landing-step-icon-container">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <div className="landing-step-num">3</div>
            </div>
            <h3>Get AI Response</h3>
            <p>Receive instant, accurate, and intelligent responses.</p>
          </div>
        </div>
      </section>

      {/* 5. TECH STACK */}
      <section id="tech-stack" className="landing-section">
        <h2 className="landing-section-title">Tech Stack</h2>
        <div className="landing-tech-grid">
          <div className="landing-tech-box">
            <i className="fa-brands fa-react landing-tech-icon" style={{color: '#61DAFB'}}></i>
            <span>React (Frontend)</span>
          </div>
          <div className="landing-tech-box">
            <i className="fa-brands fa-node-js landing-tech-icon" style={{color: '#339933'}}></i>
            <span>Node.js + Express (Backend)</span>
          </div>
          <div className="landing-tech-box">
            <i className="fa-solid fa-database landing-tech-icon" style={{color: '#47A248'}}></i>
            <span>MongoDB (Database)</span>
          </div>
          <div className="landing-tech-box">
            <i className="fa-solid fa-microchip landing-tech-icon" style={{color: '#7B3FE4'}}></i>
            <span>Perplexity API (AI)</span>
          </div>
        </div>
      </section>

      {/* 6. DEMO SECTION */}
      <section id="demo" className="landing-demo-section">
        <div className="landing-section-header">
          <span className="landing-badge"></span>
          <h2 className="landing-demo-title">Experience the Interface</h2>
          <p className="landing-section-subtitle">
            Explore how QuadGPT delivers a seamless AI experience through a modern, intuitive chat interface.
          </p>
        </div>
        
        <div className="landing-demo-wrapper">
          <div className="landing-demo-container">
            <div className="landing-demo-badge top-left">
              <Zap size={14} /> AI Powered
            </div>
            <div className="landing-demo-badge top-right">
              <Cpu size={14} /> Fast Response
            </div>
            <div className="landing-demo-badge bottom-left">
              <Lock size={14} /> Secure
            </div>
            <img src={chatScreenshot} alt="Chat Screenshot" className="landing-screenshot" />
            <div className="landing-demo-overlay"></div>
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="landing-cta-section">
        <div className="landing-cta-content">
          <h2 className="landing-cta-title">Start building smarter with QuadGPT</h2>
          <p className="landing-cta-subtitle">
            Join developers and creators using QuadGPT to build faster, smarter, and more efficiently with the power of advanced AI.
          </p>
          <div className="landing-cta-actions">
            <button className="landing-cta-btn" onClick={handleAuthRedirect}>
              Get Started for Free <span className="arrow">→</span>
            </button>
            <p className="landing-cta-microtext">No credit card required • Free to get started</p>
          </div>
        </div>
        <div className="landing-cta-glow"></div>
      </section>

      {/* 8. FOOTER */}
      <footer className="landing-footer">
        <div>© {new Date().getFullYear()} Ankit Sharma</div>
        <div>QuadGPT — Intelligent AI Assistant</div>
      </footer>
    </div>
  );
};

export default LandingPage;
