import React, { useState, useRef, useCallback } from 'react';
import { generatePaintingFromImage } from './services/geminiService';
import { fileToGenerativePart, extractColorsFromImage } from './utils/imageUtils';
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
  
  const initialCentury = Object.keys(artistsByCentury)[3]; // Default to 18th century
  const [selectedCentury, setSelectedCentury] = useState<string>(initialCentury);
  const [selectedArtist, setSelectedArtist] = useState<Artist>(artistsByCentury[initialCentury][0]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState<'like' | 'dislike' | null>(null);
  const [headerColors, setHeaderColors] = useState<string[] | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReset = useCallback(() => {
    setSourceImage(null);
    setSourceImagePreview(null);
    setImageAspectRatio(null);
    setGeneratedImage(null);
    
    const defaultCentury = Object.keys(artistsByCentury)[3];
    setSelectedCentury(defaultCentury);
    setSelectedArtist(artistsByCentury[defaultCentury][0]);

    setIsLoading(false);
    setLoadingMessage('');
    setError(null);
    setFullScreenImage(null);
    setActiveFeedback(null);
    setHeaderColors(null);
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
    setLoadingMessage('Loading image...');
    setError(null);

    try {
      const { generativePart, previewUrl } = await fileToGenerativePart(file);

      extractColorsFromImage(previewUrl)
        .then(setHeaderColors)
        .catch(err => {
            console.error("Could not extract colors from image:", err);
            setHeaderColors(null); // Fallback to default colors on error
        });

      const img = new Image();
      img.onload = () => {
        setImageAspectRatio(img.naturalWidth / img.naturalHeight);
        setSourceImage(generativePart);
        setSourceImagePreview(previewUrl);
        setIsLoading(false);
        setLoadingMessage('');
      };
      img.onerror = () => {
        setError('Failed to load image to determine dimensions.');
        setIsLoading(false);
        setLoadingMessage('');
        handleReset();
      };
      img.src = previewUrl;

    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to process file: ${message}`);
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
  
  const handleResetPainting = useCallback(() => {
    setGeneratedImage(null);
    setActiveFeedback(null);
    if(sourceImagePreview) {
      extractColorsFromImage(sourceImagePreview)
      .then(setHeaderColors)
      .catch(err => {
          console.error("Could not extract colors from image:", err);
          setHeaderColors(null);
      });
    }
  }, [sourceImagePreview]);

  const handleGeneratePainting = useCallback(async () => {
    const isFirstGeneration = !generatedImage;
    let imagePartToPaint: GenerativePart | null = null;
  
    if (isFirstGeneration) {
      if (!sourceImage) {
        setError('Please upload an image first.');
        return;
      }
      imagePartToPaint = sourceImage;
    } else {
      // For subsequent generations, use the last generated image
      if (!generatedImage) return; // Should not happen, but for type safety
      try {
        const { generativePart } = await fileToGenerativePart(generatedImage);
        imagePartToPaint = generativePart;
      } catch(err) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(`Failed to process the previous image: ${message}`);
        console.error(err);
        return;
      }
    }
  
    if (!imagePartToPaint) {
      setError('No image to process.');
      return;
    }
  
    setError(null);
    setIsLoading(true);
    setLoadingMessage(`Creating a painting in the style of ${selectedArtist}...`);
  
    try {
      let feedbackPrompt = '';
      if (!isFirstGeneration && activeFeedback) {
        if (activeFeedback === 'like') {
          feedbackPrompt = " The user liked the previous style, try to maintain it while making subtle improvements.";
        } else if (activeFeedback === 'dislike') {
          feedbackPrompt = " The user disliked the previous style. Please generate a significantly different artistic interpretation.";
        }
      }
      
      const promptPrefix = isFirstGeneration
        ? "Slightly alter the clothing and background of the person in the photograph to better match the historical era. Then, "
        : ""; 
      
      const prompt = promptPrefix + artistPrompts[selectedArtist] + feedbackPrompt;
      
      const resultBase64 = await generatePaintingFromImage(imagePartToPaint, prompt);
      setGeneratedImage(resultBase64);

      extractColorsFromImage(resultBase64)
        .then(setHeaderColors)
        .catch(err => {
            console.error("Could not extract colors from generated image:", err);
        });

      setActiveFeedback(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to create painting: ${message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [sourceImage, generatedImage, selectedArtist, activeFeedback]);

  const handleSavePainting = useCallback(() => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    
    const mimeType = generatedImage.split(';')[0].split(':')[1];
    const extension = mimeType.split('/')[1] || 'png';
    
    link.download = `${selectedArtist.toLowerCase().replace(/ /g, '_')}_painting.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [generatedImage, selectedArtist]);

  const canPerformActions = !!sourceImage;

  const handleCenturyChange = (century: string) => {
    setSelectedCentury(century);
    const newArtist = artistsByCentury[century][0];
    setSelectedArtist(newArtist);
    handleResetPainting();
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
        <Header colors={headerColors} />
        
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
            isLoading={isLoading && !loadingMessage.includes('Loading')}
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
            onLikeClick={generatedImage ? () => setActiveFeedback('like') : undefined}
            onDislikeClick={generatedImage ? () => setActiveFeedback('dislike') : undefined}
            activeFeedback={activeFeedback}
          />
          <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-shadow duration-200">
            <div className="flex gap-4">
                <div className="relative w-1/2">
                    <label htmlFor="century-selector" className="sr-only">Century</label>
                      <select
                        id="century-selector"
                        value={selectedCentury}
                        onChange={(e) => handleCenturyChange(e.target.value)}
                        disabled={!canPerformActions || isLoading}
                        className={`w-full appearance-none bg-white rounded-lg h-11 pl-4 pr-10 text-black font-semibold shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 text-sm ${(!canPerformActions || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    <label htmlFor="artist-selector" className="sr-only">Artist</label>
                    <select
                        id="artist-selector"
                        value={selectedArtist}
                        onChange={(e) => {
                            setSelectedArtist(e.target.value as Artist);
                            handleResetPainting();
                        }}
                        disabled={!canPerformActions || isLoading}
                        className={`w-full appearance-none bg-white rounded-lg h-11 pl-4 pr-10 text-black font-semibold shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 text-sm ${(!canPerformActions || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
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
              {generatedImage ? (
                <div className="flex gap-4">
                  <ActionButton
                    onClick={handleGeneratePainting}
                    disabled={!canPerformActions || isLoading}
                    text="REGENERATE"
                    variant="primary"
                    className="flex-1"
                  />
                  <ActionButton
                    onClick={handleResetPainting}
                    disabled={isLoading}
                    text="Reset"
                    variant="secondary"
                    className="flex-1"
                  />
                </div>
              ) : (
                <ActionButton
                  onClick={handleGeneratePainting}
                  disabled={!canPerformActions || isLoading}
                  text="START"
                  variant="primary"
                  className="w-full"
                />
              )}
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