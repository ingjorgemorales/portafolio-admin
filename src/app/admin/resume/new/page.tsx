import { AdminShell } from "@/components/admin-shell";
import { createResumeEntryAction } from "@/app/admin/resume/actions";
import { ResumeForm } from "@/app/admin/resume/resume-form";
import { requireAdmin } from "@/lib/auth";

export default async function NewResumeEntryPage() {
  const admin = await requireAdmin();

  return (
    <AdminShell
      active="/admin/resume"
      title="Nueva entrada de CV"
      userEmail={admin.email}
    >
      <ResumeForm
        action={createResumeEntryAction}
        submitLabel="Crear entrada"
      />
    </AdminShell>
  );
}
