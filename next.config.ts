import type { NextConfig } from "next";

// Where the site is allowed to load code and data from. Next.js inlines its
// own bootstrap scripts, hence 'unsafe-inline' for scripts and styles.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://*.tawk.to https://*.clarity.ms https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://*.tawk.to https://fonts.googleapis.com",
  // Article images come from many hosts (Hashnode CDN, Microsoft docs...).
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://*.tawk.to https://fonts.gstatic.com",
  [
    "connect-src 'self'",
    "https://*.tawk.to wss://*.tawk.to", // live chat
    "https://*.clarity.ms https://c.bing.com", // analytics, after consent
    "https://0.peerjs.com wss://0.peerjs.com", // WebRTC Hub signalling
    "https://*.partykit.dev wss://*.partykit.dev", // Live Poll server
    "https://vitals.vercel-insights.com",
  ].join(" "),
  // Lofi Space streams its tracks from Vercel Blob.
  "media-src 'self' blob: https://*.public.blob.vercel-storage.com",
  "frame-src https://*.tawk.to https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://codepen.io https://codesandbox.io",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const SECURITY_HEADERS = [
  // Browsers must not guess a file's type from its content.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // The site can't be shown inside another site's frame (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Other sites see where a visitor came from, never the full URL.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Camera and microphone only for this site's own tools (WebRTC Hub,
  // Speech to Text); everything else stays off.
  {
    key: "Permissions-Policy",
    value: "camera=(self), microphone=(self), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  // Report-only for now: violations show in the browser console without
  // blocking anything. Once production runs clean, rename the key to
  // "Content-Security-Policy" to enforce it.
  { key: "Content-Security-Policy-Report-Only", value: CONTENT_SECURITY_POLICY },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.hashnode.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
