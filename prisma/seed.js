const { PrismaClient, PublishState } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  await prisma.adminUser.upsert({
    where: { email: "admin@local.dev" },
    update: {},
    create: {
      email: "admin@local.dev",
      name: "Administrador",
      passwordHash: await bcrypt.hash("admin123", 10),
    },
  });

  await prisma.profile.upsert({
    where: { id: "main-profile" },
    update: {},
    create: {
      id: "main-profile",
      displayName: "Juan Morales",
      role: "Desarrollador de Software e Ingeniero de Sistemas",
      headline:
        "Construyo soluciones web mantenibles para automatizar procesos, ordenar informacion y convertir operaciones reales en software util.",
      location: "Colombia",
      email: "contacto@tudominio.com",
      githubUrl: "https://github.com/",
      linkedinUrl: "https://www.linkedin.com/",
    },
  });

  const projects = [
    {
      title: "Gestion documental para operacion interna",
      slug: "gestion-documental-operacion-interna",
      sector: "Organizacion de servicios",
      summary:
        "Sistema web para centralizar documentos, controlar estados y reducir busquedas manuales entre areas.",
      impact:
        "Menos tareas repetitivas y mejor trazabilidad de informacion critica.",
      stack: ["Next.js", "PostgreSQL", "Prisma", "TypeScript"],
      featured: true,
      state: PublishState.PUBLISHED,
    },
    {
      title: "Panel operativo para seguimiento de procesos",
      slug: "panel-operativo-seguimiento-procesos",
      sector: "Empresa logistica",
      summary:
        "Dashboard para consultar indicadores, filtrar registros y visualizar pendientes por responsable.",
      impact: "Mayor visibilidad del trabajo diario y decisiones mas rapidas.",
      stack: ["React", "SQL", "APIs", "Tailwind CSS"],
      featured: true,
      state: PublishState.PUBLISHED,
    },
    {
      title: "Modernizacion de flujo administrativo",
      slug: "modernizacion-flujo-administrativo",
      sector: "Cliente privado",
      summary:
        "Digitalizacion de formularios, roles y reportes para reemplazar archivos dispersos y controles manuales.",
      impact:
        "Informacion mas confiable y una operacion menos dependiente de hojas sueltas.",
      stack: ["Laravel", "MySQL", "JavaScript", "Bootstrap"],
      featured: true,
      state: PublishState.PUBLISHED,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  const achievements = [
    {
      title: "Procesos convertidos en sistemas utilizables",
      description:
        "Experiencia llevando necesidades operativas a interfaces claras, roles, permisos y reportes.",
      category: "Operacion",
      state: PublishState.PUBLISHED,
    },
    {
      title: "Criterio para proteger informacion sensible",
      description:
        "Casos de estudio anonimizados para mostrar valor tecnico sin exponer clientes ni datos privados.",
      category: "Privacidad",
      state: PublishState.PUBLISHED,
    },
    {
      title: "Enfoque en mantenimiento",
      description:
        "Estructuras pensadas para crecer sin que cada cambio obligue a rehacer la aplicacion.",
      category: "Arquitectura",
      state: PublishState.PUBLISHED,
    },
  ];

  await prisma.achievement.deleteMany();
  await prisma.achievement.createMany({ data: achievements });

  const skills = [
    ["Next.js", "Frontend", 4],
    ["React", "Frontend", 4],
    ["TypeScript", "Frontend", 4],
    ["Tailwind CSS", "Frontend", 4],
    ["PostgreSQL", "Backend y datos", 4],
    ["Prisma", "Backend y datos", 3],
    ["APIs REST", "Backend y datos", 4],
    ["GitHub", "Operacion", 4],
    ["Vercel", "Operacion", 3],
  ];

  await prisma.skill.deleteMany();
  await prisma.skill.createMany({
    data: skills.map(([name, category, level], index) => ({
      name,
      category,
      level,
      sortOrder: index + 1,
      state: PublishState.PUBLISHED,
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
