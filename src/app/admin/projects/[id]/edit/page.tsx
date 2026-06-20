import { notFound } from "next/navigation";
import { AdminNotice } from "@/components/admin-notice";
import { AdminShell } from "@/components/admin-shell";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { updateProjectAction } from "@/app/admin/projects/actions";
import { ProjectForm } from "@/app/admin/projects/project-form";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string }>;
};

export default async function EditProjectPage({
  params,
  searchParams,
}: EditProjectPageProps) {
  const admin = await requireAdmin();
  const { id } = await params;
  const query = await searchParams;
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
      <div className="space-y-5">
        <AdminNotice status={query.status} />
        <ProjectForm
          action={updateProjectAction.bind(null, project.id)}
          project={project}
          submitLabel="Guardar cambios"
        />
      </div>
    </AdminShell>
  );
}
