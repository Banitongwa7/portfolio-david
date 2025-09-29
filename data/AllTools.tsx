import { HiColorSwatch } from "react-icons/hi";
import { FaHeadphones, FaStickyNote, FaImage, FaLock } from 'react-icons/fa'
import { IoQrCode } from "react-icons/io5";
import { GrTextAlignFull } from "react-icons/gr";
import { LuSpeech } from "react-icons/lu";
import type { ToolType } from "@/types/types";

const AllTools: ToolType[] = [
    {
        id: "0001",
        name: "Color Generator",
        description: "A tool to generate color palettes. It helps you to find the perfect color combination for your project or design.",
        icon: <HiColorSwatch />,
        slug: "/tools/tool/tool1",
        developer: "David B.",
        publishedAt: "2025-04-26"
    },
    {
        id: "0002",
        name: "Lofi Space",
        description: "A relaxing lofi music player with ambient sounds to help you focus and unwind.",
        icon: <FaHeadphones />,
        slug: "/tools/tool/tool2",
        developer: "David B.",
        publishedAt: "2025-09-27"
    },
    {
        id: "0003",
        name: "QR Code Generator",
        description: "Create and download QR codes instantly.",
        icon: <IoQrCode />,
        slug: "/tools/tool/tool3",
        developer: "David B.",
        publishedAt: "2025-09-28"
    },
    {
        id: "0004",
        name: "Sticky Notes",
        description: "A simple and intuitive sticky notes app to jot down your thoughts and ideas.",
        icon: <FaStickyNote />,
        slug: "/tools/tool/tool4",
        developer: "David B.",
        publishedAt: "2025-09-28"
    },
    {
        id: "0005",
        name: "Image Compressor",
        description: "Compress images to reduce file size while maintaining quality.",
        icon: <FaImage />,
        slug: "/tools/tool/tool5",
        developer: "David B.",
        publishedAt: "2025-09-28"
    },
    {
        id: "0006",
        name: "Text Analyzer",
        description: "Analyze your text to get insights like word count, character count, sentence count, and estimated reading time.",
        icon: <GrTextAlignFull />,
        slug: "/tools/tool/tool6",
        developer: "David B.",
        publishedAt: "2025-09-28"
    },
    {
        id: "0007",
        name: "Password Generator",
        description: "Generate strong and secure passwords to protect your online accounts.",
        icon: <FaLock />,
        slug: "/tools/tool/tool7",
        developer: "David B.",
        publishedAt: "2025-09-29"
    },
    {
        id: "0008",
        name: "Text to Speech",
        description: "Convert written text into spoken words using text-to-speech technology.",
        icon: <LuSpeech />,
        slug: "/tools/tool/tool8",
        developer: "David B.",
        publishedAt: "2025-09-29"
    },
]

export default AllTools;