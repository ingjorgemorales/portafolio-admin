import { AdminShell } from "@/components/admin-shell";
import { SkillForm } from "@/app/admin/skills/skill-form";
import { createSkillAction } from "@/app/admin/skills/actions";
import { requireAdmin } from "@/lib/auth";

export default async function NewSkillPage() {
  const admin = await requireAdmin();

  return (
    <AdminShell
      active="/admin/skills"
      title="Nueva tecnologia"
      userEmail={admin.email}
    >
      <SkillForm action={createSkillAction} submitLabel="Crear tecnologia" />
    </AdminShell>
  );
}
