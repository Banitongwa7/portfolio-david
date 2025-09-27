import React from "react";
import Quotes from "@/data/quotes.json";

export default function Quote() {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // Find the quote for the current day/month, or fall back to the first quote
  const quote =
    Quotes.find(
      (q) => q.day === currentDay && q.month === currentMonth
    ) || Quotes[0];

  const formatCurrentDate = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[currentMonth - 1]} ${currentDay}, ${currentYear}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 transition duration-300">
      
      {/* FIXED: Replaced w-1/2 with a responsive max-width container */}
      <div className="w-full max-w-lg lg:max-w-2xl py-12 sm:py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 transform transition duration-500 hover:scale-[1.01] hover:shadow-cyan-500/50 dark:hover:shadow-teal-400/30 border border-gray-200 dark:border-gray-700">
        <header className="mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
          <h2 className="text-3xl font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-teal-400 dark:to-cyan-500">
            Quote of the Day
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1 font-mono">
            {formatCurrentDate()}
          </p>
        </header>
        <figure className="text-center">
          <svg
            className="w-10 h-10 mx-auto mb-4 text-cyan-500 dark:text-teal-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM9 12a1 1 0 0 1-1 1H5a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1Zm7 0a1 1 0 0 1-1 1h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1Zm-5-4H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Zm6 0h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2Z" />
          </svg>
          <blockquote className="relative">
            {/* The actual quote text is now more responsive with md:text-2xl */}
            <p className="text-xl md:text-2xl font-serif text-gray-900 dark:text-gray-50 leading-relaxed italic px-4">
              {/* Added horizontal padding to the quote text for very small screens */}
              {`“${quote.quote}”`}
            </p>
            {/* Decorative quote marks positions adjusted relative to the card, not the quote text */}
            <span className="absolute top-[-20px] left-[-20px] text-7xl font-extrabold text-cyan-300/30 dark:text-teal-500/30 z-0 opacity-70">“</span>
            <span className="absolute bottom-[-20px] right-[-20px] text-7xl font-extrabold text-cyan-300/30 dark:text-teal-500/30 z-0 opacity-70">”</span>
          </blockquote>
          <figcaption className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <cite className="font-bold text-xl text-blue-600 dark:text-teal-400">
              — {quote.author}
            </cite>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}