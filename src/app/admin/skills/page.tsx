import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { AdminNotice } from "@/components/admin-notice";
import { AdminShell } from "@/components/admin-shell";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { deleteSkillAction } from "@/app/admin/skills/actions";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type SkillsPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function SkillsPage({ searchParams }: SkillsPageProps) {
  const admin = await requireAdmin();
  const params = await searchParams;
  const skills = await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <AdminShell
      active="/admin/skills"
      title="Tecnologias"
      userEmail={admin.email}
    >
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Stack tecnico</h2>
            <p className="mt-1 text-sm text-blue-600">
              Organiza las tecnologias que se muestran en tu portafolio.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
            href="/admin/skills/new"
          >
            <Plus className="h-4 w-4" />
            Nueva tecnologia
          </Link>
        </div>

        <AdminNotice status={params.status} />

        <div className="overflow-hidden rounded-lg border border-blue-100 bg-white/90 shadow-sm backdrop-blur">
          <table className="w-full text-left text-sm">
            <thead className="bg-blue-50 text-blue-600">
              <tr>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Categoria</th>
                <th className="px-4 py-3 font-medium">Nivel</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {skills.map((skill) => (
                <tr className="transition hover:bg-blue-50/50" key={skill.id}>
                  <td className="px-4 py-3 font-medium">{skill.name}</td>
                  <td className="px-4 py-3 text-blue-600">
                    {skill.category}
                  </td>
                  <td className="px-4 py-3">{skill.level}/5</td>
                  <td className="px-4 py-3">{stateLabel(skill.state)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        className="rounded-md border border-blue-200 p-2 transition hover:bg-blue-50"
                        href={`/admin/skills/${skill.id}/edit`}
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <form action={deleteSkillAction.bind(null, skill.id)}>
                        <ConfirmDeleteButton message={`Eliminar la tecnologia "${skill.name}"?`} />
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
