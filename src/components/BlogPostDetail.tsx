import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from '../types';

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen py-24"
    >
      <div className="container max-w-4xl">
        {/* Back Button */}
        <motion.button
          variants={itemVariants}
          onClick={onBack}
          className="group flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors duration-300 mb-8"
        >
          <motion.div
            animate={{ x: -4 }}
            transition={{ duration: 0.2 }}
            className="group-hover:animate-pulse"
          >
            <ArrowLeft size={20} />
          </motion.div>
          <span>Back to Blog</span>
        </motion.button>

        {/* Featured Badge */}
        {post.featured && (
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/20 text-accent border border-accent/30">
              Featured Post
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
        >
          {post.title}
        </motion.h1>

        {/* Meta Information */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap items-center gap-6 text-foreground/70 mb-8 pb-8 border-b border-border/30"
        >
          <div className="flex items-center gap-2">
            <User size={18} />
            <span className="font-medium">{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>{post.readTime}</span>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap gap-3 mb-12"
        >
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-sm bg-secondary/50 text-foreground/80 border border-border/30"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div 
          variants={itemVariants}
          className="prose prose-lg prose-invert max-w-none"
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mb-6 mt-12 first:mt-0">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold mb-4 mt-10">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold mb-3 mt-8">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-6 leading-relaxed text-foreground/90">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mb-6 pl-6 space-y-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-6 pl-6 space-y-2">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-foreground/90">{children}</li>
              ),
              code: ({ children }) => (
                <code className="px-2 py-1 rounded bg-background/50 text-accent border border-border/30 text-sm">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="mb-6 p-4 rounded-lg bg-background/50 border border-border/30 overflow-x-auto">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-accent pl-6 my-6 italic text-foreground/80">
                  {children}
                </blockquote>
              ),
              a: ({ children, href }) => (
                <a 
                  href={href} 
                  className="text-accent hover:text-accent/80 transition-colors duration-300 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* Back to Top */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-border/30"
        >
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors duration-300"
          >
            <motion.div
              animate={{ x: -4 }}
              transition={{ duration: 0.2 }}
              className="group-hover:animate-pulse"
            >
              <ArrowLeft size={20} />
            </motion.div>
            <span>Back to Blog</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogPostDetail;
