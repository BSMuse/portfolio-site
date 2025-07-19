import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Resume', href: '#resume' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrolled(position > 50);
      
      const sections = ['home', 'about', 'resume', 'projects', 'contact'];
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 mix-blend-difference ${
      scrolled ? 'bg-background/90 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5'
    }`}>
      <div className="container flex items-center justify-between">
        <motion.a 
          href="#home"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-mono font-bold"
        >
          ALEXANDER<span className="text-accent">.</span>
        </motion.a>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className={`nav-link ${activeSection === item.href.substring(1) ? 'active' : ''}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
        
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isOpen && (
        <motion.nav 
          className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col py-4">
            {navItems.map((item) => (
              <a 
                key={item.href}
                href={item.href}
                className="py-3 px-6 hover:bg-foreground/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </header>
  );
};

export default Header;