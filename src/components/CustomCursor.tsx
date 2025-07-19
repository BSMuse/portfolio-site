import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [hovering, setHovering] = useState(false);
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);
    
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('interactive');
      
      setHovering(!!isInteractive);
    };
    
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  // Only show custom cursor on non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }
  
  return (
    <div 
      className={`custom-cursor ${hovering ? 'hover' : ''}`} 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        opacity: visible ? 1 : 0,
        transform: `translate(-50%, -50%) scale(${hovering ? 1.5 : 1})`
      }}
    />
  );
};

export default CustomCursor;