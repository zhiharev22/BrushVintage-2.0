import React, { useState } from 'react';
import { backgrounds } from '../data/backgrounds';
import { CloseIcon, UploadIcon } from './icons';
import { Spinner } from './Spinner';

interface BackgroundSelectorProps {
  onClose: () => void;
  onSelect: (source: string | File) => void;
}

export const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ onClose, onSelect }) => {
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  const handleSelect = (source: string | File, key: string) => {
    if (loadingKey) return;
    setLoadingKey(key);
    onSelect(source);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleSelect(file, 'custom-upload');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Выберите фон</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Close background selector"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {backgrounds.map((bg) => (
              <div
                key={bg.id}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group border-2 border-transparent hover:border-indigo-500 transition-all"
                onClick={() => handleSelect(bg.url, bg.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelect(bg.url, bg.id);
                    }
                }}
                aria-label={`Select background: ${bg.name}`}
              >
                <img
                  src={bg.url}
                  alt={bg.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                {loadingKey === bg.id && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                        <Spinner />
                    </div>
                )}
              </div>
            ))}
             <label
                htmlFor="background-upload"
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-all flex flex-col items-center justify-center text-gray-500 hover:text-indigo-600 p-4 text-center"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        document.getElementById('background-upload')?.click();
                    }
                }}
             >
                <UploadIcon />
                <span className="mt-2 text-sm font-semibold">Загрузить свой</span>
                <input
                    id="background-upload"
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileChange}
                    disabled={!!loadingKey}
                />
                 {loadingKey === 'custom-upload' && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                        <Spinner />
                    </div>
                )}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
