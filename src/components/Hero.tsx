import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-30 animate-gradient-shift"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(55,55,55,0.3),transparent_70%)]"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Alexander Da Costa
          </motion.h1>

          <motion.h2 
            className="text-xl md:text-2xl font-mono text-accent mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Developer & Designer
          </motion.h2>

          <motion.p 
            className="text-lg md:text-xl text-foreground/80 mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            I create beautiful, functional digital experiences with a focus on performance and user experience.
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <a href="#contact" className="btn-primary">
              Get in touch
            </a>
            <a href="#projects" className="btn-outline">
              View my work
            </a>
          </motion.div>

          <motion.div 
            className="flex justify-center space-x-6 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <a href="https://github.com/BSMuse" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
              <Github size={22} />
            </a>
            <a href="https://www.linkedin.com/in/alexander-dacosta/" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
              <Linkedin size={22} />
            </a>
            <a href="mailto:alexander.a.dacosta@gmail.com" className="text-foreground/70 hover:text-foreground transition-colors">
              <Mail size={22} />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex flex-col items-center text-foreground/50 hover:text-foreground transition-colors"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 1.1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <span className="text-sm mb-2">Scroll down</span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
};

export default Hero;