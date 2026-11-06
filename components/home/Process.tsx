import { HiOutlineChatBubbleOvalLeft, HiOutlineClipboardDocumentList, HiOutlineRocketLaunch } from "react-icons/hi2";
import s from "./home.module.css";

const STEPS = [
  {
    icon: <HiOutlineChatBubbleOvalLeft size={26} aria-hidden="true" />,
    title: "Tell me what you need",
    text: "Share your goals, users and deadline through the project form.",
  },
  {
    icon: <HiOutlineClipboardDocumentList size={26} aria-hidden="true" />,
    title: "Get a clear scope",
    text: "I come back with questions, a plan and an estimate before writing any code.",
  },
  {
    icon: <HiOutlineRocketLaunch size={26} aria-hidden="true" />,
    title: "Ship in short iterations",
    text: "You test working builds early, and we refine until it's live.",
  },
];

export default function Process() {
  return (
    <section className={s.process} aria-labelledby="process-title">
      <div className="wrap">
        <span className="tag tag-dark">How we work</span>
        <h2 id="process-title" className="h2">
          Three steps from idea to a shipped app
        </h2>
        <ol className={s.steps}>
          {STEPS.map((step) => (
            <li key={step.title} className={s.step}>
              <span className={s.stepIc}>{step.icon}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
