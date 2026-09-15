import { JSX } from "react";

export type PostType = {
  slug: string;
  title: string;
  brief: string;
  coverImage: string | null;
  tags: string[];
  author: string;
  publishedAt: string;
  readTimeInMinutes: number;
  html: string;
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
  coverImage: string;
}
