// Groups the tools by what people use them for, keyed by tool slug.
export const TOOL_CATEGORIES = {
  create: "Create",
  words: "Words and voice",
  share: "Share and secure",
  focus: "Focus and live",
} as const;

export type ToolCategory = keyof typeof TOOL_CATEGORIES;

export const TOOL_CATEGORY: Record<string, ToolCategory> = {
  "/tools/color-generator": "create",
  "/tools/qr-code-generator": "create",
  "/tools/image-compressor": "create",
  "/tools/text-analyzer": "words",
  "/tools/text-to-speech": "words",
  "/tools/speech-to-text": "words",
  "/tools/sticky-notes": "words",
  "/tools/password-generator": "share",
  "/tools/webRTC-data-transfert": "share",
  "/tools/lofi-space": "focus",
  "/tools/live-poll": "focus",
};

export const categoryOf = (slug: string): ToolCategory => TOOL_CATEGORY[slug] ?? "create";
