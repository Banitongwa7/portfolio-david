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
  const [downloadProgress, setDownloadProgress] = useState(0);

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
    setDownloadProgress(0);
  };

  const handleDownload = async () => {
    if (!submittedName) return;
    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      const res = await fetch("/api/render-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: submittedName }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Render failed");
      }

      // Get the blob from response
      const blob = await res.blob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${submittedName.replace(/\s+/g, "_")}_intro.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadProgress(100);
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "Download failed");
    } finally {
      setIsDownloading(false);
      setTimeout(() => setDownloadProgress(0), 2000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight animate-fade-in">
            Fun Video Generator
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
            Generate a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">cinematic intro video</span> with your name in seconds.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Powered by Remotion</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* ---- FORM ---- */}
          <div className="group relative">
            {/* Glassmorphism Card */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Enter Your Name</h2>
                <p className="text-gray-400">{"We'll create something special for you ✨"}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-mono text-cyan-400 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                    &lt;Full Name /&gt;
                  </label>
                  <div className="relative">
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Ada Lovelace"
                      className="w-full px-5 py-4 bg-slate-800/50 border border-purple-500/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-lg text-white placeholder-gray-500 hover:border-purple-500/50"
                      required
                      disabled={isGenerating}
                    />
                    {fullName && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={!fullName.trim() || isGenerating}
                    className="group/btn flex-1 relative bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isGenerating ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Compiling…
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Generate Preview
                        </>
                      )}
                    </span>
                  </button>

                  {(submittedName || isGenerating) && (
                    <button
                      type="button"
                      onClick={handleReset}
                      disabled={isGenerating}
                      className="px-6 bg-slate-800/50 text-gray-300 py-4 rounded-xl font-semibold hover:bg-slate-700/50 disabled:opacity-50 transition-all duration-200 border border-white/10 hover:border-white/20"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  )}
                </div>
              </form>

              {/* Feature Highlights */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl">🎬</div>
                    <div className="text-xs text-gray-400">HD Quality</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl">⚡</div>
                    <div className="text-xs text-gray-400">Fast Render</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl">✨</div>
                    <div className="text-xs text-gray-400">Animated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Video Output</h2>
                {submittedName && (
                  <span className="relative flex items-center gap-2 bg-purple-500/20 text-purple-300 text-sm font-mono px-3 py-1.5 rounded-full border border-purple-500/50 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
                    </span>
                    Ready
                  </span>
                )}
              </div>

              {submittedName ? (
                <div className="space-y-4">
                  <div className="relative group/preview">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-sm opacity-50 group-hover/preview:opacity-75 transition duration-300"></div>
                    <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
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
                  </div>

                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="group/download w-full relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                  >
                    {isDownloading && (
                      <div
                        className="absolute inset-0 bg-white/20 transition-all duration-300"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isDownloading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Rendering MP4…
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6 group-hover/download:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download Full-Res MP4
                        </>
                      )}
                    </span>
                  </button>

                  {/* Video Info */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-1">Resolution</div>
                      <div className="text-sm font-semibold text-purple-300">1920×1080</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-1">Duration</div>
                      <div className="text-sm font-semibold text-purple-300">8 seconds</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-1">FPS</div>
                      <div className="text-sm font-semibold text-purple-300">30</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border-2 border-dashed border-purple-500/30 flex items-center justify-center p-8 backdrop-blur-sm">
                  <div className="text-center space-y-4">
                    <div className="relative w-20 h-20 mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl animate-spin" style={{ animationDuration: "3s" }}></div>
                      <div className="absolute inset-1 bg-slate-900 rounded-xl flex items-center justify-center">
                        <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Awaiting Input</h3>
                      <p className="text-gray-400 text-sm">Enter a name to generate your personalized video</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
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