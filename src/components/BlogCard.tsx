import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ExternalLink } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      className="group bg-secondary/30 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        {/* Featured Badge */}
        {post.featured && (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30">
              Featured
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-foreground/70 mb-4 flex-grow line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mb-4">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-md text-xs bg-background/50 text-foreground/70 border border-border/30"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-2 py-1 rounded-md text-xs bg-background/50 text-foreground/70 border border-border/30">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        {/* Read More Button */}
        <motion.button
          className="group/btn flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-300 font-medium"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <span>Read More</span>
          <motion.div
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ExternalLink size={16} />
          </motion.div>
        </motion.button>
      </div>
    </motion.article>
  );
};

export default BlogCard;
