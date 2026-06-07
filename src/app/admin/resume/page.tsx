import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { AdminNotice } from "@/components/admin-notice";
import { AdminShell } from "@/components/admin-shell";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { deleteResumeEntryAction } from "@/app/admin/resume/actions";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type ResumePageProps = {
  searchParams: Promise<{ status?: string }>;
};

const sectionLabels: Record<string, string> = {
  summary: "Resumen",
  education: "Formacion",
  experience: "Experiencia",
  courses: "Cursos",
  competencies: "Competencias",
  languages: "Idiomas",
};

export const dynamic = "force-dynamic";

export default async function ResumePage({ searchParams }: ResumePageProps) {
  const admin = await requireAdmin();
  const params = await searchParams;
  const entries = await prisma.resumeEntry.findMany({
    orderBy: [{ section: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <AdminShell
      active="/admin/resume"
      title="Hoja de vida"
      userEmail={admin.email}
    >
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Contenido editable del CV</h2>
            <p className="mt-1 text-sm text-stone-600">
              Administra formacion, experiencia, cursos, competencias e idiomas.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-2 rounded-md bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800"
            href="/admin/resume/new"
          >
            <Plus className="h-4 w-4" />
            Nueva entrada
          </Link>
        </div>

        <AdminNotice status={params.status} />

        <div className="grid gap-4">
          {entries.map((entry) => (
            <article
              className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-cyan-700 hover:shadow-lg"
              key={entry.id}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-cyan-800">
                    {sectionLabels[entry.section] ?? entry.section} -{" "}
                    {entry.visible ? "Visible" : "Oculto"}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{entry.title}</h3>
                  {entry.subtitle || entry.period ? (
                    <p className="mt-1 text-sm font-medium text-stone-500">
                      {[entry.subtitle, entry.period].filter(Boolean).join(" - ")}
                    </p>
                  ) : null}
                  {entry.description ? (
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {entry.description}
                    </p>
                  ) : null}
                </div>
                <div className="flex gap-2">
                  <Link
                    className="rounded-md border border-stone-300 p-2 transition hover:bg-stone-50"
                    href={`/admin/resume/${entry.id}/edit`}
                    title="Editar"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <form action={deleteResumeEntryAction.bind(null, entry.id)}>
                    <ConfirmDeleteButton
                      message={`Eliminar la entrada "${entry.title}"?`}
                    />
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
