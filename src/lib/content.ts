export const profile = {
  name: "Jorge Andres Morales De La Ossa",
  role: "Ingeniero de sistemas y desarrollador de software",
  headline:
    "Construyo soluciones web para automatizar procesos, ordenar datos operativos y crear herramientas mantenibles para equipos reales.",
  location: "Bogota, Colombia",
  email: "mjorge801@yahoo.com",
  phone: "",
  links: {
    github: "https://github.com/ingjorgemorales",
    linkedin: "https://www.linkedin.com/",
  },
};

export const focusAreas = [
  "Sistemas administrativos",
  "Automatizacion de procesos",
  "Arquitectura backend",
  "Bases de datos relacionales",
  "Dashboards y reportes",
  "Integraciones con APIs",
];

export const featuredProjects = [
  {
    title: "Gestion documental para operacion interna",
    slug: "gestion-documental-operacion-interna",
    sector: "Organizacion de servicios",
    summary:
      "Sistema web para centralizar documentos, controlar estados y reducir busquedas manuales entre areas.",
    impact: "Menos tareas repetitivas y mejor trazabilidad de informacion critica.",
    stack: ["Next.js", "PostgreSQL", "Supabase", "TypeScript"],
  },
  {
    title: "Panel operativo para seguimiento de procesos",
    slug: "panel-operativo-seguimiento-procesos",
    sector: "Empresa logistica",
    summary:
      "Dashboard para consultar indicadores, filtrar registros y visualizar pendientes por responsable.",
    impact: "Mayor visibilidad del trabajo diario y decisiones mas rapidas.",
    stack: ["React", "SQL", "APIs", "Tailwind CSS"],
  },
  {
    title: "Modernizacion de flujo administrativo",
    slug: "modernizacion-flujo-administrativo",
    sector: "Operacion administrativa",
    summary:
      "Digitalizacion de formularios, roles y reportes para reemplazar archivos dispersos y controles manuales.",
    impact: "Informacion mas confiable y una operacion menos dependiente de hojas sueltas.",
    stack: ["Laravel", "MySQL", "JavaScript", "Bootstrap"],
  },
];

export const achievements = [
  {
    title: "Procesos convertidos en sistemas utilizables",
    detail:
      "Experiencia llevando necesidades operativas a interfaces claras, roles, permisos y reportes.",
  },
  {
    title: "Criterio para proteger informacion sensible",
    detail:
      "Casos de estudio anonimizados para mostrar valor tecnico sin exponer clientes ni datos privados.",
  },
  {
    title: "Enfoque en mantenimiento",
    detail:
      "Estructuras pensadas para crecer sin que cada cambio obligue a rehacer la aplicacion.",
  },
];

export const stackGroups = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend y datos",
    items: ["Node.js", "Supabase", "PostgreSQL", "APIs REST"],
  },
  {
    title: "Operacion",
    items: ["Vercel", "GitHub", "Autenticacion", "Modelado SQL"],
  },
];

export const adminModules = [
  {
    title: "Perfil publico",
    description: "Nombre visible, titular, resumen, enlaces y datos de contacto.",
    status: "Editable",
  },
  {
    title: "Casos de estudio",
    description: "Proyectos anonimizados con problema, solucion, impacto y stack.",
    status: "MVP",
  },
  {
    title: "Logros",
    description: "Hitos profesionales, certificaciones, reconocimientos o resultados.",
    status: "MVP",
  },
  {
    title: "Tecnologias",
    description: "Skills agrupadas por categoria y ordenadas para el sitio publico.",
    status: "MVP",
  },
];
