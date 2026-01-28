import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedList = ({
  items = [],
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  displayScrollbar = true,
  initialSelectedIndex = -1,
  className = '',
  itemClassName = '',
  renderItem,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const listRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (enableArrowNavigation) {
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
          e.preventDefault();
          setKeyboardNav(true);
          setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
        } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
          e.preventDefault();
          setKeyboardNav(true);
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
          onItemSelect?.(items[selectedIndex], selectedIndex);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [enableArrowNavigation, items, selectedIndex, onItemSelect]);

  useEffect(() => {
    if (keyboardNav && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex, keyboardNav]);

  const handleItemClick = (item, index) => {
    setSelectedIndex(index);
    setKeyboardNav(false);
    onItemSelect?.(item, index);
  };

  return (
    <div className={`animated-list-container ${className}`} style={{ position: 'relative' }}>
      {showGradients && (
        <>
          <div className="animated-list-gradient-top" />
          <div className="animated-list-gradient-bottom" />
        </>
      )}
      <div
        ref={listRef}
        className={`animated-list ${displayScrollbar ? 'show-scrollbar' : 'hide-scrollbar'}`}
        style={{
          padding: '1rem 0',
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id || index}
            ref={(el) => (itemRefs.current[index] = el)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onClick={() => handleItemClick(item, index)}
            className={`animated-list-item ${itemClassName} ${selectedIndex === index ? 'selected' : ''}`}
            style={{
              padding: '1rem 1.5rem',
              margin: '0.5rem 0',
              cursor: 'pointer',
              borderRadius: '4px',
              background: selectedIndex === index 
                ? 'rgba(0, 255, 255, 0.1)' 
                : 'rgba(0, 20, 30, 0.6)',
              border: selectedIndex === index 
                ? '1px solid rgba(0, 255, 255, 0.4)' 
                : '1px solid rgba(0, 255, 255, 0.1)',
              transition: 'all 0.2s ease',
            }}
            whileHover={{
              background: 'rgba(0, 255, 255, 0.15)',
              borderColor: 'rgba(0, 255, 255, 0.3)',
            }}
          >
            {renderItem ? renderItem(item, index) : (
              <span style={{ color: '#fff' }}>{item.title || item}</span>
            )}
          </motion.div>
        ))}
      </div>
      
      <style>{`
        .animated-list-container {
          position: relative;
        }
        
        .animated-list-gradient-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 40px;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent);
          pointer-events: none;
          z-index: 10;
        }
        
        .animated-list-gradient-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          pointer-events: none;
          z-index: 10;
        }
        
        .animated-list.hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .animated-list.hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .animated-list.show-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .animated-list.show-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 20, 30, 0.5);
        }
        
        .animated-list.show-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.3);
          border-radius: 3px;
        }
        
        .animated-list.show-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 255, 0.5);
        }
        
        .animated-list-item.selected {
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default AnimatedList;
