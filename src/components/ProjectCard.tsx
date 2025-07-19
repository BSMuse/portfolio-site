import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';
import ImageModal from './ImageModal';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-advance carousel on hover
  useEffect(() => {
    if (!isHovering || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % project.images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [isHovering, project.images.length]);

  // Reset to first image when hover ends
  useEffect(() => {
    if (!isHovering) {
      setCurrentImageIndex(0);
    }
  }, [isHovering]);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.article
        className="group h-full bg-secondary rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 relative isolate"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Remove shimmer and tilt */}
          <div className="relative overflow-hidden aspect-[16/9] interactive" onClick={handleImageClick}>
            {/* Carousel Images */}
            <div className="relative w-full h-full">
              {project.images.map((media, index) => (
                media.type === 'video' ? (
                  <motion.video
                    key={index}
                    src={media.src}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    initial={{ opacity: index === 0 ? 1 : 0 }}
                    animate={{ 
                      opacity: index === currentImageIndex ? 1 : 0,
                      scale: index === currentImageIndex ? 1 : 1.05
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                ) : (
                  <motion.img
                    key={index}
                    src={media.src}
                    alt={media.label}
                    className="absolute inset-0 w-full h-full object-contain"
                    initial={{ opacity: index === 0 ? 1 : 0 }}
                    animate={{ 
                      opacity: index === currentImageIndex ? 1 : 0,
                      scale: index === currentImageIndex ? 1 : 1.05
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                )
              ))}
            </div>

            {/* Image Counter */}
            {project.images.length > 1 && (
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            )}

            {/* Click to view overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <button className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full transition-opacity duration-300">
                {isHovering ? 'Click to view gallery' : 'Hover to preview gallery'}
              </button>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-foreground/70 mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-xs px-2 py-1 bg-background rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex gap-4">
              {project.demoUrl && (
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>Demo</span>
                </a>
              )}
              
              {project.codeUrl && (
                <a 
                  href={project.codeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Github size={16} />
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>
        </motion.article>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={project.images}
        initialIndex={currentImageIndex}
        projectTitle={project.title}
      />
    </>
  );
};

export default ProjectCard;