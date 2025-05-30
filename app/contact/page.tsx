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
      toast.warn("Please fill in all fields !");
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
        toast.success("Message sent successfully !");
        setFullName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error("Something went wrong ! Please try again.");
      }
    });
  };

  return (
      <section className="w-full pb-[100px]" id="contact">
        <ToastContainer />
        <h2 className="text-[30px] font-extrabold mt-[50px] mx-auto w-[80%] dark:text-gray-100 text-center">
          Contact
        </h2>
        <p className="text-center text-lg text-gray-600 dark:text-slate-400 mt-4 mb-10">
          {"I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision."}
        </p>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-stretch justify-center">
            <div className="grid md:grid-cols-2">
              <div className="h-full pr-6 flex flex-col justify-center items-center md:items-start">
                <ul className="mb-6 md:mb-0">
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded">
                      <FaLocationDot className="text-green-500 w-10 h-10" />
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                        Address
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        Tunis Tunisia
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded">
                      <IoMdCall className="h-10 w-10 text-green-500" />
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                        Phone
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        Mobile : +216 52 482 172
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded">
                      <IoMdMail className="h-10 w-10 text-green-500" />
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                        Email
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        davidbanitongwa@gmail.com
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                <h2 className="mb-4 text-2xl font-bold dark:text-gray-100">
                  Get in touch
                </h2>
                <form id="contactForm" action="#" onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label
                          htmlFor="name"
                          className="pb-1 text-xs uppercase tracking-wider"
                        ></label>
                        <input
                          type="text"
                          id="name"
                          value={fullName}
                          placeholder="Your full name"
                          className="mb-2 w-full rounded-md border outline-green-400 border-gray-400 py-2 pl-2 pr-4 sm:mb-0"
                          name="name"
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label
                          htmlFor="email"
                          className="pb-1 text-xs uppercase tracking-wider"
                        ></label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          placeholder="Your email address"
                          className="mb-2 w-full rounded-md border outline-green-400 border-gray-400 py-2 pl-2 pr-4 sm:mb-0"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="textarea"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <textarea
                        id="textarea"
                        name="textarea"
                        value={message}
                        cols={30}
                        rows={5}
                        placeholder="Write your message..."
                        className="mb-2 w-full rounded-md border outline-green-400 border-gray-400 py-2 pl-2 pr-4 sm:mb-0"
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-full bg-green-500 hover:bg-green-700 text-white px-6 py-3 font-xl rounded-md sm:mb-0"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
