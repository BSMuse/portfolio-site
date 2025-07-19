import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    // For Netlify forms, we can still handle client-side logic
    // but the form will be submitted to Netlify automatically
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after showing success message
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

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
    <section id="contact" className="py-24 bg-primary">
      <div className="container" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-2xl mx-auto"
        >
          <motion.h2 
            className="section-title text-center"
            variants={itemVariants}
          >
            Get In Touch
          </motion.h2>
          
          <motion.p 
            className="text-center text-foreground/80 mb-12"
            variants={itemVariants}
          >
            Interested in working together? Feel free to reach out!
          </motion.p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-secondary p-8 rounded-xl text-center"
            >
              <h3 className="text-xl font-bold mb-2">Thanks for reaching out!</h3>
              <p className="text-foreground/80">I'll get back to you as soon as possible.</p>
            </motion.div>
          ) : (
            <motion.form 
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              variants={containerVariants}
              className="space-y-6"
            >
              {/* Hidden honeypot field for spam protection */}
              <input type="hidden" name="form-name" value="contact" />
              <div className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </div>

              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary border border-foreground/10 rounded-lg focus:ring-2 focus:ring-accent/30 focus:border-accent/50 outline-none transition-all"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary border border-foreground/10 rounded-lg focus:ring-2 focus:ring-accent/30 focus:border-accent/50 outline-none transition-all"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary border border-foreground/10 rounded-lg focus:ring-2 focus:ring-accent/30 focus:border-accent/50 outline-none transition-all resize-none"
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="!mt-10">
                <button
                  type="submit"
                  className="w-full btn-primary py-3 flex items-center justify-center"
                >
                  <span>Send Message</span>
                  <Send size={18} />
                </button>
              </motion.div>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;