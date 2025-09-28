"use client";
import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { jsPDF } from "jspdf";

export default function Tool3_QRGenerator() {
  const [text, setText] = useState("https://yourwebsite.com");
  const [size, setSize] = useState(200);
  const [format, setFormat] = useState("png");
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
      link.click();
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
          link.click();
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
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl max-w-md w-full space-y-6">
        
        <header className="text-center">
          <h1 className="text-3xl font-bold text-cyan-400">QR Code Generator</h1>
          <p className="text-gray-300 text-sm mt-1">
            Create and download QR codes instantly.
          </p>
        </header>

        {/* Input */}
        <div className="space-y-3">
          <label className="block text-sm text-gray-200">Enter text or URL:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Size Selector */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">
              Size: <span className="text-cyan-400 font-semibold">{size}px</span>
            </label>
            <input
              type="range"
              min={150}
              max={400}
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>
        </div>

        {/* QR Code Display */}
        <div className="flex justify-center">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <QRCodeSVG
              value={text}
              size={size}
              fgColor="#111827"
              bgColor="#ffffff"
              ref={qrRef}
            />
          </div>
        </div>

        {/* Format selector + Download */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="svg">SVG</option>
            <option value="png">PNG</option>
            <option value="pdf">PDF</option>
          </select>

          <button
            onClick={downloadQR}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-md transition"
          >
            📥 Download
          </button>
        </div>
      </div>
    </section>
  );
}
