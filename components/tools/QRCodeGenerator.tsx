"use client";
import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { jsPDF } from "jspdf";
import { FaDownload, FaRuler, FaLink, FaFilePdf, FaImage, FaVectorSquare } from 'react-icons/fa';

// Define the available formats
const FORMATS = [
  { value: "png", label: "PNG", icon: FaImage },
  { value: "svg", label: "SVG", icon: FaVectorSquare },
  { value: "pdf", label: "PDF", icon: FaFilePdf },
];

export default function QRCodeGenerator() {
  const [text, setText] = useState("https://yourwebsite.com");
  const [size, setSize] = useState(200);
  const [format, setFormat] = useState("png");
  // Ref is now attached to the QRCodeSVG component for direct SVG access
  const qrRef = useRef<SVGSVGElement | null>(null);

  const downloadQR = async () => {
    if (!qrRef.current) return;

    // Convert SVG to string
    const svgData = new XMLSerializer().serializeToString(qrRef.current);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    if (format === "svg") {
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, size, size);

        if (format === "png") {
          const pngUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = pngUrl;
          link.download = "qrcode.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

        if (format === "pdf") {
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: [size + 40, size + 40], // margin around QR
          });
          const pngData = canvas.toDataURL("image/png");
          pdf.addImage(pngData, "PNG", 20, 20, size, size);
          pdf.save("qrcode.pdf");
        }

        URL.revokeObjectURL(url);
      };
      // Important for CORS issues when loading image from Blob URL
      img.crossOrigin = "anonymous";
    }
  };

  // QR colors remain static for high contrast/scannability
  const qrFgColor = "#1f2937"; // A dark gray for contrast on white background
  const qrBgColor = "#ffffff";

  return (
    // Explicit Light BG, Dark BG for dark mode
    <section className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      
      {/* Main App Container */}
      {/* Explicit Light BG, Dark BG, and Border colors */}
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl dark:shadow-black/50 border border-gray-200 dark:border-gray-700/50 transition-colors duration-300">
        
        <header className="text-center mb-10">
          {/* Header text color changes with mode */}
          <h1 className="text-4xl font-extrabold text-cyan-600 dark:text-cyan-400">
            QR Code Generator
          </h1>
          {/* Subheader text color changes with mode */}
          <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
            Input content, customize size, and download in your preferred format.
          </p>
        </header>
        
        {/* Two-Column Layout for Controls and Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* --- Column 1: Controls --- */}
          <div className="space-y-6">
            
            {/* 1. Input Section Card */}
            {/* Inner Card BG and Border change with mode */}
            <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600">
              {/* Label text color changes with mode */}
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FaLink className="text-cyan-600 dark:text-cyan-400" /> Content (URL or Text)
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com or any text"
                rows={4}
                // Input field BG, Text, and Border colors change with mode
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />
            </div>

            {/* 2. Size Section Card */}
            <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <FaRuler className="text-cyan-600 dark:text-cyan-400" /> QR Code Size
                <span className="ml-auto text-lg text-cyan-600 dark:text-cyan-400 font-bold">{size}px</span>
              </label>
              {/* Slider track color changes with mode */}
              <input
                type="range"
                min={150}
                max={400}
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-cyan-500 bg-gray-300 dark:bg-gray-600"
              />
            </div>

            {/* 3. Format Selector Card */}
            <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Download Format:
              </h3>
              <div className="flex flex-wrap gap-3">
                {FORMATS.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setFormat(value)}
                    // Inactive button colors change with mode
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 w-full sm:w-auto
                      ${format === value 
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500 dark:hover:text-white'
                      }`}
                  >
                    <Icon className={`text-lg dark:text-white group-hover:text-white ${format === value ? 'text-white' : 'text-gray-700'}`} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* --- Column 2: Preview & Download --- */}
          {/* Preview Card BG and Border change with mode */}
          <div className="flex flex-col items-center justify-center p-6 bg-gray-200 dark:bg-gray-700/50 rounded-2xl shadow-inner border border-gray-300 dark:border-gray-600">
            
            {/* QR Code Preview */}
            <div className={`p-5 bg-white rounded-xl shadow-2xl transition-all duration-300`} 
                 style={{ width: size + 40, height: size + 40 }}>
              <QRCodeSVG
                value={text || " "}
                size={size}
                fgColor={qrFgColor}
                bgColor={qrBgColor}
                level="M"
                ref={qrRef} 
              />
            </div>

            {/* Preview text color changes with mode */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 h-5">
              {text.length > 30 ? text.substring(0, 30) + '...' : text}
            </p>

            {/* Download Button remains bright for emphasis */}
            <button
              onClick={downloadQR}
              disabled={!text}
              className="mt-6 w-full max-w-xs flex items-center justify-center gap-2 px-6 py-3 rounded-full 
                         bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg 
                         shadow-xl shadow-cyan-500/40 transition-all duration-300 
                         disabled:bg-gray-500 disabled:shadow-none disabled:cursor-not-allowed"
            >
              <FaDownload /> Download .{format.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}