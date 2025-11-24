"use client";

import { useState } from "react";
import NextImage from "next/image";

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalFormat, setOriginalFormat] = useState<string>("image/jpeg");

  const calculateBase64Size = (base64: string): number => {
    const base64Str = base64.split(",")[1];
    const padding = (base64Str.match(/=+$/) || [""])[0].length;
    const sizeInBytes = (base64Str.length * 3) / 4 - padding;
    return Math.round(sizeInBytes / 1024); // KB
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    setError(null);
    setOriginalFile(file);
    setOriginalFormat(file.type);
    setOriginalSize(Math.round(file.size / 1024)); // KB
    compressImage(file);
  };

  const compressImage = async (file: File) => {
    setLoading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = 0.6; // fixed scale
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedDataUrl = canvas.toDataURL(originalFormat, 0.7); // fixed compression
          setCompressedUrl(compressedDataUrl);
          setCompressedSize(calculateBase64Size(compressedDataUrl));
        } else {
          setError("Failed to compress image.");
        }
        setLoading(false);
      };

      img.onerror = () => {
        setError("Failed to load image.");
        setLoading(false);
      };
    };

    reader.onerror = () => {
      setError("Failed to read file.");
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const downloadCompressed = () => {
    if (!compressedUrl || !originalFile) return;
    const extension = originalFile.name.split(".").pop() || "image";
    const link = document.createElement("a");
    link.href = compressedUrl;
    link.download = `compressed.${extension}`;
    link.click();
  };

  const compressionPercent =
    originalSize && compressedSize
      ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
      : 0;

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Compress Image - Free
        </h2>

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.bmp"
          onChange={handleFileChange}
          className="mb-6 block w-full text-sm text-gray-600 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-900 file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-800"
        />

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {loading && (
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Compressing image...
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {originalFile && (
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                Original Image:
              </h3>
              <div className="w-full h-auto border rounded overflow-hidden">
                <NextImage
                  src={URL.createObjectURL(originalFile)}
                  alt="Original"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Size: {originalSize} KB
              </p>
            </div>
          )}

          {compressedUrl && (
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                Compressed Image:
              </h3>
              <div className="w-full h-auto border rounded overflow-hidden">
                <NextImage
                  src={compressedUrl}
                  alt="Compressed"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Estimated size: {compressedSize} KB ({compressionPercent}%
                reduction)
              </p>
              <button
                onClick={downloadCompressed}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Download Compressed Image
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
