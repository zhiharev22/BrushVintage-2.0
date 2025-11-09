import React, { useState, useRef, useCallback } from 'react';
import { ActionButton } from './ControlPanel';

interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CropperProps {
  imageUrl: string;
  onCropComplete: (croppedImageUrl: string, aspectRatio: number) => void;
  onCancel: () => void;
}

export const Cropper: React.FC<CropperProps> = ({ imageUrl, onCropComplete, onCancel }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [crop, setCrop] = useState<Crop | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const getMousePos = (e: React.MouseEvent<HTMLDivElement>): { x: number; y: number } => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { x, y } = getMousePos(e);
    setIsDragging(true);
    setStartPos({ x, y });
    setCrop({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const { x: currentX, y: currentY } = getMousePos(e);
    const width = currentX - startPos.x;
    const height = currentY - startPos.y;

    setCrop({
      x: width > 0 ? startPos.x : currentX,
      y: height > 0 ? startPos.y : startPos.y + height,
      width: Math.abs(width),
      height: Math.abs(height),
    });
  }, [isDragging, startPos]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCrop = () => {
    if (!imageRef.current || !crop || crop.width === 0 || crop.height === 0) {
      return;
    }

    const image = imageRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(crop.width * scaleX);
    canvas.height = Math.floor(crop.height * scaleY);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const base64Image = canvas.toDataURL('image/jpeg', 0.9);
    const croppedAspectRatio = canvas.width / canvas.height;
    onCropComplete(base64Image, croppedAspectRatio);
  };
  
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <header className="p-6 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Crop Image</h2>
        </header>

        <div className="p-6 flex-1 flex flex-col md:flex-row gap-6 min-h-0">
          <div
            ref={containerRef}
            className="relative select-none w-full flex-1 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={imageUrl}
              className="max-w-full max-h-full object-contain"
              alt="Image to crop"
              style={{ pointerEvents: 'none' }}
            />
            {crop && (
              <div
                className="absolute border-2 border-dashed border-white cursor-crosshair"
                style={{
                  left: crop.x,
                  top: crop.y,
                  width: crop.width,
                  height: crop.height,
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
                }}
              />
            )}
          </div>
        </div>

        <footer className="p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end items-center gap-4">
            <div className="flex items-center gap-4">
                <ActionButton onClick={onCancel} disabled={false} text="Cancel" variant="outline" />
                <ActionButton
                onClick={handleCrop}
                disabled={!crop || crop.width === 0 || crop.height === 0}
                text="Crop and Continue"
                variant="primary"
                />
            </div>
        </footer>
      </div>
    </div>
  );
};
