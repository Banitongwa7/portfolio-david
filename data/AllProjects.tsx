import type { StaticImageData } from "next/image";
import type { JSX } from "react";
import Project1 from "../public/project/project1.png"
import Project2 from "../public/project/project2.png"
import Project3 from "../public/project/project3.png"
import Project4 from "../public/project/project4.png"
import Project5Cover from "../public/project/project5-cover.png"
import Project6 from "../public/project/project6.jpg"
import Project7 from "../public/project/project7.png"
import Project8 from "../public/project/project8.jpg"
import Project9 from "../public/project/project9.png"
import Project10 from "../public/project/project10.png"
import Project11 from "../public/project/project11.jpg"
import { FaPython, FaJava, FaNodeJs, FaAngular, FaSwift, FaReact, FaDatabase, FaLaravel, FaSass} from "react-icons/fa6";
import { SiStreamlit, SiOpenai, SiExpress, SiTailwindcss, SiDjango, SiKotlin, SiPostgresql, SiKubernetes, SiGoogleanalytics} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { BiLogoSpringBoot } from "react-icons/bi";
import { FaMicrosoft } from "react-icons/fa";
import { MdAutoAwesomeMosaic } from "react-icons/md";
import { VscAzure } from "react-icons/vsc";
import { TbBrandCSharp } from "react-icons/tb";
import { DiMsqlServer } from "react-icons/di";

export type Practice = "pp" | "web" | "ai";

export const PRACTICES: Record<Practice, string> = {
    pp: "Power Platform",
    web: "Web & Mobile",
    ai: "AI & Data",
};

// Used in links such as /projects?practice=power-platform
export const PRACTICE_SLUG: Record<Practice, string> = {
    pp: "power-platform",
    web: "web-mobile",
    ai: "ai-data",
};

export type Project = {
    id: number;
    name: string;
    description: string;
    // "#" marks a private client project with nothing public to link to.
    link: string;
    linkKind?: "Live site" | "Product page" | "Open source";
    linkLabel?: string;
    practice: Practice;
    // Readable names for the technology chips; `techs` keeps the icons.
    stack: string[];
    techs: Record<string, JSX.Element>;
    image: StaticImageData;
    // The image is shown whole ("contain") on its own edge color so text in a
    // banner is never cropped. `cover` is for images without a plain edge.
    imageBg: string;
    imageFit?: "contain" | "cover";
    imagePad?: boolean;
};

// Ordered as they appear on the Projects page.
const AllProjects: Project[] = [
    {
        id: 6,
        name: "Credit Squares",
        description: "A field solution accelerator for credit institutions: real-time scoring, portfolio monitoring and customer acquisition.",
        link: "https://www.linkedin.com/products/biware-consulting-credit-squares/",
        linkKind: "Product page",
        linkLabel: "View product",
        practice: "pp",
        stack: ["Power Apps", "Power Automate", "Dataverse", "Power BI"],
        techs: {
            powerapps: <FaMicrosoft />,
            powerautomate: <MdAutoAwesomeMosaic/>,
            dataverse: <FaDatabase />,
            powerbi: <SiGoogleanalytics />,
        },
        image: Project10,
        imageBg: "#1C335B",
    },
    {
        id: 2,
        name: "Synapse HR",
        description: "A startup platform that helps companies connect and engage their teams.",
        link: "https://synapse-hr.io/",
        linkKind: "Live site",
        linkLabel: "Visit site",
        practice: "web",
        stack: ["React", "Tailwind CSS", "Swift", "Kotlin", "Python", "Power Apps", "Dataverse", "Power Automate", "Azure", "PostgreSQL", "C#", "Kubernetes"],
        techs: {
            reactjs: <FaReact />,
            tailwind: <SiTailwindcss />,
            swift: <FaSwift />,
            kotlin: <SiKotlin />,
            python: <FaPython />,
            powerapps: <FaMicrosoft />,
            dataverse: <FaDatabase />,
            powerautomate: <MdAutoAwesomeMosaic/>,
            azure: <VscAzure />,
            postgresql: <SiPostgresql />,
            csharp: <TbBrandCSharp />,
            kubernetes: <SiKubernetes />
        },
        image: Project6,
        imageBg: "#FFFFFF",
    },
    {
        id: 1,
        name: "RecycleAI",
        description: "A waste management and recycling copilot.",
        link: "https://github.com/Banitongwa7/RecycleAI",
        linkKind: "Open source",
        linkLabel: "View code",
        practice: "ai",
        stack: ["Next.js", "Tailwind CSS", "Django"],
        techs: {
            nextjs: <TbBrandNextjs />,
            tailwind: <SiTailwindcss />,
            django: <SiDjango />
        },
        image: Project5Cover,
        imageBg: "#05203B",
        imagePad: true,
    },
    {
        id: 5,
        name: "DigiLAF",
        description: "A credit application analysis tool deployed in Côte d'Ivoire, Tunisia, Ghana, Nigeria and Cameroon.",
        link: "#",
        practice: "pp",
        stack: ["Power Apps", "Power Automate", "SQL Server"],
        techs: {
            powerapps: <FaMicrosoft />,
            powerautomate: <MdAutoAwesomeMosaic/>,
            sqlserver: <DiMsqlServer />,
        },
        image: Project9,
        imageBg: "#FFFFFF",
    },
    {
        id: 3,
        name: "QuickCRM",
        description: "A CRM that takes a business from lead creation to declared opportunity in one place.",
        link: "#",
        practice: "pp",
        stack: ["Dataverse", "Power Apps", "Power Automate", "Power BI"],
        techs: {
            dataverse: <FaDatabase />,
            powerapps: <FaMicrosoft />,
            powerautomate: <MdAutoAwesomeMosaic/>,
            powerbi: <SiGoogleanalytics />,
        },
        image: Project7,
        imageBg: "#FFFFFF",
    },
    {
        id: 4,
        name: "BhetiConnect",
        description: "A platform connecting entrepreneurs and investors in Francophone Africa.",
        link: "https://github.com/bheti-connect",
        linkKind: "Open source",
        linkLabel: "View code",
        practice: "web",
        stack: ["Laravel", "React", "Sass"],
        techs: {
            laravel: <FaLaravel/>,
            reactjs: <FaReact />,
            sass: <FaSass />
        },
        image: Project8,
        imageBg: "#540002",
    },
    {
        id: 7,
        name: "Binnov",
        description: "Manages ideas inside a company, built on a customized innovation process.",
        link: "#",
        practice: "pp",
        stack: ["Power Apps", "Power Automate", "Dataverse"],
        techs: {
            powerapps: <FaMicrosoft />,
            powerautomate: <MdAutoAwesomeMosaic/>,
            dataverse: <FaDatabase />
        },
        image: Project11,
        imageBg: "#FFFFFF",
    },
    {
        id: 8,
        name: "Social Emotion Analysis",
        description: "Detects social emotions in text. Built in Python and hosted on Streamlit.",
        link: "https://github.com/Banitongwa7/Social-Emotion-Analysis",
        linkKind: "Open source",
        linkLabel: "View code",
        practice: "ai",
        stack: ["Python", "Streamlit"],
        techs: {
            python: <FaPython />,
            streamlit: <SiStreamlit />,
        },
        image: Project1,
        imageBg: "#444DA4",
        imageFit: "cover",
    },
    {
        id: 10,
        name: "OpenOCR",
        description: "A free OCR tool that extracts text from images.",
        link: "https://github.com/Banitongwa7/OpenOCR",
        linkKind: "Open source",
        linkLabel: "View code",
        practice: "web",
        stack: ["Next.js", "Tailwind CSS", "Node.js", "Express"],
        techs: {
            nextjs: <TbBrandNextjs />,
            tailwind: <SiTailwindcss />,
            nodejs: <FaNodeJs />,
            express: <SiExpress />,
        },
        image: Project3,
        imageBg: "#FFFFFF",
    },
    {
        id: 9,
        name: "VFriend",
        description: "A virtual friend for everyone, powered by OpenAI.",
        link: "https://github.com/Banitongwa7/VFriend",
        linkKind: "Open source",
        linkLabel: "View code",
        practice: "ai",
        stack: ["Java", "OpenAI"],
        techs: {
            java: <FaJava />,
            openai: <SiOpenai />,
        },
        image: Project2,
        imageBg: "#0095FF",
    },
    {
        id: 11,
        name: "ToDo List",
        description: "An app to keep track of your tasks.",
        link: "https://github.com/Banitongwa7/todo-app-spring-angular",
        linkKind: "Open source",
        linkLabel: "View code",
        practice: "web",
        stack: ["Angular", "Spring Boot"],
        techs: {
            angular: <FaAngular />,
            springboot: <BiLogoSpringBoot />,
        },
        image: Project4,
        imageBg: "#F7F9FF",
    }
]


export default AllProjects
