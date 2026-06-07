export type PublishState = "draft" | "published" | "hidden";

export type Project = {
  id: string;
  title: string;
  slug: string;
  sector: string | null;
  summary: string;
  problem: string | null;
  solution: string | null;
  impact: string | null;
  stack: string[];
  image_url: string | null;
  state: PublishState;
  featured: boolean;
  created_at: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  category: string | null;
  achieved_at: string | null;
  state: PublishState;
};
