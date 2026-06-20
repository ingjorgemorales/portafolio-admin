"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  optionalText,
  parseBoolean,
  parseStack,
  parseState,
  requiredText,
  slugify,
} from "@/lib/admin-utils";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { saveProjectImage } from "@/lib/uploads";

export async function createProjectAction(formData: FormData) {
  await requireAdmin();

  const title = requiredText(formData, "title");
  const slug = await getUniqueSlug(requiredText(formData, "slug") || title);
  let imageUrl: string | null;

  try {
    imageUrl = await saveProjectImage(formData);
  } catch {
    redirect("/admin/projects/new?status=upload-error");
  }

  await prisma.project.create({
    data: {
      title,
      slug,
      sector: optionalText(formData, "sector"),
      summary: requiredText(formData, "summary"),
      problem: optionalText(formData, "problem"),
      solution: optionalText(formData, "solution"),
      impact: optionalText(formData, "impact"),
      stack: parseStack(formData),
      imageUrl,
      repoUrl: optionalText(formData, "repoUrl"),
      liveUrl: optionalText(formData, "liveUrl"),
      featured: parseBoolean(formData, "featured"),
      state: parseState(formData),
    },
  });

  refreshProjects();
  redirect("/admin/projects?status=created");
}

export async function updateProjectAction(id: string, formData: FormData) {
  await requireAdmin();

  const title = requiredText(formData, "title");
  const slug = await getUniqueSlug(requiredText(formData, "slug") || title, id);
  let imageUrl: string | null;

  try {
    imageUrl = await saveProjectImage(formData);
  } catch {
    redirect(`/admin/projects/${id}/edit?status=upload-error`);
  }

  await prisma.project.update({
    where: { id },
    data: {
      title,
      slug,
      sector: optionalText(formData, "sector"),
      summary: requiredText(formData, "summary"),
      problem: optionalText(formData, "problem"),
      solution: optionalText(formData, "solution"),
      impact: optionalText(formData, "impact"),
      stack: parseStack(formData),
      imageUrl,
      repoUrl: optionalText(formData, "repoUrl"),
      liveUrl: optionalText(formData, "liveUrl"),
      featured: parseBoolean(formData, "featured"),
      state: parseState(formData),
    },
  });

  refreshProjects();
  redirect("/admin/projects?status=updated");
}

export async function deleteProjectAction(id: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  refreshProjects();
  redirect("/admin/projects?status=deleted");
}

async function getUniqueSlug(value: string, currentId?: string) {
  const base = slugify(value) || "proyecto";
  let candidate = base;
  let index = 2;

  while (true) {
    const existing = await prisma.project.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing || existing.id === currentId) {
      return candidate;
    }

    candidate = `${base}-${index}`;
    index += 1;
  }
}

function refreshProjects() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
}
