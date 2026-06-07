"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  optionalText,
  parseBoolean,
  parseInteger,
  requiredText,
} from "@/lib/admin-utils";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function createResumeEntryAction(formData: FormData) {
  await requireAdmin();

  await prisma.resumeEntry.create({
    data: {
      section: requiredText(formData, "section"),
      title: requiredText(formData, "title"),
      subtitle: optionalText(formData, "subtitle"),
      period: optionalText(formData, "period"),
      description: optionalText(formData, "description"),
      sortOrder: parseInteger(formData, "sortOrder", 0),
      visible: parseBoolean(formData, "visible"),
    },
  });

  refreshResume();
  redirect("/admin/resume?status=created");
}

export async function updateResumeEntryAction(id: string, formData: FormData) {
  await requireAdmin();

  await prisma.resumeEntry.update({
    where: { id },
    data: {
      section: requiredText(formData, "section"),
      title: requiredText(formData, "title"),
      subtitle: optionalText(formData, "subtitle"),
      period: optionalText(formData, "period"),
      description: optionalText(formData, "description"),
      sortOrder: parseInteger(formData, "sortOrder", 0),
      visible: parseBoolean(formData, "visible"),
    },
  });

  refreshResume();
  redirect("/admin/resume?status=updated");
}

export async function deleteResumeEntryAction(id: string) {
  await requireAdmin();
  await prisma.resumeEntry.delete({ where: { id } });
  refreshResume();
  redirect("/admin/resume?status=deleted");
}

function refreshResume() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/resume");
}
