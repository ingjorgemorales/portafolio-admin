"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  parseInteger,
  parseState,
  requiredText,
} from "@/lib/admin-utils";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function createSkillAction(formData: FormData) {
  await requireAdmin();

  await prisma.skill.create({
    data: {
      name: requiredText(formData, "name"),
      category: requiredText(formData, "category"),
      level: clampLevel(parseInteger(formData, "level", 3)),
      sortOrder: parseInteger(formData, "sortOrder", 0),
      state: parseState(formData),
    },
  });

  refreshSkills();
  redirect("/admin/skills?status=created");
}

export async function updateSkillAction(id: string, formData: FormData) {
  await requireAdmin();

  await prisma.skill.update({
    where: { id },
    data: {
      name: requiredText(formData, "name"),
      category: requiredText(formData, "category"),
      level: clampLevel(parseInteger(formData, "level", 3)),
      sortOrder: parseInteger(formData, "sortOrder", 0),
      state: parseState(formData),
    },
  });

  refreshSkills();
  redirect("/admin/skills?status=updated");
}

export async function deleteSkillAction(id: string) {
  await requireAdmin();
  await prisma.skill.delete({ where: { id } });
  refreshSkills();
  redirect("/admin/skills?status=deleted");
}

function clampLevel(value: number) {
  return Math.min(5, Math.max(1, value));
}

function refreshSkills() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/skills");
}
