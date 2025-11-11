"use client";

import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { FaMicrophone, FaMicrophoneSlash, FaCopy, FaTrash } from "react-icons/fa";
import "./../../node_modules/flag-icons/css/flag-icons.min.css";

export default function SpeechToText() {
  const [supported, setSupported] = useState(true);
  const [copied, setCopied] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en-US");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  const languageOptions = [
    { value: "en-US", label: "English (US)" },
    { value: "en-GB", label: "English (UK)" },
    { value: "en-AU", label: "English (Australia)" },
    { value: "en-CA", label: "English (Canada)" },
    { value: "es-ES", label: "Spanish (Spain)" },
    { value: "es-MX", label: "Spanish (Mexico)" },
    { value: "es-US", label: "Spanish (US)" },
    { value: "fr-FR", label: "French (France)" },
    { value: "fr-CA", label: "French (Canada)" },
    { value: "de-DE", label: "German" },
    { value: "it-IT", label: "Italian" },
    { value: "pt-BR", label: "Portuguese (Brazil)" },
    { value: "pt-PT", label: "Portuguese (Portugal)" },
    { value: "zh-CN", label: "Chinese (Simplified)" },
    { value: "zh-TW", label: "Chinese (Traditional)" },
    { value: "zh-HK", label: "Chinese (Hong Kong)" },
    { value: "ja-JP", label: "Japanese" },
    { value: "ko-KR", label: "Korean" },
    { value: "hi-IN", label: "Hindi" },
    { value: "ar-SA", label: "Arabic (Saudi Arabia)" },
    { value: "ar-AE", label: "Arabic (UAE)" },
    { value: "ru-RU", label: "Russian" },
    { value: "nl-NL", label: "Dutch" },
    { value: "sv-SE", label: "Swedish" },
    { value: "nb-NO", label: "Norwegian" },
    { value: "da-DK", label: "Danish" },
    { value: "fi-FI", label: "Finnish" },
    { value: "pl-PL", label: "Polish" },
    { value: "tr-TR", label: "Turkish" },
    { value: "el-GR", label: "Greek" },
    { value: "he-IL", label: "Hebrew" },
    { value: "th-TH", label: "Thai" },
    { value: "vi-VN", label: "Vietnamese" },
    { value: "id-ID", label: "Indonesian" },
    { value: "ms-MY", label: "Malay" },
  ];

  useEffect(() => {
    if (!browserSupportsSpeechRecognition || !isMicrophoneAvailable) {
      setSupported(false);
    }
  }, [browserSupportsSpeechRecognition, isMicrophoneAvailable]);

  const handleStartListening = () => {
    SpeechRecognition.startListening({ 
      continuous: true,
      language: selectedLanguage 
    });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleReset = () => {
    resetTranscript();
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    
    // If currently listening, restart with new language
    if (listening) {
      SpeechRecognition.stopListening();
      setTimeout(() => {
        SpeechRecognition.startListening({ 
          continuous: true,
          language: newLanguage 
        });
      }, 100);
    }
  };

  // Get language family for display
  const getLanguageFamily = (langCode: string) => {
    const lang = langCode.split('-')[0];
    const languageFamilies: { [key: string]: string } = {
      'en': 'English',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'it': 'Italian',
      'pt': 'Portuguese',
      'zh': 'Chinese',
      'ja': 'Japanese',
      'ko': 'Korean',
      'hi': 'Hindi',
      'ar': 'Arabic',
      'ru': 'Russian',
      'nl': 'Dutch',
      'sv': 'Swedish',
      'nb': 'Norwegian',
      'da': 'Danish',
      'fi': 'Finnish',
      'pl': 'Polish',
      'tr': 'Turkish',
      'el': 'Greek',
      'he': 'Hebrew',
      'th': 'Thai',
      'vi': 'Vietnamese',
      'id': 'Indonesian',
      'ms': 'Malay'
    };
    return languageFamilies[lang] || lang;
  };

  if (!supported) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl shadow-lg border dark:border-gray-700">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
            Speech to Text
          </h2>
          <div className="text-center text-red-500 dark:text-red-400 p-4">
            <p className="text-lg mb-2">Browser not supported</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {"Your browser doesn't support speech recognition. Please try Chrome, Edge, or Safari."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 rounded-2xl shadow-lg border dark:border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Speech to Text
        </h2>

        {/* Language Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Language ({languageOptions.length} languages available)
          </label>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="w-full p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            disabled={listening}
          >
            {languageOptions.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Transcript Display */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Transcript
          </label>
          <div className="w-full p-4 border rounded-lg dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white min-h-[120px] max-h-60 overflow-y-auto">
            {transcript || (
              <p className="text-gray-500 dark:text-gray-400 italic">
                {listening ? "Start speaking..." : "Click the microphone to start speaking"}
              </p>
            )}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className={`w-3 h-3 rounded-full ${listening ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {listening ? 'Listening...' : 'Not listening'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({getLanguageFamily(selectedLanguage)})
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4">
          <button
            onClick={listening ? handleStopListening : handleStartListening}
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              listening 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
            {listening ? 'Stop' : 'Start Listening'}
          </button>

          <button
            onClick={handleCopyText}
            disabled={!transcript}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FaCopy />
            {copied ? 'Copied!' : 'Copy Text'}
          </button>

          <button
            onClick={handleReset}
            disabled={!transcript}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FaTrash />
            Clear
          </button>
        </div>

        {/* Popular Languages Quick Access */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quick Access - Most Popular:
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "en-US", label: "English", flag: "fi fi-us" },
              { value: "es-ES", label: "Spanish", flag: "fi fi-es"},
              { value: "fr-FR", label: "French", flag: "fi fi-fr"},
              { value: "de-DE", label: "German", flag: "fi fi-de"},
              { value: "zh-CN", label: "Chinese", flag: "fi fi-cn"},
              { value: "ja-JP", label: "Japanese", flag: "fi fi-jp"},
              { value: "ar-SA", label: "Arabic", flag: "fi fi-sa"},
              { value: "hi-IN", label: "Hindi", flag: "fi fi-in"},
            ].map((lang) => (
              <button
                key={lang.value}
                onClick={() => {
                  setSelectedLanguage(lang.value);
                  if (listening) {
                    handleStopListening();
                    setTimeout(() => handleStartListening(), 100);
                  }
                }}
                className={`px-3 py-1 text-sm rounded border transition ${
                  selectedLanguage === lang.value
                    ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className={`${lang.flag} mr-3 rounded-sm`}></span>{lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Language Support Info */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
            Language Support:
          </h3>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
            <li>• <strong>Best support:</strong> English, Spanish, French, German, Italian</li>
            <li>• <strong>Good support:</strong> Portuguese, Chinese, Japanese, Korean</li>
            <li>• <strong>Basic support:</strong> Arabic, Hindi, Russian, and other languages</li>
            <li>• Accuracy may vary by browser and operating system</li>
          </ul>
        </div>
      </div>
    </div>
  );
}