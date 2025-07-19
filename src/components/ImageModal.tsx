import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectMedia } from '../types';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ProjectMedia[];
  initialIndex?: number;
  projectTitle: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  projectTitle
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
          break;
        case 'ArrowRight':
          setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, images.length]);

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-4xl w-full max-h-[90vh] bg-background rounded-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div>
              <h3 className="text-lg font-semibold">{projectTitle}</h3>
              <p className="text-sm text-foreground/70">
                {images[currentIndex].label} ({currentIndex + 1} of {images.length})
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Image Container */}
          <div className="relative aspect-[16/9] bg-secondary">
            <AnimatePresence mode="wait">
              {images[currentIndex].type === 'video' ? (
                <motion.video
                  key={currentIndex}
                  src={images[currentIndex].src}
                  className="w-full h-full object-contain"
                  autoPlay
                  muted
                  playsInline
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onEnded={() => {
                    if (currentIndex < images.length - 1) {
                      setCurrentIndex(currentIndex + 1);
                    }
                  }}
                />
              ) : (
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex].src}
                  alt={images[currentIndex].label}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {images.length > 1 && (
            <div className="p-4 border-t border-border">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentIndex
                        ? 'border-primary'
                        : 'border-border hover:border-foreground/50'
                    }`}
                  >
                    {media.type === 'video' ? (
                      <video
                        src={media.src}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={media.src}
                        alt={media.label}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal; 