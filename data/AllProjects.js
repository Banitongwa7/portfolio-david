import Project1 from "../public/project/project1.png"
import Project2 from "../public/project/project2.png"
import { FaPython, FaJava } from "react-icons/fa6";
import { SiStreamlit, SiOpenai } from "react-icons/si";

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
    }
]


export default AllProjects