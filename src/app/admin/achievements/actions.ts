"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  optionalText,
  parseDate,
  parseState,
  requiredText,
} from "@/lib/admin-utils";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function createAchievementAction(formData: FormData) {
  await requireAdmin();

  await prisma.achievement.create({
    data: {
      title: requiredText(formData, "title"),
      description: requiredText(formData, "description"),
      category: optionalText(formData, "category"),
      achievedAt: parseDate(formData, "achievedAt"),
      state: parseState(formData),
    },
  });

  refreshAchievements();
  redirect("/admin/achievements?status=created");
}

export async function updateAchievementAction(id: string, formData: FormData) {
  await requireAdmin();

  await prisma.achievement.update({
    where: { id },
    data: {
      title: requiredText(formData, "title"),
      description: requiredText(formData, "description"),
      category: optionalText(formData, "category"),
      achievedAt: parseDate(formData, "achievedAt"),
      state: parseState(formData),
    },
  });

  refreshAchievements();
  redirect("/admin/achievements?status=updated");
}

export async function deleteAchievementAction(id: string) {
  await requireAdmin();
  await prisma.achievement.delete({ where: { id } });
  refreshAchievements();
  redirect("/admin/achievements?status=deleted");
}

function refreshAchievements() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/achievements");
}
