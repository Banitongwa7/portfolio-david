export type Post = {
  node: {
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

export type Tag = {
  name: string;
};
