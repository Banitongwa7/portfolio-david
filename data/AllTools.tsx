import { HiColorSwatch } from "react-icons/hi";
import { FaHeadphones, FaStickyNote, FaImage, FaLock } from 'react-icons/fa'
import { IoQrCode } from "react-icons/io5";
import { GrTextAlignFull } from "react-icons/gr";
import { LuSpeech } from "react-icons/lu";
import type { ToolType } from "@/types/types";
import ColorGenerator from "@/components/tools/ColorGenerator";
import LofiSpace from "@/components/tools/LofiSpace";
import QRCodeGenerator from "@/components/tools/QRCodeGenerator";
import StickyNotes from "@/components/tools/StickyNotes";
import ImageCompressor from "@/components/tools/ImageCompressor";
import TextAnalyzer from "@/components/tools/TextAnalyzer";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import TextToSpeech from "@/components/tools/TextToSpeech";
import Cover from "./../public/tools/cover.jpeg";

const AllTools: ToolType[] = [
    {
        id: "0001",
        name: "Color Generator",
        description: "A tool to generate color palettes. It helps you to find the perfect color combination for your project or design.",
        icon: <HiColorSwatch />,
        slug: "/tools/color-generator",
        developer: "David B.",
        publishedAt: "2025-04-26",
        component: <ColorGenerator />,
        coverImage: Cover.src
    },
    {
        id: "0002",
        name: "Lofi Space",
        description: "A relaxing lofi music player with ambient sounds to help you focus and unwind.",
        icon: <FaHeadphones />,
        slug: "/tools/lofi-space",
        developer: "David B.",
        publishedAt: "2025-09-27",
        component: <LofiSpace />,
        coverImage: Cover.src
    },
    {
        id: "0003",
        name: "QR Code Generator",
        description: "Create and download QR codes instantly.",
        icon: <IoQrCode />,
        slug: "/tools/qr-code-generator",
        developer: "David B.",
        publishedAt: "2025-09-28",
        component: <QRCodeGenerator />,
        coverImage: Cover.src
    },
    {
        id: "0004",
        name: "Sticky Notes",
        description: "A simple and intuitive sticky notes app to jot down your thoughts and ideas.",
        icon: <FaStickyNote />,
        slug: "/tools/sticky-notes",
        developer: "David B.",
        publishedAt: "2025-09-28",
        component: <StickyNotes />,
        coverImage: Cover.src
    },
    {
        id: "0005",
        name: "Image Compressor",
        description: "Compress images to reduce file size while maintaining quality.",
        icon: <FaImage />,
        slug: "/tools/image-compressor",
        developer: "David B.",
        publishedAt: "2025-09-28",
        component: <ImageCompressor />,
        coverImage: Cover.src
    },
    {
        id: "0006",
        name: "Text Analyzer",
        description: "Analyze your text to get insights like word count, character count, sentence count, and estimated reading time.",
        icon: <GrTextAlignFull />,
        slug: "/tools/text-analyzer",
        developer: "David B.",
        publishedAt: "2025-09-28",
        component: <TextAnalyzer />,
        coverImage: Cover.src
    },
    {
        id: "0007",
        name: "Password Generator",
        description: "Generate strong and secure passwords to protect your online accounts.",
        icon: <FaLock />,
        slug: "/tools/password-generator",
        developer: "David B.",
        publishedAt: "2025-09-29",
        component: <PasswordGenerator />,
        coverImage: Cover.src
    },
    {
        id: "0008",
        name: "Text to Speech",
        description: "Convert written text into spoken words using text-to-speech technology.",
        icon: <LuSpeech />,
        slug: "/tools/text-to-speech",
        developer: "David B.",
        publishedAt: "2025-09-29",
        component: <TextToSpeech />,
        coverImage: Cover.src
    },
]

export default AllTools;