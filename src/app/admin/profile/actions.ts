"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { optionalText, requiredText } from "@/lib/admin-utils";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function updateProfileAction(formData: FormData) {
  await requireAdmin();

  const id = requiredText(formData, "id") || "main-profile";

  await prisma.profile.upsert({
    where: { id },
    update: {
      displayName: requiredText(formData, "displayName"),
      role: requiredText(formData, "role"),
      headline: requiredText(formData, "headline"),
      location: optionalText(formData, "location"),
      email: optionalText(formData, "email"),
      phone: optionalText(formData, "phone"),
      githubUrl: optionalText(formData, "githubUrl"),
      linkedinUrl: optionalText(formData, "linkedinUrl"),
    },
    create: {
      id,
      displayName: requiredText(formData, "displayName"),
      role: requiredText(formData, "role"),
      headline: requiredText(formData, "headline"),
      location: optionalText(formData, "location"),
      email: optionalText(formData, "email"),
      phone: optionalText(formData, "phone"),
      githubUrl: optionalText(formData, "githubUrl"),
      linkedinUrl: optionalText(formData, "linkedinUrl"),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/profile");
  redirect("/admin/profile?status=updated");
}
