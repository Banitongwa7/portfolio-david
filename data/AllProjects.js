import Project1 from "../public/project/project1.png"
import Project2 from "../public/project/project2.png"
import Project3 from "../public/project/project3.png"
import Project4 from "../public/project/project4.png"
import { FaPython, FaJava, FaNodeJs, FaAngular } from "react-icons/fa6";
import { SiStreamlit, SiOpenai, SiExpress, SiTailwindcss } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { BiLogoSpringBoot } from "react-icons/bi";

const AllProjects = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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