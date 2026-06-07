import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { ResumeForm } from "@/app/admin/resume/resume-form";
import { updateResumeEntryAction } from "@/app/admin/resume/actions";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type EditResumeEntryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditResumeEntryPage({
  params,
}: EditResumeEntryPageProps) {
  const admin = await requireAdmin();
  const { id } = await params;
  const entry = await prisma.resumeEntry.findUnique({ where: { id } });

  if (!entry) {
    notFound();
  }

  return (
    <AdminShell
      active="/admin/resume"
      title="Editar entrada de CV"
      userEmail={admin.email}
    >
      <ResumeForm
        action={updateResumeEntryAction.bind(null, entry.id)}
        entry={entry}
        submitLabel="Guardar cambios"
      />
    </AdminShell>
  );
}
