import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { getCurrentAdmin } from "@/lib/auth";
import { loginAction } from "@/app/admin/login/actions";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    logout?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const admin = await getCurrentAdmin();

  if (admin) {
    redirect("/admin");
  }

  const params = await searchParams;
  const message = getMessage(params);

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-white px-6 py-10 text-blue-950">
      <div className="animated-grid absolute inset-0 -z-20 opacity-70" />
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-white/80 to-transparent" />
      <section className="floating-panel w-full max-w-md rounded-lg border border-blue-100 bg-white/90 p-6 shadow-2xl backdrop-blur">
        <Link
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-950"
          href="/"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al sitio
        </Link>
        <div className="mb-8">
          <span className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
            <LockKeyhole className="pulse-ring h-5 w-5 rounded-full" />
          </span>
          <h1 className="text-2xl font-semibold">Entrar al panel</h1>
          <p className="mt-2 text-sm leading-6 text-blue-600">
            Usa tu usuario administrador para gestionar el contenido del
            portafolio.
          </p>
        </div>

        {message ? (
          <div
            className={`mb-5 rounded-md border px-3 py-2 text-sm ${
              params.logout
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {message}
          </div>
        ) : null}

        <form action={loginAction} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-blue-800">Correo</span>
            <input
              className="mt-2 w-full rounded-md border border-blue-200 px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
              defaultValue="admin@local.dev"
              name="email"
              placeholder="admin@local.dev"
              required
              type="email"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-blue-800">
              Contrasena
            </span>
            <input
              className="mt-2 w-full rounded-md border border-blue-200 px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
              name="password"
              placeholder="********"
              required
              type="password"
            />
          </label>
          <button
            className="w-full rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
}

function getMessage(params: { error?: string; logout?: string }) {
  if (params.logout) {
    return "Sesion cerrada correctamente.";
  }

  if (params.error === "missing") {
    return "Escribe el correo y la contrasena.";
  }

  if (params.error === "credentials") {
    return "Correo o contrasena incorrectos.";
  }

  return null;
}
