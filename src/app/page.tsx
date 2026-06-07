import {
  ArrowRight,
  Activity,
  BriefcaseBusiness,
  BookOpen,
  CalendarDays,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Languages,
  LockKeyhole,
  Mail,
  MapPin,
  Network,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  UserRound,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { featuredProjects, focusAreas } from "@/lib/content";
import {
  getFeaturedProjects,
  getPublicAchievements,
  getPublicProfile,
  getPublicResume,
  getPublicStackGroups,
} from "@/lib/public-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [
    publicProfile,
    storedProjects,
    publicAchievements,
    publicStackGroups,
    publicResume,
  ] = await Promise.all([
      getPublicProfile(),
      getFeaturedProjects(),
      getPublicAchievements(),
      getPublicStackGroups(),
      getPublicResume(),
    ]);
  const publicProjects =
    storedProjects.length > 0 ? storedProjects : featuredProjects;

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-stone-950">
      <section className="relative isolate min-h-[88vh] overflow-hidden px-6 py-8 sm:px-10 lg:px-16">
        <div className="animated-grid absolute inset-0 -z-20" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-white/70 to-transparent" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-lg border border-stone-300 bg-white/60 px-3 py-3 shadow-sm backdrop-blur">
          <Link
            className="text-sm font-semibold uppercase tracking-[0.18em]"
            href="/"
          >
            Portafolio
          </Link>
          <div className="flex items-center gap-2">
            <a
              className="hidden rounded-md border border-stone-300 bg-white/55 px-3 py-2 text-sm font-medium text-stone-800 shadow-sm backdrop-blur transition hover:bg-white sm:inline-flex"
              href="#casos"
            >
              Casos
            </a>
            <a
              className="hidden rounded-md border border-stone-300 bg-white/55 px-3 py-2 text-sm font-medium text-stone-800 shadow-sm backdrop-blur transition hover:bg-white sm:inline-flex"
              href="#perfil"
            >
              Perfil
            </a>
            <Link
              className="inline-flex items-center gap-2 rounded-md bg-stone-950 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800"
              href="/admin"
            >
              <LockKeyhole className="h-4 w-4" />
              Admin
            </Link>
          </div>
        </nav>

        <div className="mx-auto grid min-h-[74vh] max-w-7xl content-center gap-10 py-14 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white/55 px-3 py-2 text-sm font-medium text-stone-700 shadow-sm backdrop-blur">
              <span className="pulse-ring rounded-full">
                <ShieldCheck className="h-4 w-4 text-cyan-700" />
              </span>
              Casos de estudio anonimizados y enfoque profesional
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-stone-950 sm:text-6xl lg:text-7xl">
              {publicProfile.name}
            </h1>
            <h2 className="mt-4 max-w-3xl text-2xl font-semibold leading-tight text-cyan-900 sm:text-4xl">
              Ingeniero de sistemas y desarrollador de software
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700 sm:text-xl">
              {publicProfile.headline}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm font-medium text-stone-700">
              <ContactChip icon={Mail} value={publicProfile.email} />
              {publicProfile.phone ? (
                <ContactChip icon={Phone} value={publicProfile.phone} />
              ) : null}
              <ContactChip icon={MapPin} value={publicProfile.location} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-md bg-cyan-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700"
                href="#casos"
              >
                Ver casos
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white/65 px-5 py-3 text-sm font-semibold text-stone-900 shadow-sm backdrop-blur transition hover:bg-white"
                href={`mailto:${publicProfile.email}`}
              >
                <Mail className="h-4 w-4" />
                Contactar
              </a>
            </div>
          </div>

          <div className="relative min-h-[520px]">
            <div className="scan-panel floating-panel rounded-lg border border-stone-300 bg-stone-950 p-5 text-white shadow-2xl">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm font-medium text-stone-300">
                  arquitectura-portafolio.ts
                </span>
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
              </div>
              <pre className="overflow-x-auto text-sm leading-7 text-stone-200">
                <code>{`const portafolio = {
  publico: ["perfil", "casos", "logros", "contacto"],
  admin: ["login", "dashboard", "crud"],
  datos: "PostgreSQL local",
  admin: "CRUD protegido",
  deploy: "Vercel cuando este listo"
};`}</code>
              </pre>
            </div>

            <div className="floating-panel-delay absolute -bottom-2 left-4 right-8 rounded-lg border border-stone-300 bg-white/80 p-4 shadow-xl backdrop-blur md:left-10">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-stone-900">
                  Flujo de trabajo
                </p>
                <Activity className="h-4 w-4 text-cyan-800" />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <MiniFlow icon={TerminalSquare} label="Entender" />
                <MiniFlow icon={Workflow} label="Modelar" />
                <MiniFlow icon={Cpu} label="Construir" />
              </div>
            </div>

            <div className="absolute right-0 top-40 hidden w-52 rounded-lg border border-stone-300 bg-white/75 p-4 shadow-xl backdrop-blur md:block">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800">
                En movimiento
              </p>
              <div className="mt-4 space-y-3">
                {focusAreas.slice(0, 3).map((area) => (
                  <div className="flex items-center gap-2" key={area}>
                    <Sparkles className="h-4 w-4 text-amber-700" />
                    <p className="text-sm font-semibold text-stone-800">
                      {area}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-stone-200 bg-stone-950 py-4 text-white">
        <div className="ticker-track flex gap-3">
          {[...focusAreas, ...focusAreas].map((area, index) => (
            <span
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-stone-100"
              key={`${area}-${index}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              {area}
            </span>
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white px-6 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <Metric icon={BriefcaseBusiness} label="Enfoque" value="Software util" />
          <Metric icon={Database} label="Datos" value="PostgreSQL + Prisma" />
          <Metric icon={Rocket} label="Deploy" value="Listo para Vercel" />
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16"
        id="perfil"
      >
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-800">
              Perfil profesional
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-stone-950 sm:text-4xl">
              Formacion, experiencia y competencias.
            </h2>
            <p className="mt-5 text-base leading-7 text-stone-700">
              {publicResume.summary}
            </p>
            <div className="mt-6 grid gap-3">
              {publicResume.languages.map((language) => (
                <div
                  className="inline-flex w-fit items-center gap-2 rounded-md border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-700 shadow-sm"
                  key={language.id}
                >
                  <Languages className="h-4 w-4 text-cyan-800" />
                  {language.title}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <ResumeBlock
              icon={GraduationCap}
              items={publicResume.education.map((item) => ({
                title: item.title,
                meta: [item.subtitle, item.period].filter(Boolean).join(" - "),
                detail: item.description ?? "",
              }))}
              title="Formacion"
            />
            <ResumeBlock
              icon={BriefcaseBusiness}
              items={publicResume.experience.map((item) => ({
                title: item.title,
                meta: [item.subtitle, item.period].filter(Boolean).join(" - "),
                detail: item.description ?? "",
              }))}
              title="Experiencia"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-cyan-800" />
              <h3 className="text-lg font-semibold">Cursos</h3>
            </div>
            <div className="grid gap-2">
              {publicResume.courses.map((course) => (
                <p
                  className="rounded-md bg-stone-50 px-3 py-2 text-sm text-stone-700"
                  key={course.id}
                >
                  {[course.title, course.period].filter(Boolean).join(" - ")}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <UserRound className="h-5 w-5 text-cyan-800" />
              <h3 className="text-lg font-semibold">Competencias</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {publicResume.competencies.map((item) => (
                <span
                  className="rounded-md border border-stone-200 px-3 py-1.5 text-sm text-stone-700"
                  key={item.id}
                >
                  {item.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16"
        id="casos"
      >
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-800">
            Casos de estudio
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-stone-950 sm:text-4xl">
            Muestra impacto sin revelar informacion sensible.
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-700">
            Cada caso se puede publicar con sector, problema, solucion, stack y
            resultado. El panel permitira editar esto sin tocar codigo.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {publicProjects.map((project) => (
            <Link
              className="group rounded-lg border border-stone-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-700 hover:shadow-xl"
              href={`/proyectos/${project.slug}`}
              key={project.title}
            >
              {"imageUrl" in project && project.imageUrl ? (
                <div
                  className="mb-5 h-44 rounded-md border border-stone-200 bg-cover bg-center transition duration-300 group-hover:scale-[1.02]"
                  style={{ backgroundImage: `url(${project.imageUrl})` }}
                />
              ) : (
                <div className="mb-5 grid h-44 place-items-center rounded-md border border-stone-200 bg-stone-950 text-white">
                  <Code2 className="h-8 w-8 text-cyan-300" />
                </div>
              )}
              <p className="text-sm font-medium text-amber-700">
                {project.sector}
              </p>
              <h3 className="mt-3 text-xl font-semibold leading-7">
                {project.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-stone-700">
                {project.summary}
              </p>
              <p className="mt-4 text-sm font-medium leading-6 text-stone-950">
                {project.impact}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    className="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700"
                    key={tech}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-800">
                Ver caso completo
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-stone-950 px-6 py-20 text-white sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Logros y criterio
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Tu diferencial no es solo el stack: es como piensas.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {publicAchievements.map((item) => (
              <div
                className="rounded-lg border border-white/10 bg-white/[0.06] p-5"
                key={item.title}
              >
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-300">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
        <div className="grid gap-5 md:grid-cols-3">
          {publicStackGroups.map((group) => (
            <div
              className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
              key={group.title}
            >
              <h2 className="text-lg font-semibold">{group.title}</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    className="rounded-md border border-stone-200 px-3 py-1.5 text-sm text-stone-700"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-600">
            {publicProfile.name} - {publicProfile.location}
          </p>
          <div className="flex gap-3">
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

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="rounded-lg bg-cyan-50 p-3 text-cyan-800">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm text-stone-500">{label}</p>
        <p className="text-xl font-semibold text-stone-950">{value}</p>
      </div>
    </div>
  );
}

function ContactChip({
  icon: Icon,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  value: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white/65 px-3 py-2 shadow-sm backdrop-blur">
      <Icon className="h-4 w-4 text-cyan-800" />
      {value}
    </span>
  );
}

function ResumeBlock({
  icon: Icon,
  items,
  title,
}: {
  icon: ComponentType<{ className?: string }>;
  items: Array<{ title: string; meta: string; detail: string }>;
  title: string;
}) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <Icon className="h-5 w-5 text-cyan-800" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="grid gap-4">
        {items.map((item) => (
          <article className="border-l-2 border-cyan-800 pl-4" key={item.title}>
            <h4 className="font-semibold text-stone-950">{item.title}</h4>
            <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-stone-500">
              <CalendarDays className="h-4 w-4" />
              {item.meta}
            </p>
            {item.detail ? (
              <p className="mt-2 text-sm leading-6 text-stone-700">
                {item.detail}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

function MiniFlow({
  icon: Icon,
  label,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="rounded-md border border-stone-200 bg-white p-3">
      <Icon className="h-4 w-4 text-cyan-800" />
      <p className="mt-3 text-sm font-semibold text-stone-900">{label}</p>
    </div>
  );
}
