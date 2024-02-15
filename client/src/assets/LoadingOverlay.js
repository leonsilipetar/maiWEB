import React from 'react';
import './LoadingOverlay.css'; // Import the CSS for styling

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingOverlay;
