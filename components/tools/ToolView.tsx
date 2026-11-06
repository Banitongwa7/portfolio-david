"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// One code-split chunk per tool: a tool page downloads only its own tool,
// and pages that just list tools download none of them.
const Loading = () => (
  <p role="status" style={{ padding: "48px 0", textAlign: "center", color: "var(--muted)" }}>
    Loading the tool…
  </p>
);

const TOOLS: Record<string, ComponentType> = {
  "/tools/color-generator": dynamic(() => import("./ColorGenerator"), { loading: Loading }),
  "/tools/lofi-space": dynamic(() => import("./LofiSpace"), { loading: Loading }),
  "/tools/qr-code-generator": dynamic(() => import("./QRCodeGenerator"), { loading: Loading }),
  // Browser only: the notes and their positions come from localStorage and
  // the window size.
  "/tools/sticky-notes": dynamic(() => import("./StickyNotes"), { loading: Loading, ssr: false }),
  "/tools/image-compressor": dynamic(() => import("./ImageCompressor"), { loading: Loading }),
  "/tools/text-analyzer": dynamic(() => import("./TextAnalyzer"), { loading: Loading }),
  "/tools/password-generator": dynamic(() => import("./PasswordGenerator"), { loading: Loading }),
  "/tools/text-to-speech": dynamic(() => import("./TextToSpeech"), { loading: Loading }),
  "/tools/speech-to-text": dynamic(() => import("./SpeechToText"), { loading: Loading }),
  "/tools/webRTC-data-transfert": dynamic(() => import("./WebrtcDataTransfert"), { loading: Loading }),
  "/tools/live-poll": dynamic(() => import("./LivePoll"), { loading: Loading }),
};

export default function ToolView({ slug }: { slug: string }) {
  const Tool = TOOLS[slug];
  return Tool ? <Tool /> : null;
}
