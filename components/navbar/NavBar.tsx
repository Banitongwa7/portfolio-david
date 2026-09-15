"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiBars3, HiXMark } from "react-icons/hi2";
import AllLinks from "@/data/AllLinks";
import Switcher from "../switcher/Switcher";
import SocialLinks from "../social/SocialLinks";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
  { href: "/quote", label: "Quote" },
  { href: "/contact", label: "Contact" },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButton.current?.focus();
  };

  useEffect(() => {
    if (!menuOpen) return;

    closeButton.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-[#f8f8f8]/80 backdrop-blur-md dark:border-slate-800/70 dark:bg-[#0f172a]/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-slate-900 transition-colors hover:text-accent-600 dark:text-slate-100 dark:hover:text-accent-400"
          >
            David<span className="text-accent-500">.</span>
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map(({ href, label }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "bg-slate-900/5 text-slate-900 dark:bg-white/10 dark:text-white"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <a
              href={AllLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white md:inline-flex"
            >
              <FaGithub className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={AllLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white md:inline-flex"
            >
              <FaLinkedin className="h-5 w-5" aria-hidden="true" />
            </a>
            <Switcher />
            <button
              ref={menuButton}
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/10 md:hidden"
            >
              <HiBars3 className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Kept outside <header>: its backdrop-filter would trap `fixed` children. */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${menuOpen ? "" : "pointer-events-none"}`}
        inert={!menuOpen}
      >
        <div
          aria-hidden="true"
          onClick={closeMenu}
          className={`absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute right-0 top-0 flex h-full w-72 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-slate-900 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
            <span className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Menu
            </span>
            <button
              ref={closeButton}
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              <HiXMark className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-3">
            <ul className="space-y-1">
              {NAV_ITEMS.map(({ href, label }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        active
                          ? "bg-accent-500/10 text-accent-700 dark:text-accent-400"
                          : "text-slate-700 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-white/5"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-slate-200 p-4 dark:border-slate-800">
            <SocialLinks className="justify-center" />
          </div>
        </div>
      </div>
    </>
  );
}
