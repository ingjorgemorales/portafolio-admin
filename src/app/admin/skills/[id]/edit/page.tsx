import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { SkillForm } from "@/app/admin/skills/skill-form";
import { updateSkillAction } from "@/app/admin/skills/actions";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type EditSkillPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditSkillPage({ params }: EditSkillPageProps) {
  const admin = await requireAdmin();
  const { id } = await params;
  const skill = await prisma.skill.findUnique({ where: { id } });

  if (!skill) {
    notFound();
  }

  return (
    <AdminShell
      active="/admin/skills"
      title="Editar tecnologia"
      userEmail={admin.email}
    >
      <SkillForm
        action={updateSkillAction.bind(null, skill.id)}
        skill={skill}
        submitLabel="Guardar cambios"
      />
    </AdminShell>
  );
}
