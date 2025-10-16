import React from 'react';

const Viewfinder = () => {
  return (
    <>
      <div className="rec-indicator">
        <span className="rec-dot"></span>
        <span>REC</span>
      </div>
      {/* <div className="timer">余永康</div> */}
      <div className="location">Sunnyvale, California</div>
      <div className="quality">&copy; Phoebe Royer 2025</div>
    </>
  );
};

export default Viewfinder;