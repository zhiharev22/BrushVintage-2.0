import React, { useState, useRef, useCallback } from 'react';
import { generatePaintingFromImage } from './services/geminiService';
import { fileToGenerativePart } from './utils/imageUtils';
import { ImageDisplay } from './components/ImageDisplay';
import { ActionButton } from './components/ControlPanel';
import { Header } from './components/Header';
import { ErrorDisplay } from './components/ErrorDisplay';
import { FullScreenView } from './components/FullScreenView';
import { artistsByCentury, artistPrompts, Artist } from './data/artists';
import { ChevronDownIcon } from './components/icons';
// FIX: Replaced deprecated 'GenerativePart' with 'Part' using an alias, as 'GenerativePart' is no longer exported from '@google/genai'.
import type { Part as GenerativePart } from '@google/genai';

const App: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<GenerativePart | null>(null);
  const [sourceImagePreview, setSourceImagePreview] = useState<string | null>(null);
  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const initialCentury = Object.keys(artistsByCentury)[2]; // Default to 18th century
  const [selectedCentury, setSelectedCentury] = useState<string>(initialCentury);
  const [selectedArtist, setSelectedArtist] = useState<Artist>(artistsByCentury[initialCentury][0]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReset = useCallback(() => {
    setSourceImage(null);
    setSourceImagePreview(null);
    setImageAspectRatio(null);
    setGeneratedImage(null);
    
    const defaultCentury = Object.keys(artistsByCentury)[2];
    setSelectedCentury(defaultCentury);
    setSelectedArtist(artistsByCentury[defaultCentury][0]);

    setIsLoading(false);
    setLoadingMessage('');
    setError(null);
    setFullScreenImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const processFile = useCallback(async (file: File) => {
    if (!file) {
      return;
    }

    handleReset();
    setIsLoading(true);
    setLoadingMessage('Загрузка изображения...');
    setError(null);

    try {
      const { generativePart, previewUrl } = await fileToGenerativePart(file);

      const img = new Image();
      img.onload = () => {
        setImageAspectRatio(img.naturalWidth / img.naturalHeight);
        setSourceImage(generativePart);
        setSourceImagePreview(previewUrl);
        setIsLoading(false);
        setLoadingMessage('');
      };
      img.onerror = () => {
        setError('Не удалось загрузить изображение для определения размеров.');
        setIsLoading(false);
        setLoadingMessage('');
        handleReset();
      };
      img.src = previewUrl;

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Произошла неизвестная ошибка.';
      setError(`Не удалось обработать файл: ${message}`);
      console.error(err);
      handleReset();
      setIsLoading(false);
      setLoadingMessage('');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [handleReset]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoading) {
      setIsDraggingOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    if (isLoading) return;
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const handleGeneratePainting = useCallback(async () => {
    const imageToPaint = sourceImage;
    if (!imageToPaint) {
      setError('Пожалуйста, сначала загрузите изображение.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setLoadingMessage(`Создание картины в стиле ${selectedArtist}...`);

    try {
      const prompt = artistPrompts[selectedArtist];
      const resultBase64 = await generatePaintingFromImage(imageToPaint, prompt);
      setGeneratedImage(resultBase64);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Произошла неизвестная ошибка.';
      setError(`Не удалось создать картину: ${message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [sourceImage, selectedArtist]);

  const handleSavePainting = useCallback(() => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    
    const mimeType = generatedImage.split(';')[0].split(':')[1];
    const extension = mimeType.split('/')[1] || 'png';
    
    link.download = `${selectedArtist.toLowerCase()}_painting.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [generatedImage, selectedArtist]);

  const canPerformActions = !!sourceImage;

  const handleCenturyChange = (century: string) => {
    setSelectedCentury(century);
    const newArtist = artistsByCentury[century][0];
    setSelectedArtist(newArtist);
  };
  
  const currentArtists = artistsByCentury[selectedCentury];

  return (
    <div 
      className="flex items-center justify-center min-h-screen"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="w-full max-w-[560px] bg-white rounded-3xl p-6 sm:p-8 flex flex-col gap-6 text-black font-sans">
        <Header />
        
        <main className="flex flex-col min-h-0 gap-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
          />

          {error && <ErrorDisplay message={error} onClose={() => setError(null)} />}
          
          <ImageDisplay
            imageSrc={generatedImage || sourceImagePreview}
            isLoading={isLoading && !loadingMessage.includes('Загрузка')}
            loadingMessage={loadingMessage}
            onFullScreenClick={() => {
              const imageToShow = generatedImage || sourceImagePreview;
              if (imageToShow) setFullScreenImage(imageToShow);
            }}
            onSaveClick={generatedImage ? handleSavePainting : undefined}
            aspectRatio={imageAspectRatio}
            onUploadClick={() => fileInputRef.current?.click()}
            onDeleteClick={handleReset}
            canDelete={!!sourceImage}
            isDraggingOver={isDraggingOver}
          />
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-lg">
            <div className="flex gap-4">
                <div className="relative w-1/2">
                    <label htmlFor="century-selector" className="sr-only">Век</label>
                      <select
                        id="century-selector"
                        value={selectedCentury}
                        onChange={(e) => handleCenturyChange(e.target.value)}
                        disabled={!canPerformActions || isLoading}
                        className={`w-full appearance-none bg-white border border-gray-300 rounded-lg h-11 pl-4 pr-10 text-black font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 text-sm ${(!canPerformActions || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}`}
                    >
                        {Object.keys(artistsByCentury).map((century) => (
                            <option key={century} value={century}>
                                {century}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black">
                        <ChevronDownIcon />
                    </div>
                </div>

                <div className="relative w-1/2">
                    <label htmlFor="artist-selector" className="sr-only">Художник</label>
                    <select
                        id="artist-selector"
                        value={selectedArtist}
                        onChange={(e) => setSelectedArtist(e.target.value as Artist)}
                        disabled={!canPerformActions || isLoading}
                        className={`w-full appearance-none bg-white border border-gray-300 rounded-lg h-11 pl-4 pr-10 text-black font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 text-sm ${(!canPerformActions || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}`}
                    >
                        {currentArtists.map((artist) => (
                            <option key={artist} value={artist}>
                                {artist}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black">
                        <ChevronDownIcon />
                    </div>
                </div>
            </div>
            <div className="mt-4">
              <ActionButton
                onClick={handleGeneratePainting}
                disabled={!canPerformActions || isLoading}
                text={generatedImage ? "Сгенерировать заново" : "Генерировать"}
                variant="primary"
                className="w-full"
              />
            </div>
          </div>
        </main>
      </div>
      {fullScreenImage && (
        <FullScreenView 
          imageSrc={fullScreenImage}
          onClose={() => setFullScreenImage(null)}
        />
      )}
    </div>
  );
};

export default App;