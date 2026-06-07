import { AdminShell } from "@/components/admin-shell";
import { AchievementForm } from "@/app/admin/achievements/achievement-form";
import { createAchievementAction } from "@/app/admin/achievements/actions";
import { requireAdmin } from "@/lib/auth";

export default async function NewAchievementPage() {
  const admin = await requireAdmin();

  return (
    <AdminShell
      active="/admin/achievements"
      title="Nuevo logro"
      userEmail={admin.email}
    >
      <AchievementForm
        action={createAchievementAction}
        submitLabel="Crear logro"
      />
    </AdminShell>
  );
}
