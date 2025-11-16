"use client";

import { useState, useEffect } from "react";
import { MdDelete, MdAdd, MdDragIndicator } from "react-icons/md";
import { FaStickyNote, FaRegSave, FaRegLightbulb } from "react-icons/fa";

type Note = {
  id: string;
  content: string;
  x: number;
  y: number;
  color: string;
  createdAt: number;
};

export default function StickyNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const colors = [
    "bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700",
    "bg-pink-100 dark:bg-pink-900 border-pink-300 dark:border-pink-700",
    "bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700",
    "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700",
    "bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-700",
    "bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-700",
  ];

  useEffect(() => {
    const saved = localStorage.getItem("sticky-notes");
    if (saved) {
      const parsedNotes = JSON.parse(saved);
      setNotes(parsedNotes);
      setShowWelcome(parsedNotes.length === 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sticky-notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newNote: Note = {
      id: Date.now().toString(),
      content: "",
      x: Math.max(50, Math.random() * (window.innerWidth - 300)),
      y: Math.max(50, Math.random() * (window.innerHeight - 300)),
      color: randomColor,
      createdAt: Date.now(),
    };
    setNotes([...notes, newNote]);
    setShowWelcome(false);
  };

  const updateNote = (id: string, content: string) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, content } : note))
    );
  };

  const moveNote = (id: string, x: number, y: number) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, x, y } : note)));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (notes.length === 1) setShowWelcome(true);
  };

  const clearAllNotes = () => {
    setNotes([]);
    setShowWelcome(true);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setIsDragging(id);
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    moveNote(id, e.clientX - 100, e.clientY - 50);
    setIsDragging(null);
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 px-6 py-3 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-xl transition-colors duration-300">
              <FaStickyNote className="text-indigo-600 dark:text-indigo-400 text-xl transition-colors duration-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
                Sticky Notes
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                Drag, drop, and organize your ideas
              </p>
            </div>
          </div>
          
          <div className="h-8 w-px bg-gray-300 dark:bg-gray-600 mx-2 transition-colors duration-300"></div>
          
          <button
            onClick={addNote}
            className="flex items-center gap-3 px-5 py-2.5 bg-indigo-600 dark:bg-indigo-700 text-white rounded-xl shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 font-semibold"
          >
            <MdAdd size={22} />
            Add Note
          </button>

          {notes.length > 0 && (
            <button
              onClick={clearAllNotes}
              className="px-4 py-2.5 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium text-sm"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Welcome Screen */}
      {showWelcome && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center max-w-md mx-4">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 transition-colors duration-300">
              <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                <FaRegLightbulb className="text-indigo-600 dark:text-indigo-400 text-3xl transition-colors duration-300" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3 transition-colors duration-300">
                Welcome to Sticky Notes
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg transition-colors duration-300">
                Start organizing your thoughts with beautiful, draggable sticky notes. Your notes are automatically saved!
              </p>
              <button
                onClick={addNote}
                className="flex items-center gap-3 px-8 py-4 bg-indigo-600 dark:bg-indigo-700 text-white rounded-2xl shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 font-semibold text-lg mx-auto"
              >
                <MdAdd size={24} />
                Create Your First Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      <div className="pt-24 pb-8 px-4 h-full">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`absolute w-64 h-64 rounded-2xl shadow-xl p-4 transition-all duration-200 transform hover:scale-105 hover:shadow-2xl ${note.color} ${
              isDragging === note.id ? "rotate-2 scale-110 z-50" : "z-10"
            }`}
            style={{ 
              left: note.x, 
              top: note.y,
              cursor: isDragging === note.id ? "grabbing" : "grab"
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, note.id)}
            onDragEnd={() => {
              setIsDragging(null);
            }}
          >
            {/* Note Header */}
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-300/50 dark:border-gray-600/50 transition-colors duration-300">
              <div className="flex items-center gap-2">
                <MdDragIndicator className="text-gray-500 dark:text-gray-400 cursor-grab active:cursor-grabbing transition-colors duration-300" size={16} />
                <FaStickyNote className="text-gray-600 dark:text-gray-500 transition-colors duration-300" size={14} />
              </div>
              <div className="flex items-center gap-1">
                {note.content && (
                  <FaRegSave className="text-green-500 dark:text-green-400 transition-colors duration-300" size={12} />
                )}
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                >
                  <MdDelete size={16} />
                </button>
              </div>
            </div>

            {/* Note Content */}
            <textarea
              className="w-full h-[calc(100%-3rem)] bg-transparent resize-none outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm leading-relaxed font-medium transition-colors duration-300"
              value={note.content}
              onChange={(e) => updateNote(note.id, e.target.value)}
              placeholder="What's on your mind?..."
              autoFocus={note.content === ""}
            />

            {/* Note Footer */}
            <div className="absolute bottom-2 right-3 text-xs text-gray-500 dark:text-gray-400 opacity-70 transition-colors duration-300">
              {new Date(note.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      {notes.length > 0 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-black/70 dark:bg-white/80 backdrop-blur-sm text-white dark:text-gray-900 text-sm px-4 py-2 rounded-full transition-colors duration-300">
            <span className="opacity-90 dark:opacity-100">
              {notes.length} note{notes.length !== 1 ? 's' : ''} • Drag to move • Auto-saved
            </span>
          </div>
        </div>
      )}
    </div>
  );
}