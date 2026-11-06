import type { PostType } from "@/types/types";

export type Topic = "tools" | "microsoft" | "dev" | "ai";
export type Lang = "fr" | "en";

export const TOPICS: Record<Topic, string> = {
  tools: "Tools",
  microsoft: "Microsoft",
  dev: "Dev",
  ai: "AI",
};

// Checked in order against the first tag and the title.
const TOPIC_RULES: [Topic, RegExp][] = [
  ["ai", /\b(artificial intelligence|ai|ia|machine learning|chatgpt|openai)\b/i],
  ["microsoft", /\b(microsoft|power ?bi|power ?apps|power ?automate|power platform|copilot|dataverse|azure)\b/i],
  ["dev", /\b(git|github|jujutsu|latex|vs ?code|javascript|typescript|chocolatey|scoop|winget|programming|developer)\b/i],
];

export function topicOf(post: Pick<PostType, "tags" | "title">): Topic {
  const haystack = `${post.tags[0] ?? ""} ${post.title}`;
  for (const [topic, rule] of TOPIC_RULES) {
    if (rule.test(haystack)) return topic;
  }
  return "tools";
}

// The feed has no language field; French titles give themselves away.
export function langOf(post: Pick<PostType, "title">): Lang {
  return /[àâçéèêëîïôûùüœ]|\b(les|des|pour|sur|une|vos|et|du|ou|quel|lequel|aperçu|apercu)\b/i.test(post.title)
    ? "fr"
    : "en";
}

export const LANGS: Record<Lang, string> = { fr: "Français", en: "English" };
