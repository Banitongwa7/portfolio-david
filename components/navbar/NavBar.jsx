import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { FaLinkedin, FaGithub, FaSquareXTwitter } from "react-icons/fa6";
import SocialLinks from "@/data/SocialLinks";


export default function NavBar() {
    const navbar = useRef(null);

    useEffect(() => {
        const pointer = document.createElement("DIV");
        pointer.id = "mouse-pointer";
        const centerPointer = document.createElement("DIV");
        centerPointer.id = "center-point";
        document.body.appendChild(pointer);
        document.body.appendChild(centerPointer);
    
        document.onmousemove = function (event) {
          requestAnimationFrame(() => {
            centerPointer.style.left = event.clientX - 2 + "px";
            centerPointer.style.top = event.clientY - 2 + "px";
          });
          setTimeout(() => {
            requestAnimationFrame(() => {
              pointer.style.left = event.clientX - 25 + "px";
              pointer.style.top = event.clientY - 25 + "px";
            });
          }, 100);
        };
    
        document.onmousedown = function (event) {
          requestAnimationFrame(() => {
            centerPointer.style.transform = "scale(1.3)";
          });
        };
    
        document.onmouseup = function (event) {
          requestAnimationFrame(() => {
            centerPointer.style.transform = "scale(1)";
          });
        };
      }, []);

  const handleChangeMenu = (index) => {
      let liTags = navbar.current.children
      Array.from(liTags).forEach(li => {
          li.classList.remove('active')
      })
      liTags[index].classList.add('active')
  }
  return (
    <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02">
      <h1 className="w-3/12">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-green-500 duration-200"
        >
          David.
        </Link>
      </h1>
      <nav className="nav font-semibold text-lg">
        <ul ref={navbar} id="navbar-custom" className="flex items-center">
          <li className="p-4 active hover:text-green-500 cursor-pointer active">
            <Link href="/" onClick={() => handleChangeMenu(0)}>Home</Link>
          </li>
          <li className="p-4 hover:text-green-500 cursor-pointer">
            <Link href="/about" onClick={() => handleChangeMenu(1)}>About</Link>
          </li>
          <li className="p-4 hover:text-green-500 cursor-pointer" >
            <Link href="/projects" onClick={() => handleChangeMenu(2)}>Projects</Link>
          </li>
          <li className="p-4 hover:text-green-500 cursor-pointer">
            <Link href="/blog" onClick={() => handleChangeMenu(3)}>Blog</Link>
          </li>
          <li className="p-4 hover:text-green-500 cursor-pointer">
            <Link href="/contact" onClick={() => handleChangeMenu(4)}>Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="w-3/12 flex justify-end social-link">
        <Link
          href={SocialLinks.linkedin}
          className="p-4 text-[20px] hover:text-green-500 duration-200"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin />
        </Link>

        <Link
          href={SocialLinks.github}
          className="p-4 text-[20px] hover:text-green-500 duration-200"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </Link>

        <Link
          href={SocialLinks.twitter}
          className="p-4 text-[20px] hover:text-green-500 duration-200"
          target="_blank"
          rel="noreferrer"
        >
          <FaSquareXTwitter />
        </Link>
      </div>
    </header>
  );
}
