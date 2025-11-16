"use client";

import React, { useState, useMemo } from "react";
import { Player } from "@remotion/player";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Sequence,
} from "remotion";

interface Props {
  name: string;
}

const MyVideo: React.FC<Props> = ({ name }) => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  /* -------------------------- TIMINGS (frames) -------------------------- */
  const NAME_IN = 40;
  const TYPEWRITER_START = 55;
  const TYPEWRITER_END = 85;
  const CODE_LINES_IN = 90;
  const CONFETTI = durationInFrames - 45;
  const OUT = durationInFrames - 30;

  /* --------------------------- SPRINGS --------------------------- */
  const titleSpring = spring({ frame, fps, from: 0, to: 1, durationInFrames: 30, config: { damping: 12 } });
  const nameSpring = spring({ frame: frame - NAME_IN, fps, from: 0, to: 1, durationInFrames: 35, config: { damping: 10, stiffness: 120 } });
  const exitSpring = spring({ frame: frame - OUT, fps, from: 0, to: 1, durationInFrames: 30, config: { damping: 20 } });

  /* -------------------------- TYPEWRITER -------------------------- */
  const visibleChars = Math.floor(
    interpolate(frame, [TYPEWRITER_START, TYPEWRITER_END], [0, name.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const displayedName = name.slice(0, visibleChars);

  /* -------------------------- GLITCH -------------------------- */
  const glitchOpacity = interpolate(frame, [NAME_IN + 10, NAME_IN + 20, NAME_IN + 30], [0, 1, 0], {
    extrapolateRight: "clamp",
  });
  const glitchX = Math.random() * 20 - 10;
  const glitchY = Math.random() * 10 - 5;

  /* -------------------------- MESH GRADIENT -------------------------- */
  const hue1 = interpolate(frame, [0, durationInFrames], [220, 280], { easing: Easing.inOut(Easing.quad) });
  const hue2 = hue1 + 60;
  const bg = `radial-gradient(circle at 30% 30%, hsl(${hue1}, 90%, 15%), hsl(${hue2}, 90%, 10%))`;

  /* -------------------------- PARTICLES -------------------------- */
  const particles = Array.from({ length: 30 }).map((_, i) => {
    const delay = i * 3;
    const opacity = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 60, config: { damping: 30 } });
    const x = interpolate(Math.random(), [0, 1], [-width * 0.2, width * 1.2]);
    const y = interpolate(Math.random(), [0, 1], [-height * 0.2, height * 1.2]);
    const size = interpolate(Math.random(), [0, 1], [2, 8]);
    return { opacity, x, y, size };
  });

  return (
    <AbsoluteFill
      style={{
        background: bg,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontWeight: "700",
      }}
    >
      {/* ----- PARTICLE FIELD ----- */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            background: "rgba(0,255,255,0.6)",
            borderRadius: "50%",
            left: p.x,
            top: p.y,
            opacity: p.opacity,
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* ----- 3-D RING ----- */}
      <div
        style={{
          position: "absolute",
          width: width * 0.7,
          height: width * 0.7,
          borderRadius: "50%",
          border: "6px solid rgba(0,255,255,0.25)",
          boxShadow: "0 0 80px rgba(0,255,255,0.4), inset 0 0 40px rgba(0,255,255,0.2)",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) rotate(${frame * 0.8}deg) scale(${0.9 + titleSpring * 0.1})`,
          opacity: titleSpring,
        }}
      />

      {/* ----- TITLE ----- */}
      <Sequence from={0}>
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: `translateX(-50%) scale(${titleSpring})`,
            opacity: titleSpring,
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "#00ffff",
            textShadow: "0 0 20px rgba(0,255,255,0.8)",
            letterSpacing: "-0.03em",
          }}
        >
          Welcome
        </div>
      </Sequence>

      {/* ----- NAME (typewriter + glitch) ----- */}
      <Sequence from={NAME_IN}>
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: `translateX(-50%) scale(${nameSpring})`,
            opacity: nameSpring,
            fontSize: "clamp(4rem, 12vw, 9rem)",
            background: "linear-gradient(45deg, #ff00ff, #00ffff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 30px rgba(255,0,255,0.6)",
            whiteSpace: "nowrap",
          }}
        >
          {displayedName}
          {/* blinking cursor */}
          {frame % 20 < 10 && visibleChars < name.length && (
            <span style={{ color: "#fff" }}>|</span>
          )}
        </div>

        {/* glitch overlay */}
        {glitchOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: `translateX(-50%) translate(${glitchX}px, ${glitchY}px) scale(${nameSpring})`,
              opacity: glitchOpacity,
              fontSize: "clamp(4rem, 12vw, 9rem)",
              color: "#ff00ff",
              filter: "blur(1px)",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </div>
        )}
      </Sequence>

      {/* ----- CODE LINES ----- */}
      <Sequence from={CODE_LINES_IN}>
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: interpolate(frame, [CODE_LINES_IN, CODE_LINES_IN + 20], [0, 1]),
            fontSize: "1.8rem",
            color: "#ffff00",
            background: "rgba(0,0,0,0.4)",
            padding: "12px 32px",
            borderRadius: "12px",
            border: "1px solid rgba(0,255,255,0.4)",
            boxShadow: "0 0 20px rgba(0,255,255,0.3)",
          }}
        >
          <div style={{ fontFamily: "monospace" }}>Developer Profile Initialized</div>
          <div style={{ fontFamily: "monospace", marginTop: 8, color: "#00ffff" }}>
            &gt; status: ready
          </div>
        </div>
      </Sequence>

      {/* ----- CONFETTI ----- */}
      <Sequence from={CONFETTI}>
        {Array.from({ length: 40 }).map((_, i) => {
          const delay = i * 1.5;
          const progress = spring({ frame: frame - CONFETTI - delay, fps, from: 0, to: 1, durationInFrames: 60 });
          const angle = Math.random() * 360;
          const dist = interpolate(progress, [0, 1], [0, height * 1.5]);
          const rot = interpolate(progress, [0, 1], [0, 720]);
          const hue = (i * 10) % 360;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 12,
                height: 12,
                background: `hsl(${hue},100%,60%)`,
                borderRadius: i % 2 ? "50%" : "0",
                left: width / 2 + Math.cos((angle * Math.PI) / 180) * dist * 0.3,
                top: height / 2 + Math.sin((angle * Math.PI) / 180) * dist,
                transform: `rotate(${rot}deg)`,
                opacity: 1 - progress,
              }}
            />
          );
        })}
      </Sequence>

      {/* ----- EXIT FADE ----- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(0,0,0,${exitSpring})`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

/* -------------------------------------------------------------------------- */
/*                               NEXT.JS PAGE                                 */
/* -------------------------------------------------------------------------- */

export default function FunVideo() {
  const [fullName, setFullName] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const composition = useMemo(
    () => ({
      id: "MyVideo",
      component: MyVideo,
      durationInFrames: 240, // 8s @ 30fps
      fps: 30,
      width: 1920,
      height: 1080,
    }),
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    setIsGenerating(true);
    setSubmittedName("");
    setTimeout(() => {
      setSubmittedName(fullName.trim());
      setIsGenerating(false);
    }, 800);
  };

  const handleReset = () => {
    setFullName("");
    setSubmittedName("");
    setIsGenerating(false);
  };

  const handleDownload = async () => {
    if (!submittedName) return;
    setIsDownloading(true);
    try {
      const res = await fetch("/api/render-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: submittedName }),
      });
      const data = await res.json();
      if (data.url) {
        const a = document.createElement("a");
        a.href = data.url;
        a.download = `${submittedName.replace(/\s+/g, "_")}_intro.mp4`;
        a.click();
      } else {
        alert(data.error ?? "Render failed");
      }
    } catch (e) {
      console.error(e);
      alert("Download failed");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4 tracking-tighter">
            Fun Video Generator
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Generate a cinematic intro video with your name in seconds.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ---- FORM ---- */}
          <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700">
            <h2 className="text-3xl font-bold mb-2">Enter Your Name</h2>
            <p className="text-gray-400 mb-6">{"We'll put you in the spotlight."}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-mono text-cyan-400 mb-2">
                  &lt;Full Name /&gt;
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g., Ada Lovelace"
                  className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-lg text-white font-mono placeholder-gray-500"
                  required
                  disabled={isGenerating}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={!fullName.trim() || isGenerating}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 transition-all duration-300 shadow-xl shadow-cyan-900/50"
                >
                  {isGenerating ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Compiling…
                    </span>
                  ) : (
                    "Generate Preview"
                  )}
                </button>

                {(submittedName || isGenerating) && (
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={isGenerating}
                    className="px-6 bg-gray-700 text-gray-300 py-4 rounded-xl font-semibold hover:bg-gray-600 disabled:opacity-50"
                  >
                    Reset
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="bg-gray-800 rounded-3xl shadow-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold">Video Output</h2>
              {submittedName && (
                <span className="bg-purple-900 text-purple-300 text-sm font-mono px-3 py-1 rounded-full border border-purple-700">
                  <span className="w-2 h-2 bg-purple-400 rounded-full inline-block mr-1 animate-pulse" />
                  Playback Ready
                </span>
              )}
            </div>

            {submittedName ? (
              <>
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl mb-6 ring-4 ring-purple-500/30">
                  <Player
                    component={MyVideo}
                    inputProps={{ name: submittedName }}
                    durationInFrames={composition.durationInFrames}
                    compositionWidth={composition.width}
                    compositionHeight={composition.height}
                    fps={composition.fps}
                    controls
                    autoPlay
                    loop
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>

                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-600 hover:to-lime-600 disabled:opacity-50 transition-all duration-300 shadow-xl shadow-green-900/50"
                >
                  {isDownloading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Rendering MP4…
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Full-Res MP4
                    </span>
                  )}
                </button>
              </>
            ) : (
              <div className="aspect-video bg-gray-700/50 rounded-xl border-4 border-dashed border-gray-600 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Awaiting Input…</h3>
                  <p className="text-gray-400">Enter a name to see the preview.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blinking cursor animation */}
      <style jsx global>{`
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
        span[style*="|"] {
          animation: blink 0.7s step-end infinite;
        }
      `}</style>
    </div>
  );
}