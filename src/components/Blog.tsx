import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, Calendar, Clock, User } from 'lucide-react';
import BlogCard from './BlogCard';
import { blogPosts } from '../data/blogData';
import { BlogPost } from '../types';

interface BlogProps {
  onPostClick: (post: BlogPost) => void;
}

const Blog: React.FC<BlogProps> = ({ onPostClick }) => {
  const [filter, setFilter] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const uniqueTags = ['all', ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))];
  
  const filteredPosts = filter === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.tags.includes(filter));

  const visiblePosts = showAll ? filteredPosts : filteredPosts.slice(0, 6);

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
    <section id="blog" className="py-24">
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
            Blog
          </motion.h2>

          <motion.p 
            className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Thoughts, tutorials, and insights about web development, technology, and the ever-evolving world of programming.
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={itemVariants}
          >
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setFilter(tag);
                  setShowAll(false);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === tag
                    ? 'bg-foreground text-background'
                    : 'bg-secondary hover:bg-secondary/70'
                }`}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {visiblePosts.map((post) => (
              <BlogCard key={post.id} post={post} onClick={() => onPostClick(post)} />
            ))}
          </motion.div>

          {filteredPosts.length > 6 && (
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="group inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                <span className="text-lg font-medium">
                  {showAll ? 'Show Less' : 'Show More'}
                </span>
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${
                    showAll ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
