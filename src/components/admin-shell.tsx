import Link from "next/link";
import type { ReactNode } from "react";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  ExternalLink,
  Home,
  Layers3,
  LogOut,
  UserRound,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

const navItems = [
  { href: "/admin", label: "Resumen", icon: Home },
  { href: "/admin/projects", label: "Proyectos", icon: BriefcaseBusiness },
  { href: "/admin/achievements", label: "Logros", icon: Award },
  { href: "/admin/skills", label: "Tecnologias", icon: Layers3 },
  { href: "/admin/profile", label: "Perfil", icon: UserRound },
  { href: "/admin/resume", label: "Hoja de vida", icon: BookOpen },
];

export function AdminShell({
  active,
  children,
  subtitle,
  title,
  userEmail,
}: {
  active: string;
  children: ReactNode;
  subtitle?: string;
  title: string;
  userEmail: string;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-stone-100 text-stone-950">
      <div className="animated-grid absolute inset-0 -z-20 opacity-45" />
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-white via-white/80 to-transparent" />
      <header className="border-b border-stone-200 bg-white/80 px-6 py-4 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-800">
              Panel administrativo
            </p>
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="mt-1 text-sm text-stone-500">
              {subtitle ?? `Sesion activa: ${userEmail}`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-3 py-2 text-sm font-semibold transition hover:bg-stone-50"
              href="/"
            >
              Ver sitio
              <ExternalLink className="h-4 w-4" />
            </Link>
            <form action={logoutAction}>
              <button
                className="inline-flex items-center gap-2 rounded-md bg-stone-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
                type="submit"
              >
                <LogOut className="h-4 w-4" />
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-lg border border-stone-200 bg-white/85 p-2 shadow-sm backdrop-blur">
          <nav className="grid gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === active;

              return (
                <Link
                  className={`inline-flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-stone-950 text-white shadow-sm"
                      : "text-stone-700 hover:translate-x-1 hover:bg-stone-100"
                  }`}
                  href={item.href}
                  key={item.href}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <section className="relative">{children}</section>
      </div>
    </main>
  );
}
