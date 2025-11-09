import React from 'react';
import { Spinner } from './Spinner';
import { FullScreenIcon, SaveIcon, TrashIcon } from './icons';

interface ImageDisplayProps {
  imageSrc: string | null;
  isLoading: boolean;
  loadingMessage: string;
  onFullScreenClick?: () => void;
  onSaveClick?: () => void;
  aspectRatio?: number | null;
  onUploadClick: () => void;
  onDeleteClick: () => void;
  canDelete: boolean;
  isDraggingOver: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageSrc, isLoading, loadingMessage, onFullScreenClick, onSaveClick, aspectRatio, onUploadClick, onDeleteClick, canDelete, isDraggingOver }) => {

  return (
    <div
      className="relative w-full h-[600px] bg-black rounded-[32px] overflow-hidden flex items-center justify-center"
    >
      {isLoading && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-20">
          <Spinner />
          <p className="mt-4 text-lg text-white">{loadingMessage}</p>
        </div>
      )}
      
      {isDraggingOver && (
        <div className="absolute inset-0 bg-black/20 border-4 border-dashed border-white rounded-[28px] z-30 flex items-center justify-center pointer-events-none">
          <p className="text-white text-2xl font-bold">Перетащите сюда</p>
        </div>
      )}

      {!imageSrc && !isLoading && (
         <button
           type="button"
           onClick={onUploadClick}
           className="w-full h-[600px] flex flex-col items-center justify-center text-center text-gray-400 p-4 rounded-[32px] bg-black hover:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
           aria-label="Upload photo"
         >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span className="mt-4 text-lg font-semibold text-gray-500">Загрузить фото</span>
        </button>
      )}

      {imageSrc && (
        <img
          src={imageSrc}
          alt="Generated Art"
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      )}

      {/* Action buttons positioned over the image */}
      {imageSrc && !isLoading && (
        <>
          {canDelete && (
            <div className="absolute z-20 top-4 left-4">
              <button
                onClick={(e) => { e.stopPropagation(); onDeleteClick(); }}
                className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
                aria-label="Delete photo"
              >
                <TrashIcon />
              </button>
            </div>
          )}
          <div className="absolute flex items-center gap-2 z-20 top-4 right-4">
            {onSaveClick && (
              <button 
                onClick={(e) => { e.stopPropagation(); onSaveClick(); }}
                className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
                aria-label="Save painting"
              >
                <SaveIcon />
              </button>
            )}
            {onFullScreenClick && (
              <button 
                onClick={(e) => { e.stopPropagation(); onFullScreenClick(); }}
                className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
                aria-label="View fullscreen"
              >
                <FullScreenIcon />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};