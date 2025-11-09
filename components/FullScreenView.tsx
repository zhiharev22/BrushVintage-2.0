import React from 'react';
import { CloseIcon } from './icons';

interface FullScreenViewProps {
  imageSrc: string;
  onClose: () => void;
}

export const FullScreenView: React.FC<FullScreenViewProps> = ({ imageSrc, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Close fullscreen view"
      >
        <CloseIcon />
      </button>
      
      <div 
        className="relative max-w-full max-h-full"
        // Stop propagation to prevent closing the modal when clicking the image itself
        onClick={(e) => e.stopPropagation()} 
      >
        <img 
          src={imageSrc} 
          alt="Generated painting in fullscreen" 
          className="max-w-full max-h-[90vh] object-contain"
        />
      </div>
    </div>
  );
};
