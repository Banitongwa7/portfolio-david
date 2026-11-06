import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import s from "@/components/quote/quote.module.css";

const SHORTCUTS = [
  { href: "/projects", label: "Projects" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className={`night ${s.nf}`} aria-labelledby="page-title">
      <span className={s.streak} aria-hidden="true" />
      <div className={`wrap ${s.inner}`}>
        <p className={s.code} aria-hidden="true">
          404
        </p>
        <h1 id="page-title">Page not found</h1>
        <p className={s.lead}>{"Sorry, the page you're looking for doesn't exist or has been moved."}</p>
        <div className="cta-row">
          <Link href="/" className="btn btn-neon">
            Back to home
            <span className="ic">
              <HiArrowUpRight aria-hidden="true" />
            </span>
          </Link>
          <Link href="/blog" className="btn btn-glass">
            Read the blog
          </Link>
        </div>
        <nav className={s.tryl} aria-labelledby="try-title">
          <h2 id="try-title">Or go straight to</h2>
          <ul>
            {SHORTCUTS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
