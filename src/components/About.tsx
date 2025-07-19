import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Layout, Terminal, PenTool, Lightbulb, Cpu } from 'lucide-react';

const About: React.FC = () => {
  const [showColor, setShowColor] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (inView) {
      timeout = setTimeout(() => {
        setShowColor(true);
      }, 500);
    } else {
      setShowColor(false);
    }
    return () => clearTimeout(timeout);
  }, [inView]);

  const skills = [
    { name: 'Frontend Development', icon: <Layout className="h-5 w-5" /> },
    { name: 'Backend Development', icon: <Terminal className="h-5 w-5" /> },
    { name: 'UI/UX Design', icon: <PenTool className="h-5 w-5" /> },
    { name: 'Problem Solving', icon: <Lightbulb className="h-5 w-5" /> },
    { name: 'Clean Code', icon: <Code className="h-5 w-5" /> },
    { name: 'Performance Optimization', icon: <Cpu className="h-5 w-5" /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="py-24 bg-primary">
      <div className="container" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            className="section-title text-center"
            variants={itemVariants}
          >
            About Me
          </motion.h2>

          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={itemVariants}
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-secondary">
              <img 
                src="/images/profile.webp" 
                alt="Alexander Da Costa" 
                className={`w-full h-full object-cover transition-[filter] duration-1000 ease-in-out ${
                  showColor ? 'filter-none' : 'grayscale'
                }`}
              />
            </div>

            <div>
              <motion.p 
                className="text-lg leading-relaxed mb-6 text-foreground/90"
                variants={itemVariants}
              >
                I'm a passionate developer and designer with over 3 years of experience creating digital experiences that people love. I specialize in building modern, responsive websites and applications with clean, efficient code.
              </motion.p>
              
              <motion.p 
                className="text-lg leading-relaxed mb-8 text-foreground/90"
                variants={itemVariants}
              >
                My approach combines technical expertise with creative problem-solving to deliver solutions that are both beautiful and functional. I'm constantly learning and adapting to new technologies and design trends.
              </motion.p>

              <motion.h3 
                className="text-xl font-bold mb-4"
                variants={itemVariants}
              >
                My Skills
              </motion.h3>

              <motion.div 
                className="grid grid-cols-2 gap-4"
                variants={itemVariants}
              >
                {skills.map((skill, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-2 text-foreground/90"
                    variants={itemVariants}
                  >
                    {skill.icon}
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;