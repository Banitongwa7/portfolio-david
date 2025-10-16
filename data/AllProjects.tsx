import Project1 from "../public/project/project1.png"
import Project2 from "../public/project/project2.png"
import Project3 from "../public/project/project3.png"
import Project4 from "../public/project/project4.png"
import Project5 from "../public/project/project5.jpg"
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


const AllProjects = [
    {
        id: 1,
        name: "RecycleAI",
        description: "A waste management & Recycling Copilot",
        link: "https://github.com/Banitongwa7/RecycleAI",
        techs: {
            nextjs: <TbBrandNextjs />,
            tailwind: <SiTailwindcss />,
            django: <SiDjango />
        },
        image: Project5
    },
    {
        id: 2,
        name: "Synapse HR",
        description: "An innovative startup that values people within the company, fostering effective team connection and engagement.",
        link: "https://synapse-hr.io/",
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
        image: Project6
    },
    {
        id: 3,
        name: "QuickCRM",
        description: "A customer relationship management (CRM) application that centralizes the entire process from lead creation to opportunity declaration for businesses.",
        link: "#",
        techs: {
            dataverse: <FaDatabase />,
            powerapps: <FaMicrosoft />,
            powerautomate: <MdAutoAwesomeMosaic/>,
            powerbi: <SiGoogleanalytics />,
        },
        image: Project7
    },
    {
        id: 4,
        name: "BhetiConnect",
        description: "Bheti Connect is the leading platform connecting entrepreneurs and investors in Francophone Africa.",
        link: "https://github.com/bheti-connect",
        techs: {
            laravel: <FaLaravel/>,
            reactjs: <FaReact />,
            sass: <FaSass />
        },
        image: Project8,
    },
    {
        id: 5,
        name: "DigiLAF",
        description: "An operational credit application analysis tool deployed in Côte d'Ivoire, Tunisia, Ghana, Nigeria, and Cameroon.",
        link: "#",
        techs: {
            powerapps: <FaMicrosoft />,
            powerautomate: <MdAutoAwesomeMosaic/>,
            sqlserver: <DiMsqlServer />,
        },
        image: Project9
    },
    {
        id: 6,
        name: "Credit Squares",
        description: "Credit Squares is a Field Solution Accelerator with features going from Real-Time Scoring & Analytics to Portfolio & Customer Monitoring capabilities, as well as, Customer Acquisition & Prospection whilst integrated with internal and external systems.",
        link: "https://www.linkedin.com/products/biware-consulting-credit-squares/",
        techs: {
            powerapps: <FaMicrosoft />,
            powerautomate: <MdAutoAwesomeMosaic/>,
            dataverse: <FaDatabase />,
            powerbi: <SiGoogleanalytics />,
        },
        image: Project10
    },
    {
        id: 7,
        name: "Binnov",
        description: "An application built on a customized innovation process model to efficiently manage ideas within the company.",
        link: "#",
        techs: {
            powerapps: <FaMicrosoft />,
            powerautomate: <MdAutoAwesomeMosaic/>,
            dataverse: <FaDatabase />
        },
        image: Project11
    },
    {
        id: 8,
        name: "Social Emotion Analysis | SEA",
        description: "A tool for detecting social emotions in Text. Developed with Python and hosted on Streamlit.",
        link: "https://github.com/Banitongwa7/Social-Emotion-Analysis",
        techs: {
            python: <FaPython />,
            streamlit: <SiStreamlit />,
        },
        image: Project1,
    },
    {
        id: 9,
        name: "VFriend",
        description: "A virtual friend for everyone.",
        link: "https://github.com/Banitongwa7/VFriend",
        techs: {
            java: <FaJava />,
            openai: <SiOpenai />,
        },
        image: Project2,
    },
    {
        id: 10,
        name: "OpenOCR",
        description: "A free OCR tool to extract text from images.",
        link: "https://github.com/Banitongwa7/OpenOCR",
        techs: {
            nextjs: <TbBrandNextjs />,
            tailwind: <SiTailwindcss />,
            nodejs: <FaNodeJs />,
            express: <SiExpress />,
        },
        image: Project3,
    },
    {
        id: 11,
        name: "ToDo List",
        description: "An app to keep track of your tasks.",
        link: "https://github.com/Banitongwa7/todo-app-spring-angular",
        techs: {
            angular: <FaAngular />,
            springboot: <BiLogoSpringBoot />,
        },
        image: Project4,
    }
]


export default AllProjects