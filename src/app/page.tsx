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
  Mail,
  MapPin,
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
import { Reveal } from "@/components/reveal";
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
  const publicProjectCount = publicProjects.length;

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-blue-950">
      <section
        className="relative isolate overflow-x-clip px-4 py-3 sm:px-10 sm:py-8 lg:min-h-dvh lg:px-16"
        id="hero"
      >
        <div className="animated-grid absolute inset-0 -z-20" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-white/70 to-transparent" />

        <div className="mx-auto grid min-w-0 max-w-7xl gap-4 py-6 sm:gap-10 sm:py-14 lg:min-h-[74vh] lg:content-center lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div className="min-w-0 max-w-4xl">
            <p className="mb-2 flex w-fit max-w-full items-center gap-2 rounded-md border border-blue-100 bg-white/80 px-3 py-2 text-sm font-medium text-blue-800 shadow-sm backdrop-blur sm:mb-5">
              <span className="pulse-ring shrink-0 rounded-full">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
              </span>
              <span className="min-w-0 break-words">
                Portafolio profesional con proyectos reales y datos protegidos
              </span>
            </p>
            <h1 className="break-words text-3xl font-semibold leading-tight text-blue-950 sm:text-6xl lg:text-7xl">
              {publicProfile.name}
            </h1>
            <h2 className="mt-2 max-w-3xl break-words text-xl font-semibold leading-tight text-blue-700 sm:mt-4 sm:text-4xl">
              {publicProfile.role}
            </h2>
            <p className="mt-2 max-w-2xl break-words text-base leading-7 text-blue-800 sm:mt-6 sm:text-xl sm:leading-8">
              {publicProfile.headline}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-sm font-medium text-blue-800 sm:mt-6">
              <ContactChip icon={Mail} value={publicProfile.email} />
              {publicProfile.phone ? (
                <ContactChip
                  href={getWhatsAppHref(publicProfile.phone)}
                  icon={Phone}
                  value={publicProfile.phone}
                />
              ) : null}
              <ContactChip icon={MapPin} value={publicProfile.location} />
            </div>
            <div className="mt-3 flex flex-wrap gap-3 sm:mt-8">
              <a
                className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
                href="#casos"
              >
                Ver casos
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-md border border-blue-200 bg-white/80 px-5 py-3 text-sm font-semibold text-blue-900 shadow-sm backdrop-blur transition hover:bg-white"
                href={`mailto:${publicProfile.email}`}
              >
                <Mail className="h-4 w-4" />
                Contactar
              </a>
            </div>
          </div>

          <div className="relative min-w-0 sm:min-h-[320px] md:min-h-[520px]">
            <div className="scan-panel floating-panel rounded-lg border border-blue-200 bg-blue-950 p-4 text-white shadow-2xl sm:p-5">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm font-medium text-blue-200">
                  arquitectura-portafolio.ts
                </span>
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap break-words text-xs leading-6 text-blue-100 sm:whitespace-pre sm:text-sm sm:leading-7">
                <code>{`const portafolio = {
  rol: "Ingeniero de sistemas",
  enfoque: ["software interno", "automatizacion", "datos"],
  stack: ["Next.js", "Angular", ".NET", "PostgreSQL"],
  gestion: "contenido editable desde panel admin",
  produccion: "Vercel + PostgreSQL"
};`}</code>
              </pre>
            </div>

            <div className="floating-panel-delay mt-4 rounded-lg border border-blue-100 bg-white/90 p-4 shadow-xl backdrop-blur sm:absolute sm:-bottom-2 sm:left-4 sm:right-8 sm:mt-0 md:left-10">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-blue-900">
                  Flujo de trabajo
                </p>
                <Activity className="h-4 w-4 text-blue-700" />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <MiniFlow icon={TerminalSquare} label="Entender" />
                <MiniFlow icon={Workflow} label="Modelar" />
                <MiniFlow icon={Cpu} label="Construir" />
              </div>
            </div>

            <div className="absolute right-0 top-40 hidden w-52 rounded-lg border border-blue-100 bg-white/85 p-4 shadow-xl backdrop-blur md:block">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
                En movimiento
              </p>
              <div className="mt-4 space-y-3">
                {focusAreas.slice(0, 3).map((area) => (
                  <div className="flex items-center gap-2" key={area}>
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <p className="text-sm font-semibold text-blue-900">
                      {area}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-blue-100 bg-blue-950 py-4 text-white">
        <div className="ticker-track flex gap-3">
          {[...focusAreas, ...focusAreas].map((area, index) => (
            <span
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-blue-100"
              key={`${area}-${index}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              {area}
            </span>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="border-y border-blue-100 bg-white px-6 py-14 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
            <Metric
              icon={BriefcaseBusiness}
              label="Proyectos publicados"
              value={`${publicProjectCount}+ casos`}
            />
            <Metric
              icon={Database}
              label="Datos y backend"
              value="PostgreSQL, MySQL, SQL Server"
            />
            <Metric
              icon={Rocket}
              label="Gestion del sitio"
              value="Panel admin editable"
            />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section
          className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16"
          id="perfil"
        >
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              Perfil profesional
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-blue-950 sm:text-4xl">
              Formacion, experiencia y competencias.
            </h2>
            <p className="mt-5 text-base leading-7 text-blue-800">
              {publicResume.summary}
            </p>
            <div className="mt-6 grid gap-3">
              {publicResume.languages.map((language) => (
                <div
                  className="inline-flex w-fit items-center gap-2 rounded-md border border-blue-100 bg-white px-3 py-2 text-sm font-medium text-blue-800 shadow-sm"
                  key={language.id}
                >
                  <Languages className="h-4 w-4 text-blue-700" />
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
          <div className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-semibold">Cursos</h3>
            </div>
            <div className="grid gap-2">
              {publicResume.courses.map((course) => (
                <p
                  className="rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-800"
                  key={course.id}
                >
                  {[course.title, course.period].filter(Boolean).join(" - ")}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <UserRound className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-semibold">Competencias</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {publicResume.competencies.map((item) => (
                <span
                  className="rounded-md border border-blue-100 px-3 py-1.5 text-sm text-blue-800"
                  key={item.id}
                >
                  {item.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section
        className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16"
        id="casos"
      >
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            Casos de estudio
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-blue-950 sm:text-4xl">
            Proyectos construidos para resolver procesos reales.
          </h2>
          <p className="mt-4 text-base leading-7 text-blue-800">
            Aqui presento soluciones web, automatizaciones, sistemas internos y
            plataformas de monitoreo sin exponer informacion confidencial de las
            empresas o usuarios involucrados.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {publicProjects.map((project, i) => (
            <Reveal delay={i * 0.1} key={project.title} className="h-full">
            <Link
              className="group flex h-full flex-col rounded-lg border border-blue-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-600 hover:shadow-xl"
              href={`/proyectos/${project.slug}`}
            >
              {"imageUrl" in project && project.imageUrl ? (
                <div
                  className="mb-5 h-44 rounded-md border border-blue-100 bg-cover bg-center transition duration-300 group-hover:scale-[1.02]"
                  style={{ backgroundImage: `url(${project.imageUrl})` }}
                />
              ) : (
                <div className="mb-5 grid h-44 place-items-center rounded-md border border-blue-100 bg-blue-950 text-white">
                  <Code2 className="h-8 w-8 text-blue-300" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-600">
                  {project.sector}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-7">
                  {project.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-blue-800">
                  {project.summary}
                </p>
                <p className="mt-4 text-sm font-medium leading-6 text-blue-950">
                  {project.impact}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                      key={tech}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                Ver caso completo
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
            </Reveal>
          ))}
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="bg-blue-950 px-6 py-20 text-white sm:px-10 lg:px-16" id="logros">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
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
                <p className="mt-3 text-sm leading-6 text-blue-200">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16" id="stack">
        <div className="grid gap-5 md:grid-cols-3">
          {publicStackGroups.map((group, i) => (
            <Reveal delay={i * 0.12} key={group.title} className="h-full">
            <div
              className="flex h-full flex-col rounded-lg border border-blue-100 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold">{group.title}</h2>
              <div className="mt-5 flex flex-1 flex-wrap gap-2 content-start">
                {group.items.map((item) => (
                  <span
                    className="rounded-md border border-blue-100 px-3 py-1.5 text-sm text-blue-800"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </section>
      </Reveal>

      <footer className="border-t border-blue-100 bg-white px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-blue-600">
            {publicProfile.name} - {publicProfile.location}
          </p>
          <div className="flex gap-3">
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
      <span className="rounded-lg bg-blue-50 p-3 text-blue-700">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm text-blue-500">{label}</p>
        <p className="text-xl font-semibold text-blue-950">{value}</p>
      </div>
    </div>
  );
}

function ContactChip({
  href,
  icon: Icon,
  value,
}: {
  href?: string;
  icon: ComponentType<{ className?: string }>;
  value: string;
}) {
  const className =
    "inline-flex max-w-full min-w-0 items-center gap-2 rounded-md border border-blue-100 bg-white/80 px-3 py-2 shadow-sm backdrop-blur";
  const content = (
    <>
      <Icon className="h-4 w-4 shrink-0 text-blue-700" />
      <span className="min-w-0 break-words">{value}</span>
    </>
  );

  if (href) {
    return (
      <a
        aria-label={`Abrir WhatsApp para ${value}`}
        className={`${className} transition hover:border-blue-300 hover:bg-white`}
        href={href}
        rel="noreferrer"
        target="_blank"
      >
        {content}
      </a>
    );
  }

  return (
    <span className={className}>{content}</span>
  );
}

function getWhatsAppHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const normalizedNumber =
    digits.length === 10 && digits.startsWith("3") ? `57${digits}` : digits;

  return normalizedNumber ? `https://wa.me/${normalizedNumber}` : undefined;
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
    <div className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <Icon className="h-5 w-5 text-blue-700" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="grid gap-4">
        {items.map((item) => (
          <article className="border-l-2 border-blue-700 pl-4" key={item.title}>
            <h4 className="font-semibold text-blue-950">{item.title}</h4>
            <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-blue-500">
              <CalendarDays className="h-4 w-4" />
              {item.meta}
            </p>
            {item.detail ? (
              <p className="mt-2 text-sm leading-6 text-blue-800">
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
    <div className="rounded-md border border-blue-100 bg-white p-3">
      <Icon className="h-4 w-4 text-blue-700" />
      <p className="mt-3 text-sm font-semibold text-blue-900">{label}</p>
    </div>
  );
}
