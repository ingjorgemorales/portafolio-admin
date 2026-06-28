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
    <main className="min-h-screen overflow-x-hidden bg-white text-blue-950">
      <section className="relative isolate overflow-x-clip px-4 py-8 sm:px-10 lg:px-16">
        <div className="animated-grid absolute inset-0 -z-20" />
        <div className="absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-white/75 to-transparent" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-lg border border-blue-100 bg-white/80 px-3 py-3 shadow-sm backdrop-blur">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-800 transition hover:text-blue-950"
            href="/#casos"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a casos
          </Link>
          <Link
            className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
            href="/admin/projects"
          >
            Admin
          </Link>
        </nav>

        <div className="mx-auto grid min-w-0 max-w-7xl gap-8 py-16 lg:grid-cols-[1fr_390px] lg:items-start">
          <div className="min-w-0">
            <p className="flex w-fit max-w-full items-center gap-2 rounded-md border border-blue-100 bg-white/80 px-3 py-2 text-sm font-medium text-blue-800 shadow-sm backdrop-blur">
              <span className="pulse-ring shrink-0 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
              </span>
              <span className="min-w-0 break-words">
                Caso de estudio anonimizado
              </span>
            </p>
            <h1 className="mt-6 max-w-4xl break-words text-3xl font-semibold leading-tight sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl break-words text-base leading-7 text-blue-800 sm:text-lg sm:leading-8">
              {project.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.repoUrl ? (
                <a
                  className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-600"
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
                  className="inline-flex items-center gap-2 rounded-md border border-blue-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-blue-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
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

          <aside className="scan-panel floating-panel min-w-0 rounded-lg border border-blue-100 bg-white/85 p-5 shadow-xl backdrop-blur">
            {project.imageUrl ? (
              <div
                className="mb-5 h-48 rounded-md border border-blue-100 bg-cover bg-center"
                style={{ backgroundImage: `url(${project.imageUrl})` }}
              />
            ) : (
              <div className="mb-5 grid h-48 place-items-center rounded-md border border-blue-100 bg-blue-950 text-white">
                <Code2 className="h-9 w-9 text-blue-300" />
              </div>
            )}
            <p className="text-sm font-semibold text-amber-600">
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

      <section className="overflow-hidden border-y border-blue-100 bg-white py-4">
        <div className="ticker-track flex gap-3">
          {[...project.stack, ...project.stack, ...project.stack].map(
            (tech, index) => (
              <span
                className="inline-flex items-center gap-2 rounded-md border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800"
                key={`${tech}-${index}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                {tech}
              </span>
            ),
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 sm:px-10 lg:grid-cols-3 lg:px-16">
        {sections.map((section, index) => (
          <article
            className="group rounded-lg border border-blue-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-600 hover:shadow-xl"
            key={section.title}
          >
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
              {index + 1}
            </div>
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-blue-800">
              {section.content}
            </p>
          </article>
        ))}
      </section>

      <section className="bg-blue-950 px-6 py-16 text-white sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
              Stack aplicado
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Tecnologias usadas en este caso
            </h2>
            <div className="mt-6 grid gap-3 text-sm text-blue-200">
              <FlowLine icon={Workflow} text="Analisis del proceso" />
              <FlowLine icon={ScanLine} text="Modelado de datos" />
              <FlowLine icon={Code2} text="Implementacion mantenible" />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.stack.map((tech) => (
              <span
                className="rounded-md border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-medium text-blue-100"
                key={tech}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-blue-100 bg-white px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">{publicProfile.name}</p>
            <p className="mt-1 text-sm text-blue-600">{publicProfile.role}</p>
          </div>
          <div className="flex gap-3">
            <a
              aria-label="Correo"
              className="rounded-md border border-blue-100 p-2 text-blue-700 transition hover:bg-blue-50"
              href={`mailto:${publicProfile.email}`}
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              aria-label="GitHub"
              className="rounded-md border border-blue-100 p-2 text-blue-700 transition hover:bg-blue-50"
              href={publicProfile.links.github}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              aria-label="LinkedIn"
              className="rounded-md border border-blue-100 p-2 text-blue-700 transition hover:bg-blue-50"
              href={publicProfile.links.linkedin}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
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
      <span className="rounded-md bg-blue-50 p-2 text-blue-700">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs text-blue-500">{label}</p>
        <p className="text-sm font-semibold text-blue-950">{value}</p>
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
      <span className="rounded-md border border-white/10 bg-white/[0.07] p-2 text-blue-300">
        <Icon className="h-4 w-4" />
      </span>
      <span>{text}</span>
    </div>
  );
}
