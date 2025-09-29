"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaCopy, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Tool7 = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let charset = "";
    if (includeUppercase) charset += upper;
    if (includeLowercase) charset += lower;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (!charset) {
      toast.error("Please select at least one character type.");
      return;
    }

    let generated = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generated += charset[randomIndex];
    }

    setPassword(generated);
    toast.success("Password generated!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.info("Password copied to clipboard!");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
        <div className="w-1/2 mx-auto p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
          <FaLock className="text-blue-500" />
          Password Generator
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password Length: <span className="font-bold">{length}</span>
          </label>
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700 dark:text-gray-300">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
              className="accent-blue-500"
            />
            Uppercase
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
              className="accent-blue-500"
            />
            Lowercase
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="accent-blue-500"
            />
            Numbers
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
              className="accent-blue-500"
            />
            Symbols
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Generate Password
        </button>

        {password && (
          <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm break-all text-gray-800 dark:text-white">
                {showPassword ? password : "•".repeat(password.length)}
              </span>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              onClick={copyToClipboard}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              <FaCopy />
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Tool7;
