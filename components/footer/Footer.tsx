import Link from "next/link";
import { HiArrowUpRight, HiOutlineEnvelope, HiOutlineMapPin } from "react-icons/hi2";
import AllLinks from "@/data/AllLinks";
import AllProjects from "@/data/AllProjects";
import WordRise from "@/components/motion/WordRise";
import { SOCIALS } from "@/components/site/socials";
import ConsentSettingsButton from "@/components/site/ConsentSettingsButton";

// The closing banner. Change this one word to change it on every page.
const FOOTER_WORD = "LET'S BUILD";
export const EMAIL = "davidbanitongwa@gmail.com";

const PAGES = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
  { href: "/quote", label: "Quote of the day" },
  { href: "/contact", label: "Contact" },
];

const FEATURED = ["Credit Squares", "Synapse HR", "RecycleAI", "OpenOCR"];

export default function Footer() {
  const projects = FEATURED.map((name) => AllProjects.find((p) => p.name === name)).filter(
    (p): p is (typeof AllProjects)[number] => Boolean(p && p.link && p.link !== "#")
  );

  return (
    <footer>
      <h2 className="sr">Site links</h2>
      <div className="wrap">
        <div className="foot">
          <div className="foot-brand">
            <Link href="/" className="logo" aria-label="David Banitongwa, home">
              David<span className="logo-dot" />
            </Link>
            <p>Software engineer and Microsoft Power Platform developer based in Kinshasa, DR&nbsp;Congo.</p>
            <ul className="socials">
              {SOCIALS.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} title={label}>
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer">
            <h3>Pages</h3>
            <ul className="foot-links">
              {PAGES.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3>Projects</h3>
            <ul className="foot-links">
              {projects.map((p) => (
                <li key={p.id}>
                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul className="foot-links">
              <li>
                <a href={`mailto:${EMAIL}`}>
                  <HiOutlineEnvelope aria-hidden="true" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <span>
                  <HiOutlineMapPin aria-hidden="true" />
                  Kinshasa, DR&nbsp;Congo
                </span>
              </li>
              <li>
                <a href={AllLinks.needService} target="_blank" rel="noopener noreferrer">
                  <HiArrowUpRight aria-hidden="true" />
                  Start a project
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mark">
        <WordRise word={FOOTER_WORD} className="mark-word" />
      </div>
      <div className="wrap legal">
        <p>© {new Date().getFullYear()} David Banitongwa</p>
        <div className="legal-links">
          <ConsentSettingsButton />
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
