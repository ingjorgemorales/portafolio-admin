import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Layers3,
  UserRound,
} from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

const modules = [
  {
    title: "Proyectos",
    description: "Casos de estudio, sector, impacto, tecnologias y estado.",
    href: "/admin/projects",
    icon: BriefcaseBusiness,
  },
  {
    title: "Logros",
    description: "Hitos profesionales, certificaciones y resultados.",
    href: "/admin/achievements",
    icon: Award,
  },
  {
    title: "Tecnologias",
    description: "Stack tecnico agrupado por categoria, nivel y orden.",
    href: "/admin/skills",
    icon: Layers3,
  },
  {
    title: "Perfil",
    description: "Nombre visible, titular, contacto y redes profesionales.",
    href: "/admin/profile",
    icon: UserRound,
  },
  {
    title: "Hoja de vida",
    description: "Formacion, experiencia, cursos, competencias e idiomas.",
    href: "/admin/resume",
    icon: BookOpen,
  },
];

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const admin = await requireAdmin();
  const [projectCount, achievementCount, skillCount, profileCount, resumeCount] =
    await Promise.all([
      prisma.project.count(),
      prisma.achievement.count(),
      prisma.skill.count(),
      prisma.profile.count(),
      prisma.resumeEntry.count(),
    ]);

  return (
    <AdminShell active="/admin" title="Resumen" userEmail={admin.email}>
      <div className="space-y-6">
        <section className="scan-panel rounded-lg border border-blue-200 bg-blue-950 p-6 text-white shadow-xl">
          <h2 className="text-lg font-semibold">Portafolio conectado</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-200">
            El panel administra proyectos, logros, tecnologias y perfil desde
            la base de datos. Los cambios publicados se reflejan en la pagina
            principal.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-5">
            <Metric label="Proyectos" value={projectCount} />
            <Metric label="Logros" value={achievementCount} />
            <Metric label="Tecnologias" value={skillCount} />
            <Metric label="Perfiles" value={profileCount} />
            <Metric label="CV" value={resumeCount} />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <Link
                className="group rounded-lg border border-blue-100 bg-white/90 p-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-blue-600 hover:shadow-xl"
                href={module.href}
                key={module.href}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-lg bg-blue-50 p-3 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowRight className="h-5 w-5 text-blue-400 transition group-hover:translate-x-1 group-hover:text-blue-700" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{module.title}</h3>
                <p className="mt-2 text-sm leading-6 text-blue-600">
                  {module.description}
                </p>
              </Link>
            );
          })}
        </section>
      </div>
    </AdminShell>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
      <p className="text-sm text-blue-200">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
