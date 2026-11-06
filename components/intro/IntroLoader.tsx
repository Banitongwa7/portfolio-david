"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { HiForward } from "react-icons/hi2";
import { gsap, prefersReducedMotion } from "@/utils/motion";

export const INTRO_SEEN_KEY = "intro-seen";

// Abstract code: no characters, only syntax-coloured bars. Each line is an
// indent level and its tokens as [width in em, tone].
type Tone = "v" | "p" | "o" | "w" | "d";
type Line = { indent: number; tokens: [number, Tone][] };

const CODE: Line[] = [
  { indent: 0, tokens: [[4, "v"], [7, "w"], [3, "d"], [5, "p"]] },
  { indent: 1, tokens: [[5, "o"], [9, "w"], [4, "d"]] },
  { indent: 1, tokens: [[3, "v"], [6, "p"], [4, "w"], [7, "o"]] },
  { indent: 2, tokens: [[10, "w"], [5, "d"]] },
  { indent: 2, tokens: [[4, "p"], [6, "w"], [8, "v"]] },
  { indent: 1, tokens: [[2, "d"]] },
  { indent: 1, tokens: [[6, "o"], [4, "w"], [7, "p"]] },
  { indent: 0, tokens: [[2, "d"]] },
];
const TOKEN_GAP = 0.6; // em, matches .intro-line gap
const INDENT = 2.4; // em per level

const lineWidth = (line: Line) =>
  line.tokens.reduce((sum, [w]) => sum + w, 0) + TOKEN_GAP * (line.tokens.length - 1);

// Plays once per browser session, on whichever page the visitor lands:
// a caret types a few lines of abstract code, a scan line "compiles" them,
// the lines fold into one neon seam, and the screen splits open onto the
// page, whose own entrance starts as it parts. The inline script in
// app/layout.tsx decides before the first paint whether to play, so
// returning visitors never see a flash of it.
export default function IntroLoader() {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      const el = root.current;
      if (!el || html.dataset.intro !== "playing") return;

      // Lets the page move again: entrances play, Lenis scrolls.
      const release = () => {
        if (html.dataset.intro !== "playing") return;
        html.removeAttribute("data-intro");
        window.dispatchEvent(new Event("intro:done"));
      };
      const finish = () => {
        try {
          sessionStorage.setItem(INTRO_SEEN_KEY, "1");
        } catch {
          // Private browsing can refuse storage; the intro just plays again.
        }
        gsap.set(el, { display: "none" });
      };

      if (prefersReducedMotion()) {
        release();
        finish();
        return;
      }

      // Keeps the curtain on screen once the html flag is removed mid-way.
      gsap.set(el, { display: "block" });
      window.scrollTo(0, 0);

      const q = gsap.utils.selector(el);
      const code = q(".intro-code")[0] as HTMLElement;
      const rows = q(".intro-row") as HTMLElement[];
      const caret = q(".intro-caret")[0] as HTMLElement;
      const scan = q(".intro-scan")[0] as HTMLElement;
      const seam = q(".intro-seam")[0] as HTMLElement;
      const lineOf = (row: HTMLElement) => row.querySelector<HTMLElement>(".intro-line")!;
      const caretY = (row: HTMLElement) => row.offsetTop + (row.offsetHeight - caret.offsetHeight) / 2;

      const tl = gsap.timeline();

      // The caret waits, blinking, at the start of the first line.
      tl.set(caret, { x: lineOf(rows[0]).offsetLeft, y: caretY(rows[0]), visibility: "visible" }, 0);

      // Typing: each line is revealed in steps, like characters, with the
      // caret riding its edge.
      let t = 0.3;
      tl.call(() => caret.classList.add("is-typing"), [], t);
      rows.forEach((row, i) => {
        const line = lineOf(row);
        const width = lineWidth(CODE[i]);
        const duration = 0.03 + width * 0.0065;
        const ease = `steps(${Math.max(2, Math.round(width / 1.4))})`;
        tl.set(caret, { x: line.offsetLeft, y: caretY(row) }, t)
          .to(row.querySelector(".intro-ln"), { opacity: 1, duration: 0.15 }, t)
          .fromTo(
            line,
            { clipPath: "inset(0% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration, ease },
            t
          )
          .to(caret, { x: line.offsetLeft + line.offsetWidth, duration, ease }, t);
        t += duration + 0.025;
      });
      tl.call(() => caret.classList.remove("is-typing"), [], t);

      // Compile: a scan line sweeps down and the code dims behind it.
      const scanAt = t + 0.12;
      tl.to(caret, { autoAlpha: 0, duration: 0.1 }, scanAt)
        .fromTo(
          scan,
          { y: 0, autoAlpha: 1 },
          { y: code.offsetHeight, duration: 0.4, ease: "power1.inOut", immediateRender: false },
          scanAt
        )
        .to(rows, { opacity: 0.4, duration: 0.12, stagger: 0.4 / rows.length }, scanAt + 0.03);

      // Fold: the lines collapse onto the middle and become the seam.
      const foldAt = scanAt + 0.3;
      const middle = code.offsetHeight / 2;
      tl.to(
        rows,
        {
          y: (_: number, row: HTMLElement) => middle - (row.offsetTop + row.offsetHeight / 2),
          scaleY: 0.15,
          opacity: 0,
          duration: 0.35,
          ease: "power3.in",
          stagger: { each: 0.025, from: "edges" },
        },
        foldAt
      )
        .to(scan, { autoAlpha: 0, duration: 0.15 }, foldAt)
        .to(seam, { scaleX: 1, duration: 0.45, ease: "power3.inOut" }, foldAt + 0.12);

      // Open: the screen splits along the seam.
      const openAt = foldAt + 0.5;
      tl.call(release, [], openAt)
        .to(q(".intro-skip"), { autoAlpha: 0, duration: 0.2 }, openAt - 0.05)
        .to(q(".intro-top"), { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, openAt)
        .to(q(".intro-bottom"), { yPercent: 100, duration: 0.9, ease: "expo.inOut" }, openAt)
        .to(seam, { opacity: 0, duration: 0.25 }, openAt + 0.1)
        .call(finish);
      timeline.current = tl;
    },
    { scope: root }
  );

  // Skipping fast-forwards the same timeline so the page still opens cleanly.
  const skip = () => timeline.current?.timeScale(6);

  return (
    <div ref={root} className="intro">
      <div className="intro-panel intro-top" aria-hidden="true" />
      <div className="intro-panel intro-bottom" aria-hidden="true" />
      <div className="intro-code" aria-hidden="true">
        {CODE.map((line, i) => (
          <div className="intro-row" key={i}>
            <span className="intro-ln" />
            <span className="intro-line" style={{ marginLeft: `${line.indent * INDENT}em` }}>
              {line.tokens.map(([width, tone], j) => (
                <span key={j} className="intro-tok" data-tone={tone} style={{ width: `${width}em` }} />
              ))}
            </span>
          </div>
        ))}
        <span className="intro-caret" />
        <span className="intro-scan" />
      </div>
      <span className="intro-seam" aria-hidden="true" />
      <button type="button" className="intro-skip" onClick={skip} aria-label="Skip intro" title="Skip intro">
        <HiForward aria-hidden="true" />
      </button>
    </div>
  );
}
