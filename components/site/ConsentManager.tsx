"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";
import { useConsent, writeConsent } from "./consent";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const TAWK_SRC = "https://embed.tawk.to/680b9cb34b378d190bfa0fa3/1ipmlo7jl";

// Both services can only be started once per page load.
let started = false;

type TawkWindow = Window & { Tawk_API?: { onLoad?: () => void; minimize?: () => void }; Tawk_LoadStart?: Date };

function loadTawk() {
  const w = window as TawkWindow;
  w.Tawk_API = w.Tawk_API || {};
  w.Tawk_LoadStart = new Date();
  w.Tawk_API.onLoad = () => w.Tawk_API?.minimize?.();
  const script = document.createElement("script");
  script.async = true;
  script.src = TAWK_SRC;
  script.charset = "UTF-8";
  script.setAttribute("crossorigin", "*");
  document.body.appendChild(script);
}

// Starts Clarity and the chat once the visitor has accepted them.
function ThirdParty() {
  useEffect(() => {
    if (started) return;
    started = true;

    // Without a project ID (local, previews) Clarity simply doesn't start.
    if (CLARITY_ID) {
      Clarity.init(CLARITY_ID);
      Clarity.consent(true);
    }

    // The chat bubble would cover the first-visit intro, so it waits for it.
    if (document.documentElement.dataset.intro === "playing") {
      window.addEventListener("intro:done", loadTawk, { once: true });
    } else {
      loadTawk();
    }
  }, []);

  return null;
}

export default function ConsentManager() {
  const consent = useConsent();

  if (consent === "granted") return <ThirdParty />;
  if (consent !== null) return null; // Declined, or still on the server.

  return (
    <section className="consent" aria-labelledby="consent-title">
      <h2 id="consent-title">Analytics and chat</h2>
      <p>
        With your permission, Microsoft Clarity records how pages are used and Tawk.to runs the live chat. Both use
        cookies. You can change your mind at any time from the footer.
      </p>
      <div className="consent-actions">
        <button type="button" className="btn btn-glass btn-sm" onClick={() => writeConsent("denied")}>
          Decline
        </button>
        <button type="button" className="btn btn-glass btn-sm" onClick={() => writeConsent("granted")}>
          Accept
        </button>
      </div>
    </section>
  );
}
