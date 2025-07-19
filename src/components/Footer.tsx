import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-background border-t border-foreground/10">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-mono font-bold mb-2">
              ALEXANDER<span className="text-accent">.</span>
            </div>
            <p className="text-foreground/60 text-sm">
              Developer & Designer
            </p>
          </div>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:hello@example.com" className="text-foreground/70 hover:text-foreground transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-foreground/60">
            © {currentYear} Alexander Da Costa. All rights reserved.
          </div>
          
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-wrap gap-6 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer