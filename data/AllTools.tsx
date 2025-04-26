import { HiColorSwatch } from "react-icons/hi";
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
]

export default AllTools;