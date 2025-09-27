"use client";

import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fullName === "" || email === "" || message === "") {
      toast.warn("Please fill in all fields!");
      return;
    }

    fetch("/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, message }),
    }).then((res) => {
      if (res.ok) {
        toast.success("Message sent successfully!");
        setFullName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    });
  };

  return (
    <section className="w-full py-20 bg-gray-50 dark:bg-gray-900" id="contact">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      <div className="mx-auto max-w-4xl text-center mb-16 px-4">
        <p className="text-base font-semibold tracking-wide text-green-600 dark:text-green-400 uppercase">
          Get in Touch
        </p>
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Contact Me
        </h2>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          {"I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision."}
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/50 h-fit">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
              My Information
            </h3>
            
            <ul className="space-y-6">
              {[
                { icon: FaLocationDot, title: "Address", detail: "Tunis, Tunisia", color: "text-green-500" },
                { icon: IoMdCall, title: "Phone", detail: "+216 52 482 172", color: "text-blue-500" },
                { icon: IoMdMail, title: "Email", detail: "davidbanitongwa@gmail.com", color: "text-teal-500" },
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700/50 flex-shrink-0 mr-4 ${item.color} shadow-md`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/50">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
              Send a Message
            </h3>
            <form id="contactForm" onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <input
                  type="text"
                  id="name"
                  value={fullName}
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 py-3 px-4 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-green-500 focus:border-green-500 transition duration-300"
                  name="name"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Your email address"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 py-3 px-4 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-green-500 focus:border-green-500 transition duration-300"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <textarea
                  id="textarea"
                  name="textarea"
                  value={message}
                  cols={30}
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 py-3 px-4 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-green-500 focus:border-green-500 transition duration-300"
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out dark:bg-green-500 dark:hover:bg-green-600"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}