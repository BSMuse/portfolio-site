import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { experience, education, certifications } from '../data/resumeData';

const Resume: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
    <section id="resume" className="py-24 bg-primary">
      <div className="container" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2 
            className="section-title text-center mb-12"
            variants={itemVariants}
          >
            Resume
          </motion.h2>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8">
            {/* Experience */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="text-accent" />
                <h3 className="text-xl font-bold">Experience</h3>
              </div>
              
              <div className="space-y-8">
                {experience.map((item, index) => (
                  <div key={index} className="bg-secondary p-6 rounded-lg">
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-accent mb-2">{item.period}</p>
                    <p className="text-foreground/70">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div 
              variants={itemVariants}
              className="hidden md:block w-px bg-foreground/10 relative mx-auto"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent"></div>
            </motion.div>

            {/* Education & Awards */}
            <motion.div variants={itemVariants}>
              <div className="space-y-12">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <GraduationCap className="text-accent" />
                    <h3 className="text-xl font-bold">Education</h3>
                  </div>
                  
                  {education.map((item, index) => (
                    <div key={index} className="bg-secondary p-6 rounded-lg mb-4">
                      <h4 className="font-bold mb-1">{item.degree}</h4>
                      <p className="text-sm text-accent mb-2">{item.period}</p>
                      <p className="text-foreground/70">{item.institution}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="text-accent" />
                    <h3 className="text-xl font-bold">Certifications</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {certifications.map((item, index) => (
                      <div key={index} className="bg-secondary p-6 rounded-lg">
                        <h4 className="font-bold mb-1">{item.title}</h4>
                        <p className="text-sm text-accent">{item.year}</p>
                        {item.issuer && (
                          <p className="text-foreground/70 text-sm">{item.issuer}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;