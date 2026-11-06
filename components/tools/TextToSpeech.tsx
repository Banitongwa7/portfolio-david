"use client";

import React, { useMemo, useState, useSyncExternalStore } from "react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";

// The browser's voices, read straight from speechSynthesis. They often load
// after the page, which fires "voiceschanged". getVoices() returns a new
// array each call, so the last list is reused while it hasn't changed.
const NO_VOICES: SpeechSynthesisVoice[] = [];
let cachedVoices = NO_VOICES;
let cachedKey = "";

const hasSpeech = () => typeof window !== "undefined" && "speechSynthesis" in window;

function subscribeVoices(onChange: () => void) {
  if (!hasSpeech()) return () => {};
  window.speechSynthesis.addEventListener("voiceschanged", onChange);
  return () => window.speechSynthesis.removeEventListener("voiceschanged", onChange);
}

function readVoices() {
  if (!hasSpeech()) return NO_VOICES;
  const voices = window.speechSynthesis.getVoices();
  const key = voices.map((v) => v.voiceURI).join("|");
  if (key !== cachedKey) {
    cachedKey = key;
    cachedVoices = voices;
  }
  return cachedVoices;
}

export default function TextToSpeech() {
  const voices = useSyncExternalStore(subscribeVoices, readVoices, () => NO_VOICES);
  // Empty means "the first available": nothing to keep in sync when the
  // voices arrive or the language changes.
  const [chosenLanguage, setChosenLanguage] = useState<string>("");
  const [chosenVoiceName, setChosenVoiceName] = useState<string>("");
  const [text, setText] = useState("Welcome to Text-to-Speech tool!");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const languages = useMemo(() => Array.from(new Set(voices.map((v) => v.lang.split("-")[0]))), [voices]);
  const selectedLanguage = languages.includes(chosenLanguage) ? chosenLanguage : (languages[0] ?? "");
  const filteredVoices = useMemo(
    () => voices.filter((v) => v.lang.startsWith(selectedLanguage)),
    [voices, selectedLanguage]
  );
  const selectedVoiceName = filteredVoices.some((v) => v.name === chosenVoiceName)
    ? chosenVoiceName
    : (filteredVoices[0]?.name ?? "");

  const handlePlay = () => {
    if (!text.trim()) return;

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    const voice = filteredVoices.find((v) => v.name === selectedVoiceName);
    if (voice) utter.voice = voice;

    utter.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utter);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (window.speechSynthesis.speaking) {
      if (!window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        setIsPaused(true);
      } else {
        window.speechSynthesis.resume();
        setIsPaused(false);
      }
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 rounded-2xl shadow-lg border dark:border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Text to Speech
        </h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full p-3 mb-4 border rounded-lg dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          disabled={isSpeaking}
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Language
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => {
              setChosenLanguage(e.target.value);
              setChosenVoiceName(""); // First voice of the new language.
            }}
            className="w-full p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            disabled={isSpeaking}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Voice
          </label>
          <select
            value={selectedVoiceName}
            onChange={(e) => setChosenVoiceName(e.target.value)}
            className="w-full p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            disabled={isSpeaking}
          >
            {filteredVoices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4">
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            disabled={isSpeaking}
          >
            <FaPlay /> Play
          </button>
          <button
            onClick={handlePause}
            className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            disabled={!isSpeaking}
          >
            <FaPause /> {isPaused ? "Resume" : "Pause"}
          </button>
          <button
            onClick={handleStop}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            disabled={!isSpeaking}
          >
            <FaStop /> Stop
          </button>
        </div>

        {isSpeaking && (
          <div className="flex items-center gap-3 mt-4 justify-center">
            <div className="flex gap-1 h-6">
              <span className="w-1 bg-green-500 animate-visualizer"></span>
              <span className="w-1 bg-green-500 animate-visualizer delay-100"></span>
              <span className="w-1 bg-green-500 animate-visualizer delay-200"></span>
              <span className="w-1 bg-green-500 animate-visualizer delay-300"></span>
              <span className="w-1 bg-green-500 animate-visualizer delay-400"></span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isPaused ? "Paused..." : "Speaking..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
