import { JSX } from "react";

export type PostType = {
  node: {
    id: string;
    title: string;
    readTimeInMinutes: number;
    tags: { name: string }[];
    brief: string;
    slug: string;
    coverImage: { url: string };
    author: { profilePicture: string; name: string };
    views: number;
    reactionCount: number;
  };
};

export type TagType = {
  name: string;
};

export type ToolType = {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  slug: string;
  developer: string;
  publishedAt: string;
  component: JSX.Element;
}
