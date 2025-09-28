import { HiColorSwatch } from "react-icons/hi";
import { FaHeadphones } from 'react-icons/fa'
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
        publishedAt: "2025-04-26"
    },
    {
        id: "0003",
        name: "Image Optimizer",
        description: "Optimize and convert images to different formats with adjustable quality settings.",
        icon: <HiColorSwatch />,
        slug: "/tools/tool/tool3",
        developer: "David B.",
        publishedAt: "2025-04-26"
    },
]

export default AllTools;