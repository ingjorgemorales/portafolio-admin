import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { AchievementForm } from "@/app/admin/achievements/achievement-form";
import { updateAchievementAction } from "@/app/admin/achievements/actions";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type EditAchievementPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditAchievementPage({
  params,
}: EditAchievementPageProps) {
  const admin = await requireAdmin();
  const { id } = await params;
  const achievement = await prisma.achievement.findUnique({ where: { id } });

  if (!achievement) {
    notFound();
  }

  return (
    <AdminShell
      active="/admin/achievements"
      title="Editar logro"
      userEmail={admin.email}
    >
      <AchievementForm
        achievement={achievement}
        action={updateAchievementAction.bind(null, achievement.id)}
        submitLabel="Guardar cambios"
      />
    </AdminShell>
  );
}
