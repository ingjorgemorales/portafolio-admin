import { AdminShell } from "@/components/admin-shell";
import { requireAdmin } from "@/lib/auth";
import { createProjectAction } from "@/app/admin/projects/actions";
import { ProjectForm } from "@/app/admin/projects/project-form";

export default async function NewProjectPage() {
  const admin = await requireAdmin();

  return (
    <AdminShell
      active="/admin/projects"
      title="Nuevo proyecto"
      userEmail={admin.email}
    >
      <ProjectForm action={createProjectAction} submitLabel="Crear proyecto" />
    </AdminShell>
  );
}
