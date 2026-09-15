import {
  FaBehance,
  FaGithub,
  FaHashnode,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import AllLinks from "@/data/AllLinks";

const SOCIALS = [
  { href: AllLinks.github, label: "GitHub", icon: FaGithub },
  { href: AllLinks.linkedin, label: "LinkedIn", icon: FaLinkedin },
  { href: AllLinks.twitter, label: "X (Twitter)", icon: FaXTwitter },
  { href: AllLinks.behance, label: "Behance", icon: FaBehance },
  { href: AllLinks.hashnode, label: "Hashnode", icon: FaHashnode },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-1 ${className}`}>
      {SOCIALS.map(({ href, label, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
