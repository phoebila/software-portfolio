import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Dock = ({ items, activeItem, onNavigate, isLanding = false }) => {
  return (
    <motion.nav
      className="dock"
      key={isLanding ? 'landing' : 'page'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        zIndex: 100,
        position: 'fixed',
        top: isLanding ? 'calc(50% + 120px)' : '50%',
        left: isLanding ? '50%' : '20px',
        transform: isLanding ? 'translateX(-50%)' : 'translateY(-50%)',
      }}
    >
      <motion.div 
        layout
        style={{
          display: 'flex',
          flexDirection: isLanding ? 'row' : 'column',
          alignItems: 'center',
          gap: isLanding ? '4px' : '2px',
          padding: isLanding ? '8px 16px' : '12px 8px',
          background: 'rgba(0, 20, 30, 0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '4px',
          border: '1px solid rgba(0, 255, 255, 0.2)',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.1), inset 0 0 30px rgba(0, 0, 0, 0.3)',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <motion.button
              layout
              onClick={() => onNavigate(item.id)}
              style={{
                background: activeItem === item.id 
                  ? 'rgba(0, 255, 255, 0.15)' 
                  : 'transparent',
                border: activeItem === item.id 
                  ? '1px solid rgba(0, 255, 255, 0.4)'
                  : '1px solid transparent',
                padding: isLanding ? '8px 20px' : '10px 16px',
                borderRadius: '2px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s ease, border-color 0.2s ease',
                width: isLanding ? 'auto' : '100%',
              }}
              whileHover={{ 
                background: 'rgba(0, 255, 255, 0.1)',
                borderColor: 'rgba(0, 255, 255, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ layout: { duration: 0.4, ease: 'easeInOut' } }}
            >
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: activeItem === item.id ? '#00ffff' : 'rgba(255, 255, 255, 0.7)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                fontFamily: 'monospace',
                textShadow: activeItem === item.id 
                  ? '0 0 10px rgba(0, 255, 255, 0.8)' 
                  : 'none',
              }}>
                {item.label}
              </span>
              
              <AnimatePresence>
                {activeItem === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    style={{
                      position: 'absolute',
                      bottom: isLanding ? '-12px' : '50%',
                      left: isLanding ? '50%' : '-8px',
                      transform: isLanding ? 'translateX(-50%)' : 'translateY(50%)',
                      width: '4px',
                      height: '4px',
                      background: '#00ffff',
                      boxShadow: '0 0 10px rgba(0, 255, 255, 1), 0 0 20px rgba(0, 255, 255, 0.6)',
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
            
            {/* Separator */}
            {index < items.length - 1 && (
              <motion.div 
                layout
                style={{
                  width: isLanding ? '1px' : '80%',
                  height: isLanding ? '20px' : '1px',
                  background: 'rgba(0, 255, 255, 0.2)',
                  alignSelf: 'center',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </motion.nav>
  );
};

export default Dock;
