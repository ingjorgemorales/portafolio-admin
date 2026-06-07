import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { updateProjectAction } from "@/app/admin/projects/actions";
import { ProjectForm } from "@/app/admin/projects/project-form";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const admin = await requireAdmin();
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    notFound();
  }

  return (
    <AdminShell
      active="/admin/projects"
      title="Editar proyecto"
      userEmail={admin.email}
    >
      <ProjectForm
        action={updateProjectAction.bind(null, project.id)}
        project={project}
        submitLabel="Guardar cambios"
      />
    </AdminShell>
  );
}
