import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { AdminNotice } from "@/components/admin-notice";
import { AdminShell } from "@/components/admin-shell";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { deleteAchievementAction } from "@/app/admin/achievements/actions";

export const dynamic = "force-dynamic";

type AchievementsPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function AchievementsPage({
  searchParams,
}: AchievementsPageProps) {
  const admin = await requireAdmin();
  const params = await searchParams;
  const achievements = await prisma.achievement.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <AdminShell
      active="/admin/achievements"
      title="Logros"
      userEmail={admin.email}
    >
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Logros profesionales</h2>
            <p className="mt-1 text-sm text-stone-600">
              Registra hitos, resultados, certificaciones o aprendizajes.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-2 rounded-md bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800"
            href="/admin/achievements/new"
          >
            <Plus className="h-4 w-4" />
            Nuevo logro
          </Link>
        </div>

        <AdminNotice status={params.status} />

        <div className="grid gap-4">
          {achievements.map((achievement) => (
            <article
              className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-cyan-700 hover:shadow-lg"
              key={achievement.id}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-cyan-800">
                    {achievement.category ?? "General"} -{" "}
                    {stateLabel(achievement.state)}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">
                    {achievement.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {achievement.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    className="rounded-md border border-stone-300 p-2 transition hover:bg-stone-50"
                    href={`/admin/achievements/${achievement.id}/edit`}
                    title="Editar"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <form
                    action={deleteAchievementAction.bind(null, achievement.id)}
                  >
                    <ConfirmDeleteButton message={`Eliminar el logro "${achievement.title}"?`} />
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

function stateLabel(state: string) {
  if (state === "PUBLISHED") {
    return "Publicado";
  }

  if (state === "HIDDEN") {
    return "Oculto";
  }

  return "Borrador";
}
