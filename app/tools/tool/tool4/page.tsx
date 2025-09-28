"use client";

import { useState, useEffect } from "react";
import { MdDelete, MdAdd } from "react-icons/md";
import { FaStickyNote } from "react-icons/fa";

type Note = {
  id: string;
  content: string;
  x: number;
  y: number;
  color: string;
};

export default function Tool4() {
  const [notes, setNotes] = useState<Note[]>([]);

  const colors = [
    "bg-yellow-100 border-yellow-300",
    "bg-pink-100 border-pink-300",
    "bg-green-100 border-green-300",
    "bg-blue-100 border-blue-300",
    "bg-purple-100 border-purple-300",
    "bg-orange-100 border-orange-300",
  ];

  useEffect(() => {
    const saved = localStorage.getItem("sticky-notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("sticky-notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newNote: Note = {
      id: Date.now().toString(),
      content: "",
      x: 120,
      y: 120,
      color: randomColor,
    };
    setNotes([...notes, newNote]);
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
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute  top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 z-10 ">
        <button
          onClick={addNote}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          <MdAdd size={20} />
          Add Note
        </button>
      </div>

      {notes.map((note) => (
        <div
          key={note.id}
          className={`absolute w-56 h-56 rounded-lg shadow-lg p-3 transition-all ${note.color}`}
          style={{ left: note.x, top: note.y }}
          draggable
          onDragEnd={(e) => {
            moveNote(note.id, e.clientX - 100, e.clientY - 20);
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <FaStickyNote className="text-yellow-600" />
            <button
              onClick={() => deleteNote(note.id)}
              className="text-red-500 hover:text-red-700"
            >
              <MdDelete size={18} />
            </button>
          </div>
          <textarea
            className="w-full h-[85%] bg-transparent resize-none outline-none text-sm text-gray-800"
            value={note.content}
            onChange={(e) => updateNote(note.id, e.target.value)}
            placeholder="Write your idea..."
          />
        </div>
      ))}
    </div>
  );
}
