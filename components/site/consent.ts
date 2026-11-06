"use client";

import { useSyncExternalStore } from "react";

// The visitor's choice about analytics (Microsoft Clarity) and the live chat
// (Tawk.to), both of which set cookies. Kept in localStorage; changing it
// notifies every component using it, in this tab and in others.
export type Consent = "granted" | "denied";

const STORAGE_KEY = "consent-v1";
const CHANGE_EVENT = "consent:change";

function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    // Storage blocked: ask again on each visit, load nothing meanwhile.
    return null;
  }
}

export function writeConsent(value: Consent | null) {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, value);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // The choice then only lasts for this page view.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// `undefined` while rendering on the server, where the choice is unknown;
// `null` in the browser until the visitor has answered.
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, readConsent, () => undefined);
}
