import { notFound } from "next/navigation";
import { achievements, profile, stackGroups } from "@/lib/content";
import { prisma } from "@/lib/db";

export async function getPublicProfile() {
  const storedProfile = await prisma.profile.findFirst();

  if (!storedProfile) {
    return profile;
  }

  return {
    name: storedProfile.displayName,
    role: storedProfile.role,
    headline: storedProfile.headline,
    location: storedProfile.location ?? "",
    email: storedProfile.email ?? profile.email,
    phone: storedProfile.phone ?? "",
    links: {
      github: storedProfile.githubUrl ?? profile.links.github,
      linkedin: storedProfile.linkedinUrl ?? profile.links.linkedin,
    },
  };
}

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { state: "PUBLISHED", featured: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProjectBySlug(slug: string) {
  const project = await prisma.project.findFirst({
    where: {
      slug,
      state: "PUBLISHED",
    },
  });

  if (!project) {
    notFound();
  }

  return project;
}

export async function getPublicAchievements() {
  const storedAchievements = await prisma.achievement.findMany({
    where: { state: "PUBLISHED" },
    orderBy: { createdAt: "asc" },
  });

  if (storedAchievements.length === 0) {
    return achievements;
  }

  return storedAchievements.map((item) => ({
    title: item.title,
    detail: item.description,
  }));
}

export async function getPublicStackGroups() {
  const storedSkills = await prisma.skill.findMany({
    where: { state: "PUBLISHED" },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  });

  if (storedSkills.length === 0) {
    return stackGroups;
  }

  const groups = new Map<string, string[]>();

  for (const skill of storedSkills) {
    const current = groups.get(skill.category) ?? [];
    current.push(skill.name);
    groups.set(skill.category, current);
  }

  return Array.from(groups.entries()).map(([title, items]) => ({
    title,
    items,
  }));
}

export async function getPublicResume() {
  const entries = await prisma.resumeEntry.findMany({
    where: { visible: true },
    orderBy: [{ section: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
  });

  const bySection = (section: string) =>
    entries.filter((entry) => entry.section === section);

  return {
    summary:
      bySection("summary")[0]?.description ??
      "Ingeniero de sistemas con experiencia practica en el desarrollo de soluciones tecnologicas.",
    education: bySection("education"),
    experience: bySection("experience"),
    courses: bySection("courses"),
    competencies: bySection("competencies"),
    languages: bySection("languages"),
  };
}
