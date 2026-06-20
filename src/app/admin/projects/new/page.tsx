import { AdminNotice } from "@/components/admin-notice";
import { AdminShell } from "@/components/admin-shell";
import { requireAdmin } from "@/lib/auth";
import { createProjectAction } from "@/app/admin/projects/actions";
import { ProjectForm } from "@/app/admin/projects/project-form";

type NewProjectPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function NewProjectPage({
  searchParams,
}: NewProjectPageProps) {
  const admin = await requireAdmin();
  const params = await searchParams;

  return (
    <AdminShell
      active="/admin/projects"
      title="Nuevo proyecto"
      userEmail={admin.email}
    >
      <div className="space-y-5">
        <AdminNotice status={params.status} />
        <ProjectForm action={createProjectAction} submitLabel="Crear proyecto" />
      </div>
    </AdminShell>
  );
}
