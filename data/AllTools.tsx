import { HiColorSwatch } from "react-icons/hi";
import { FaHeadphones, FaStickyNote, FaImage, FaLock } from "react-icons/fa";
import { IoQrCode } from "react-icons/io5";
import { GrTextAlignFull } from "react-icons/gr";
import { LuSpeech, LuAudioLines } from "react-icons/lu";
import { FiBarChart2 } from "react-icons/fi";
import type { ToolType } from "@/types/types";
import Cover from "./../public/tools/cover.jpeg";
import { MdHub } from "react-icons/md";

// Only what lists and pages need to describe a tool. The tools themselves are
// loaded on demand by components/tools/ToolView.tsx, so a page that lists
// tools never downloads their code (jsPDF, PeerJS, PartySocket...).
const AllTools: ToolType[] = [
  {
    id: "0001",
    name: "Color Generator",
    description:
      "A tool to generate color palettes. It helps you to find the perfect color combination for your project or design.",
    icon: <HiColorSwatch />,
    slug: "/tools/color-generator",
    developer: "David B.",
    publishedAt: "2025-04-26",
    coverImage: Cover.src,
  },
  {
    id: "0002",
    name: "Lofi Space",
    description:
      "A relaxing lofi music player with ambient sounds to help you focus and unwind.",
    icon: <FaHeadphones />,
    slug: "/tools/lofi-space",
    developer: "David B.",
    publishedAt: "2025-09-27",
    coverImage: Cover.src,
  },
  {
    id: "0003",
    name: "QR Code Generator",
    description: "Create and download QR codes instantly.",
    icon: <IoQrCode />,
    slug: "/tools/qr-code-generator",
    developer: "David B.",
    publishedAt: "2025-09-28",
    coverImage: Cover.src,
  },
  {
    id: "0004",
    name: "Sticky Notes",
    description:
      "A simple and intuitive sticky notes app to jot down your thoughts and ideas.",
    icon: <FaStickyNote />,
    slug: "/tools/sticky-notes",
    developer: "David B.",
    publishedAt: "2025-09-28",
    coverImage: Cover.src,
  },
  {
    id: "0005",
    name: "Image Compressor",
    description:
      "Compress images to reduce file size while maintaining quality.",
    icon: <FaImage />,
    slug: "/tools/image-compressor",
    developer: "David B.",
    publishedAt: "2025-09-28",
    coverImage: Cover.src,
  },
  {
    id: "0006",
    name: "Text Analyzer",
    description:
      "Analyze your text to get insights like word count, character count, sentence count, and estimated reading time.",
    icon: <GrTextAlignFull />,
    slug: "/tools/text-analyzer",
    developer: "David B.",
    publishedAt: "2025-09-28",
    coverImage: Cover.src,
  },
  {
    id: "0007",
    name: "Password Generator",
    description:
      "Generate strong and secure passwords to protect your online accounts.",
    icon: <FaLock />,
    slug: "/tools/password-generator",
    developer: "David B.",
    publishedAt: "2025-09-29",
    coverImage: Cover.src,
  },
  {
    id: "0008",
    name: "Text to Speech",
    description:
      "Convert written text into spoken words using text-to-speech technology.",
    icon: <LuAudioLines />,
    slug: "/tools/text-to-speech",
    developer: "David B.",
    publishedAt: "2025-09-29",
    coverImage: Cover.src,
  },
  {
    id: "0009",
    name: "Speech to Text",
    description:
      "Convert spoken words into written text using speech recognition technology.",
    icon: <LuSpeech />,
    slug: "/tools/speech-to-text",
    developer: "David B.",
    publishedAt: "2025-11-11",
    coverImage: Cover.src,
  },
  // 0010 was the Fun Video Generator (Remotion), removed; see git history.
  {
    id: "0011",
    name: "WebRTC Hub",
    description: "Secure P2P File Transfer, Video & Audio Calls directly between devices.",
    icon: <MdHub />,
    slug: "/tools/webRTC-data-transfert",
    developer: "David B.",
    publishedAt: "2025-11-24",
    coverImage: Cover.src,
  },
  {
    id: "0012",
    name: "Live Poll",
    description: "Create and participate in real-time polls with beautiful visualizations and instant results.",
    icon: <FiBarChart2 />,
    slug: "/tools/live-poll",
    developer: "David B.",
    publishedAt: "2025-12-04",
    coverImage: Cover.src,
  },
];

export default AllTools;
