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