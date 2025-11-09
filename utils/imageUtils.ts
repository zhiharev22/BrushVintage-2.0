// FIX: Replaced deprecated 'GenerativePart' with 'Part' using an alias, as 'GenerativePart' is no longer exported from '@google/genai'.
import type { Part as GenerativePart } from '@google/genai';

const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
    const res = await fetch(dataUrl);
    return await res.blob();
};

const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64Data = (reader.result as string).split(',')[1];
            if (base64Data) {
                resolve(base64Data);
            } else {
                reject(new Error("Failed to read blob as base64."));
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
    });
};

export const fileToGenerativePart = (file: File | string): Promise<{ generativePart: GenerativePart, previewUrl: string }> => {
  return new Promise(async (resolve, reject) => {
    try {
        let blob: Blob;
        let mimeType: string;
        let previewUrl: string;

        if (typeof file === 'string') {
            // It's a data URL
            previewUrl = file;
            blob = await dataUrlToBlob(file);
            mimeType = blob.type;
        } else {
            // It's a File object
            previewUrl = URL.createObjectURL(file);
            blob = file;
            mimeType = file.type;
        }

        const base64Data = await blobToBase64(blob);

        // Revoke object URL if we created one from a file
        if (typeof file !== 'string') {
            // We read it, so we can revoke the URL to free up memory
            URL.revokeObjectURL(previewUrl); 
            // We need to re-create the data URL for preview after revoking
            previewUrl = `data:${mimeType};base64,${base64Data}`;
        }
        
        resolve({
            generativePart: {
                inlineData: {
                    data: base64Data,
                    mimeType: mimeType,
                },
            },
            previewUrl: previewUrl,
        });

    } catch (error) {
        reject(error);
    }
  });
};

export const extractColorsFromImage = (imageUrl: string, count: number = 11): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      // This is necessary for fetching images from external URLs (like Unsplash) without CORS issues.
      // For data URLs, it's not strictly needed but doesn't hurt.
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        
        // Scale down the image for faster processing
        const maxDimension = 100;
        const scale = Math.min(maxDimension / img.width, maxDimension / img.height, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Could not get canvas context'));
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        try {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          const colors: string[] = [];
          const pixelCount = canvas.width * canvas.height;
          
          // Sample more pixels to have a better chance of finding non-white colors
          const sampleCount = count * 3;
          const step = Math.max(1, Math.floor(pixelCount / sampleCount));

          for (let i = 0; i < pixelCount && colors.length < count; i += step) {
            const offset = i * 4;
            const r = imageData[offset];
            const g = imageData[offset + 1];
            const b = imageData[offset + 2];
            
            // Exclude colors that are too close to white (e.g., all components > 240)
            if (r < 240 || g < 240 || b < 240) {
              const hex = `#${('00' + r.toString(16)).slice(-2)}${('00' + g.toString(16)).slice(-2)}${('00' + b.toString(16)).slice(-2)}`;
              colors.push(hex);
            }
          }
          resolve(colors); // Resolves with an empty array if no suitable colors are found.
        } catch (e) {
          // This can happen due to CORS issues if crossOrigin is not set or supported
          reject(new Error(`Failed to get image data: ${e}`));
        }
      };
      img.onerror = (err) => {
        reject(err);
      };
      img.src = imageUrl;
    });
};