import Link from "next/link";
import { HiArrowUp } from "react-icons/hi2";
import SocialLinks from "../social/SocialLinks";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
          >
            David<span className="text-accent-500">.</span>
          </Link>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Software Engineer and Microsoft Power Platform Developer.
          </p>
          <SocialLinks className="-ml-2.5 mt-4" />
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
            {FOOTER_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 text-sm text-slate-500 dark:text-slate-400 sm:px-6">
          <p>© {new Date().getFullYear()} David Banitongwa. All rights reserved.</p>
          <a
            href="#main"
            className="inline-flex shrink-0 items-center gap-1 transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            Back to top <HiArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
