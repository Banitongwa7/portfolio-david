import { describe, expect, it } from "vitest";
import { langOf, topicOf } from "@/utils/blogMeta";

describe("topicOf", () => {
  it("files posts by their first tag or title", () => {
    expect(topicOf({ tags: ["AI"], title: "Prompting tips" })).toBe("ai");
    expect(topicOf({ tags: [], title: "Automating approvals with Power Automate" })).toBe("microsoft");
    expect(topicOf({ tags: ["git"], title: "Rewriting history" })).toBe("dev");
  });

  it("falls back to tools", () => {
    expect(topicOf({ tags: [], title: "The best note-taking apps" })).toBe("tools");
  });
});

describe("langOf", () => {
  it("spots French titles", () => {
    expect(langOf({ title: "Les meilleurs outils pour organiser vos réunions" })).toBe("fr");
  });

  it("defaults to English", () => {
    expect(langOf({ title: "How I set up my dev machine" })).toBe("en");
  });
});
