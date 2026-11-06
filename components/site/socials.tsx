import type { IconType } from "react-icons";
import { FaBehance, FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { SiHashnode } from "react-icons/si";
import AllLinks from "@/data/AllLinks";

// Every place that links to a social profile uses this list, so the order,
// labels and icons stay the same across the site.
export const SOCIALS: { href: string; label: string; Icon: IconType }[] = [
  { href: AllLinks.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
  { href: AllLinks.github, label: "GitHub", Icon: FaGithub },
  { href: AllLinks.twitter, label: "X", Icon: FaXTwitter },
  { href: AllLinks.behance, label: "Behance", Icon: FaBehance },
  { href: AllLinks.hashnode, label: "Hashnode", Icon: SiHashnode },
];
