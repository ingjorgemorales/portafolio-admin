import { prisma } from "@/lib/db";
import {
  profile as fallbackProfile,
  achievements as fallbackAchievements,
  stackGroups as fallbackStack,
} from "@/lib/content";

export interface KnowledgeChunk {
  title: string;
  category: string;
  content: string;
}

function joinSentences(parts: Array<string | null | undefined>) {
  return parts
    .filter((part): part is string => Boolean(part?.trim()))
    .map((part) => {
      const trimmed = part.trim();
      return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
    })
    .join(" ");
}

export async function getKnowledgeBase(): Promise<KnowledgeChunk[]> {
  const chunks: KnowledgeChunk[] = [];

  // --- Profile ---
  const stored = await prisma.profile.findFirst();
  const p = stored
    ? {
        name: stored.displayName,
        role: stored.role,
        headline: stored.headline,
        location: stored.location ?? "",
        email: stored.email ?? "",
        phone: stored.phone ?? "",
        github: stored.githubUrl ?? "",
        linkedin: stored.linkedinUrl ?? "",
      }
    : {
        name: fallbackProfile.name,
        role: fallbackProfile.role,
        headline: fallbackProfile.headline,
        location: fallbackProfile.location,
        email: fallbackProfile.email,
        phone: fallbackProfile.phone,
        github: fallbackProfile.links.github,
        linkedin: fallbackProfile.links.linkedin,
      };

  chunks.push({
    title: "Presentacion personal",
    category: "perfil",
    content: `${p.name} es ${p.role}. ${p.headline}`,
  });

  if (p.location) {
    chunks.push({
      title: "Ubicacion",
      category: "perfil",
      content: `Vive en ${p.location}.`,
    });
  }

  if (p.email || p.phone) {
    const parts: string[] = ["Puedes contactarlo"];
    if (p.email) parts.push(`por correo a ${p.email}`);
    if (p.email && p.phone) parts.push("o");
    if (p.phone) parts.push(`por telefono al ${p.phone}`);
    parts.push(".");
    chunks.push({
      title: "Contacto",
      category: "perfil",
      content: parts.join(" "),
    });
  }

  if (p.github || p.linkedin) {
    const parts: string[] = ["Sus enlaces:"];
    if (p.github) parts.push(`GitHub: ${p.github}`);
    if (p.github && p.linkedin) parts.push("y");
    if (p.linkedin) parts.push(`LinkedIn: ${p.linkedin}`);
    parts.push(".");
    chunks.push({
      title: "Enlaces externos",
      category: "perfil",
      content: parts.join(" "),
    });
  }

  // --- Projects ---
  const projects = await prisma.project.findMany({
    where: { state: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  for (const project of projects) {
    const parts: Array<string | null | undefined> = [
      `Proyecto: ${project.title}.`,
      project.summary,
    ];
    if (project.problem) parts.push(`Problema: ${project.problem}`);
    if (project.solution) parts.push(`Solucion: ${project.solution}`);
    if (project.impact) parts.push(`Impacto: ${project.impact}`);
    if (project.sector) parts.push(`Sector: ${project.sector}`);
    if (project.stack.length > 0)
      parts.push(`Stack tecnologico: ${project.stack.join(", ")}`);

    chunks.push({
      title: project.title,
      category: "proyectos",
      content: joinSentences(parts),
    });
  }

  // --- Achievements ---
  const storedAchievements = await prisma.achievement.findMany({
    where: { state: "PUBLISHED" },
    orderBy: { createdAt: "asc" },
  });

  const achievements =
    storedAchievements.length > 0
      ? storedAchievements.map((a) => ({
          title: a.title,
          description: a.description,
        }))
      : fallbackAchievements.map((a) => ({
          title: a.title,
          description: a.detail,
        }));

  for (const a of achievements) {
    chunks.push({
      title: `Logro: ${a.title}`,
      category: "logros",
      content: a.description
        ? `${a.title}. ${a.description}`
        : a.title,
    });
  }

  // --- Skills ---
  const storedSkills = await prisma.skill.findMany({
    where: { state: "PUBLISHED" },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  });

  const groups = new Map<string, string[]>();
  if (storedSkills.length > 0) {
    for (const skill of storedSkills) {
      const current = groups.get(skill.category) ?? [];
      current.push(skill.name);
      groups.set(skill.category, current);
    }
  } else {
    for (const g of fallbackStack) {
      groups.set(g.title, g.items);
    }
  }

  for (const [category, items] of groups) {
    chunks.push({
      title: `Stack: ${category}`,
      category: "stack",
      content: `En la categoria ${category} maneja: ${items.join(", ")}.`,
    });
  }

  // --- Resume ---
  const entries = await prisma.resumeEntry.findMany({
    where: { visible: true },
    orderBy: [
      { section: "asc" },
      { sortOrder: "asc" },
      { createdAt: "asc" },
    ],
  });

  const bySection = (section: string) =>
    entries.filter((e) => e.section === section);

  const summary = bySection("summary")[0];
  if (summary?.description) {
    chunks.push({
      title: "Resumen profesional",
      category: "resumen",
      content: summary.description,
    });
  }

  const experience = bySection("experience");
  if (experience.length > 0) {
    const content = experience
      .map(
        (e) =>
          `${e.title}${e.subtitle ? " en " + e.subtitle : ""}${e.period ? " (" + e.period + ")" : ""}${e.description ? ". " + e.description : ""}`
      )
      .join(" ");
    chunks.push({
      title: "Experiencia laboral",
      category: "experiencia",
      content,
    });
  } else if (projects.length > 0) {
    const projectNames = projects
      .slice(0, 5)
      .map((project) => project.title)
      .join(", ");

    chunks.push({
      title: "Experiencia practica documentada",
      category: "experiencia",
      content:
        `No hay cargos laborales formales registrados en el portafolio. ` +
        `La experiencia disponible se evidencia mediante proyectos publicados como ${projectNames}. ` +
        `Si preguntan por el ultimo trabajo, responde que no hay un ultimo cargo laboral cargado y ofrece hablar del proyecto publicado mas reciente sin presentarlo como empleo.`,
    });
  }

  const education = bySection("education");
  if (education.length > 0) {
    const content = education
      .map(
        (e) =>
          `${e.title}${e.subtitle ? " - " + e.subtitle : ""}${e.period ? " (" + e.period + ")" : ""}${e.description ? ". " + e.description : ""}`
      )
      .join(" ");
    chunks.push({
      title: "Educacion",
      category: "educacion",
      content,
    });
  }

  const courses = bySection("courses");
  if (courses.length > 0) {
    const content = courses
      .map(
        (e) =>
          `${e.title}${e.subtitle ? " - " + e.subtitle : ""}${e.description ? ". " + e.description : ""}`
      )
      .join(" ");
    chunks.push({
      title: "Cursos",
      category: "cursos",
      content,
    });
  }

  const competencies = bySection("competencies");
  if (competencies.length > 0) {
    const content = competencies
      .map(
        (e) =>
          `${e.title}${e.description ? ": " + e.description : ""}`
      )
      .join(". ");
    chunks.push({
      title: "Competencias",
      category: "competencias",
      content,
    });
  }

  const languages = bySection("languages");
  if (languages.length > 0) {
    const content = languages
      .map(
        (e) =>
          `${e.title}${e.description ? ": " + e.description : ""}`
      )
      .join(". ");
    chunks.push({
      title: "Idiomas",
      category: "idiomas",
      content,
    });
  }

  return chunks;
}
