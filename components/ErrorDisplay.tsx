import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onClose: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onClose }) => {
  return (
    <div className="p-4 bg-gray-100 border border-gray-300 text-black rounded-lg flex justify-between items-center shadow-sm">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-gray-600 hover:text-black transition-colors"
        aria-label="Close error message"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};