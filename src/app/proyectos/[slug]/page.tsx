import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  Layers3,
  Mail,
  Network,
  ScanLine,
  Workflow,
} from "lucide-react";
import type { ComponentType } from "react";
import { getProjectBySlug, getPublicProfile } from "@/lib/public-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return {
    title: `${project.title} | Caso de estudio`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, publicProfile] = await Promise.all([
    getProjectBySlug(slug),
    getPublicProfile(),
  ]);

  const sections = [
    {
      title: "Problema",
      content:
        project.problem ??
        "El caso se puede completar desde el panel con el contexto del problema.",
    },
    {
      title: "Solucion",
      content:
        project.solution ??
        "El caso se puede completar desde el panel con la solucion aplicada.",
    },
    {
      title: "Impacto",
      content:
        project.impact ??
        "El caso se puede completar desde el panel con resultados e impacto.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-stone-950">
      <section className="relative isolate overflow-hidden px-6 py-8 sm:px-10 lg:px-16">
        <div className="animated-grid absolute inset-0 -z-20" />
        <div className="absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-white/75 to-transparent" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-lg border border-stone-300 bg-white/60 px-3 py-3 shadow-sm backdrop-blur">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 transition hover:text-stone-950"
            href="/#casos"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a casos
          </Link>
          <Link
            className="rounded-md bg-stone-950 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800"
            href="/admin/projects"
          >
            Admin
          </Link>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-8 py-16 lg:grid-cols-[1fr_390px] lg:items-start">
          <div>
            <p className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white/60 px-3 py-2 text-sm font-medium text-stone-700 shadow-sm backdrop-blur">
              <span className="pulse-ring rounded-full">
                <CheckCircle2 className="h-4 w-4 text-cyan-700" />
              </span>
              Caso de estudio anonimizado
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">
              {project.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.repoUrl ? (
                <a
                  className="inline-flex items-center gap-2 rounded-md bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-stone-800"
                  href={project.repoUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Code2 className="h-4 w-4" />
                  Ver GitHub
                </a>
              ) : null}
              {project.liveUrl ? (
                <a
                  className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white/70 px-4 py-2.5 text-sm font-semibold text-stone-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
                  href={project.liveUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver demo
                </a>
              ) : null}
            </div>
          </div>

          <aside className="scan-panel floating-panel rounded-lg border border-stone-300 bg-white/75 p-5 shadow-xl backdrop-blur">
            {project.imageUrl ? (
              <div
                className="mb-5 h-48 rounded-md border border-stone-200 bg-cover bg-center"
                style={{ backgroundImage: `url(${project.imageUrl})` }}
              />
            ) : (
              <div className="mb-5 grid h-48 place-items-center rounded-md border border-stone-200 bg-stone-950 text-white">
                <Code2 className="h-9 w-9 text-cyan-300" />
              </div>
            )}
            <p className="text-sm font-semibold text-amber-700">
              {project.sector ?? "Sector privado"}
            </p>
            <div className="mt-5 space-y-4">
              <InfoItem icon={Database} label="Base" value="PostgreSQL" />
              <InfoItem icon={Layers3} label="Tipo" value="Caso tecnico" />
              <InfoItem
                icon={ExternalLink}
                label="Estado"
                value="Publicado"
              />
            </div>
          </aside>
        </div>
      </section>

      <section className="overflow-hidden border-y border-stone-200 bg-white py-4">
        <div className="ticker-track flex gap-3">
          {[...project.stack, ...project.stack, ...project.stack].map(
            (tech, index) => (
              <span
                className="inline-flex items-center gap-2 rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-700"
                key={`${tech}-${index}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-700" />
                {tech}
              </span>
            ),
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 sm:px-10 lg:grid-cols-3 lg:px-16">
        {sections.map((section, index) => (
          <article
            className="group rounded-lg border border-stone-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-700 hover:shadow-xl"
            key={section.title}
          >
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-800 transition group-hover:bg-cyan-800 group-hover:text-white">
              {index + 1}
            </div>
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-stone-700">
              {section.content}
            </p>
          </article>
        ))}
      </section>

      <section className="bg-stone-950 px-6 py-16 text-white sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Stack aplicado
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Tecnologias usadas en este caso
            </h2>
            <div className="mt-6 grid gap-3 text-sm text-stone-300">
              <FlowLine icon={Workflow} text="Analisis del proceso" />
              <FlowLine icon={ScanLine} text="Modelado de datos" />
              <FlowLine icon={Code2} text="Implementacion mantenible" />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.stack.map((tech) => (
              <span
                className="rounded-md border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-medium text-stone-100"
                key={tech}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">{publicProfile.name}</p>
            <p className="mt-1 text-sm text-stone-600">{publicProfile.role}</p>
          </div>
          <div className="flex gap-3">
            <a
              aria-label="Correo"
              className="rounded-md border border-stone-200 p-2 text-stone-700 transition hover:bg-stone-100"
              href={`mailto:${publicProfile.email}`}
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              aria-label="GitHub"
              className="rounded-md border border-stone-200 p-2 text-stone-700 transition hover:bg-stone-100"
              href={publicProfile.links.github}
            >
              <Code2 className="h-4 w-4" />
            </a>
            <a
              aria-label="LinkedIn"
              className="rounded-md border border-stone-200 p-2 text-stone-700 transition hover:bg-stone-100"
              href={publicProfile.links.linkedin}
            >
              <Network className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="rounded-md bg-cyan-50 p-2 text-cyan-800">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs text-stone-500">{label}</p>
        <p className="text-sm font-semibold text-stone-950">{value}</p>
      </div>
    </div>
  );
}

function FlowLine({
  icon: Icon,
  text,
}: {
  icon: ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="rounded-md border border-white/10 bg-white/[0.07] p-2 text-cyan-300">
        <Icon className="h-4 w-4" />
      </span>
      <span>{text}</span>
    </div>
  );
}
