"use client";
import { useState, useEffect } from "react";

export default function TextAnalyzer () {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [readingTime, setReadingTime] = useState("0 min");

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const chars = text.replace(/\s/g, "");

    setWordCount(words.length);
    setCharCount(chars.length);
    setSentenceCount(sentences.length);
    setReadingTime(`${Math.ceil(words.length / 200)} min`);
  }, [text]);

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">Text Analyzer</h2>
      <textarea
        className="w-full h-96 p-4 border rounded-md resize-none dark:bg-gray-800 dark:text-white"
        placeholder="Paste or type your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <Stat label="Words" value={wordCount} />
        <Stat label="Characters" value={charCount} />
        <Stat label="Sentences" value={sentenceCount} />
        <Stat label="Reading Time" value={readingTime} />
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-xl font-semibold text-gray-700 dark:text-white">{value}</p>
  </div>
);
