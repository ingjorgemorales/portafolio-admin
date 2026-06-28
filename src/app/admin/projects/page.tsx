import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { AdminNotice } from "@/components/admin-notice";
import { AdminShell } from "@/components/admin-shell";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { deleteProjectAction } from "@/app/admin/projects/actions";

export const dynamic = "force-dynamic";

type ProjectsPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const admin = await requireAdmin();
  const params = await searchParams;
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
  });

  return (
    <AdminShell
      active="/admin/projects"
      title="Proyectos"
      userEmail={admin.email}
    >
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Casos de estudio</h2>
            <p className="mt-1 text-sm text-blue-600">
              Administra proyectos anonimizados para mostrar tu experiencia.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
            href="/admin/projects/new"
          >
            <Plus className="h-4 w-4" />
            Nuevo proyecto
          </Link>
        </div>

        <AdminNotice status={params.status} />

        <div className="overflow-hidden rounded-lg border border-blue-100 bg-white/90 shadow-sm backdrop-blur">
          <table className="w-full text-left text-sm">
            <thead className="bg-blue-50 text-blue-600">
              <tr>
                <th className="px-4 py-3 font-medium">Titulo</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Destacado</th>
                <th className="px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {projects.map((project) => (
                <tr className="transition hover:bg-blue-50/50" key={project.id}>
                  <td className="px-4 py-3">
                    <p className="font-medium">{project.title}</p>
                    <p className="mt-1 text-xs text-blue-500">
                      {project.sector ?? "Sin sector"} - /{project.slug}
                    </p>
                    {project.repoUrl ? (
                      <a
                        className="mt-1 inline-flex text-xs font-medium text-blue-700 hover:underline"
                        href={project.repoUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        GitHub
                      </a>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">{stateLabel(project.state)}</td>
                  <td className="px-4 py-3">
                    {project.featured ? "Si" : "No"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        className="rounded-md border border-blue-200 p-2 transition hover:bg-blue-50"
                        href={`/admin/projects/${project.id}/edit`}
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <form action={deleteProjectAction.bind(null, project.id)}>
                        <ConfirmDeleteButton message={`Eliminar el proyecto "${project.title}"?`} />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}

function stateLabel(state: string) {
  if (state === "PUBLISHED") {
    return "Publicado";
  }

  if (state === "HIDDEN") {
    return "Oculto";
  }

  return "Borrador";
}
