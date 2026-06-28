"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LockKeyhole, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#hero", label: "Inicio" },
  { href: "/#perfil", label: "Perfil" },
  { href: "/#casos", label: "Casos" },
  { href: "/#logros", label: "Logros" },
  { href: "/#stack", label: "Stack" },
];

const sectionIds = navLinks.map((l) => l.href.replace("/#", ""));

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-45% 0px -55% 0px" },
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const linkClass = (href: string) => {
    const id = href.replace("/#", "");
    const active = activeSection === id;
    return `rounded-md px-3 py-2 text-sm font-medium transition ${
      active
        ? "bg-blue-100 text-blue-700"
        : "text-blue-900 hover:bg-blue-50"
    }`;
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-blue-100 transition-colors ${
        open ? "bg-white" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          className="text-sm font-bold uppercase tracking-[0.18em] text-blue-900"
          href="/"
        >
          Jorge Morales
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              className={linkClass(link.href)}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
          <Link
            className="ml-2 inline-flex items-center gap-2 rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
            href="/admin"
          >
            <LockKeyhole className="h-4 w-4" />
            Admin
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="rounded-md p-2 text-blue-900 transition hover:bg-blue-50 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile menu panel */}
      <nav
        className={`fixed right-0 top-0 z-[60] flex h-full w-64 flex-col gap-2 border-l border-blue-100 bg-white p-6 shadow-xl md:hidden ${
          open ? "animate-[slide-in_0.2s_ease-out]" : "hidden"
        }`}
      >
        <div className="mb-4 flex justify-end">
          <button
            className="rounded-md p-2 text-blue-900 transition hover:bg-blue-50"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {navLinks.map((link) => (
          <a
            className={linkClass(link.href)}
            href={link.href}
            key={link.href}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <Link
          className="mt-2 inline-flex items-center gap-2 rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
          href="/admin"
          onClick={() => setOpen(false)}
        >
          <LockKeyhole className="h-4 w-4" />
          Admin
        </Link>
      </nav>
    </header>
  );
}
