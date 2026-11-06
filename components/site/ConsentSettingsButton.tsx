"use client";

import Clarity from "@microsoft/clarity";
import { useConsent, writeConsent } from "./consent";

// Footer link that brings the cookie banner back. Withdrawing consent reloads
// the page, since Clarity and the chat can't be unloaded once running.
export default function ConsentSettingsButton() {
  const consent = useConsent();

  const reopen = () => {
    writeConsent(null);
    if (consent === "granted") {
      try {
        Clarity.consent(false);
      } catch {
        // Clarity never started (no project ID).
      }
      window.location.reload();
    }
  };

  return (
    <button type="button" onClick={reopen}>
      Cookie settings
    </button>
  );
}
