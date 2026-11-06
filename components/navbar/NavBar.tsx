"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import { HiArrowUpRight, HiBars3, HiXMark } from "react-icons/hi2";
import { gsap, prefersReducedMotion, registerGsap } from "@/utils/motion";
import AllLinks from "@/data/AllLinks";
import { SOCIALS } from "@/components/site/socials";

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// The Tawk chat bubble sits above everything; it is hidden while the menu is open.
type TawkApi = { hideWidget?: () => void; showWidget?: () => void };
const tawk = () => (window as unknown as { Tawk_API?: TawkApi }).Tawk_API;

// The light bar sits at the top of every inner page. The home page renders the
// dark variant itself, inside its hero, so the layout's copy steps aside there.
export default function NavBar({ variant = "light" }: { variant?: "light" | "dark" }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navEl = useRef<HTMLElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const pillPlaced = useRef(false);
  const hidden = variant === "light" && pathname === "/";

  // One highlight travels to the active tab instead of each link lighting up.
  useGSAP(
    () => {
      registerGsap();
      const list = navEl.current;
      const highlight = pill.current;
      if (!list || !highlight) return;

      const place = (animate: boolean) => {
        const active = list.querySelector<HTMLElement>('a[aria-current="page"]');
        if (!active) {
          gsap.set(highlight, { autoAlpha: 0 });
          return;
        }
        const vars = {
          x: active.getBoundingClientRect().left - list.getBoundingClientRect().left,
          width: active.offsetWidth,
          autoAlpha: 1,
        };
        if (animate && !prefersReducedMotion()) {
          gsap.to(highlight, { ...vars, duration: 0.45, ease: "power3.out" });
        } else {
          gsap.set(highlight, vars);
        }
        list.dataset.ready = "true";
      };

      place(pillPlaced.current);
      pillPlaced.current = true;

      const onResize = () => place(false);
      window.addEventListener("resize", onResize);
      // Web fonts change the tab widths once they load.
      document.fonts?.ready.then(() => place(false));
      return () => window.removeEventListener("resize", onResize);
    },
    { dependencies: [pathname, hidden] }
  );

  useEffect(() => {
    if (!menuOpen) return;

    const dialog = document.getElementById("mobile-menu");
    dialog?.querySelector<HTMLElement>(".mmenu-close")?.focus();
    document.body.style.overflow = "hidden";
    tawk()?.hideWidget?.();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
        return;
      }
      // Keep Tab inside the open menu.
      if (e.key === "Tab" && dialog) {
        const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      tawk()?.showWidget?.();
    };
  }, [menuOpen]);

  if (hidden) return null;

  const closeMenu = () => {
    setMenuOpen(false);
    menuButton.current?.focus();
  };

  return (
    <header className={variant === "dark" ? "nav nav-dark" : "nav"}>
      <Link href="/" className="logo" aria-label="David Banitongwa, home">
        David<span className="logo-dot" />
      </Link>

      <nav ref={navEl} aria-label="Main" className="navpill">
        <span ref={pill} className="navpill-hl" aria-hidden="true" />
        <ul style={{ display: "flex", gap: 2 }}>
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} aria-current={isActive(pathname, href) ? "page" : undefined}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="nav-end">
        <a
          className="btn btn-neon btn-sm nav-cta"
          href={AllLinks.needService}
          target="_blank"
          rel="noopener noreferrer"
        >
          Start a project<span className="sr"> (opens in a new tab)</span>
          <span className="ic">
            <HiArrowUpRight aria-hidden="true" />
          </span>
        </a>
        <button
          ref={menuButton}
          type="button"
          className="menu-btn"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <HiBars3 size={22} aria-hidden="true" />
        </button>
      </div>

      {menuOpen &&
        createPortal(
          <div className="mmenu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="mmenu-top">
              <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
                David<span className="logo-dot" />
              </Link>
              <button type="button" className="mmenu-close" aria-label="Close menu" onClick={closeMenu}>
                <HiXMark size={22} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile">
              <ul className="mmenu-list">
                {NAV_ITEMS.map(({ href, label }, index) => {
                  const active = isActive(pathname, href);
                  return (
                    <li key={href} style={{ animationDelay: `${index * 40}ms` }}>
                      <Link
                        href={href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        {active ? <span className="neon">{label}</span> : label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mmenu-foot">
              <a className="btn btn-neon" href={AllLinks.needService} target="_blank" rel="noopener noreferrer">
                Start a project<span className="sr"> (opens in a new tab)</span>
              </a>
              <Link className="btn btn-glass" href="/contact" onClick={() => setMenuOpen(false)}>
                Send a message
              </Link>
              <ul className="mmenu-social">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
