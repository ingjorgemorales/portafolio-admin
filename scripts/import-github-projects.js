const { PrismaClient, PublishState } = require("@prisma/client");

const prisma = new PrismaClient();
const githubUrl = "https://github.com/ingjorgemorales";

const projects = [
  {
    title: "Enterprise Automation Platform",
    slug: "enterprise-automation-platform",
    sector: "Automatizacion empresarial",
    summary:
      "Plataforma para programacion tecnica, campanas de mensajeria Twilio, importaciones Excel, orquestacion de flujos y monitoreo de respuestas en tiempo real.",
    problem:
      "La operacion tecnica necesitaba coordinar agendas, cargar datos masivos, automatizar mensajes y monitorear respuestas de clientes sin depender de procesos manuales dispersos.",
    solution:
      "Se desarrollo una plataforma web en PHP con modulos para importacion de Excel, mensajeria, flujos operativos y seguimiento de interacciones en tiempo real.",
    impact:
      "Centraliza tareas operativas, reduce trabajo repetitivo y habilita mayor control sobre comunicaciones, respuestas y ejecucion de procesos tecnicos.",
    stack: ["PHP", "CSS", "JavaScript", "Excel imports", "Twilio"],
    repoUrl: "https://github.com/ingjorgemorales/enterprise-automation-platform",
    liveUrl: null,
    featured: true,
    state: PublishState.PUBLISHED,
  },
  {
    title: "ColvaContratos",
    slug: "colvacontratos",
    sector: "Gestion contractual",
    summary:
      "Plataforma de gestion de contratos desarrollada con Laravel, automatizacion de flujos, gestion documental y control operativo.",
    problem:
      "La gestion contractual requiere controlar documentos, estados, responsables y trazabilidad sin perder informacion entre areas o procesos heredados.",
    solution:
      "Se migro y estructuro una plataforma hacia Laravel 13 usando un puente legacy controlado, permitiendo conservar funcionalidades mientras se moderniza la arquitectura.",
    impact:
      "Permite avanzar hacia una aplicacion mas mantenible sin reescribir todo de inmediato, reduciendo riesgo y protegiendo la continuidad operativa.",
    stack: ["Laravel 13", "PHP", "Blade", "CSS", "JavaScript", "MySQL"],
    repoUrl: "https://github.com/ingjorgemorales/colvacontratos",
    liveUrl: null,
    featured: true,
    state: PublishState.PUBLISHED,
  },
  {
    title: "NovaPOS SaaS",
    slug: "novapos-saas",
    sector: "POS / SaaS multiempresa",
    summary:
      "Sistema POS web SaaS multiempresa con Laravel 11, Livewire 3, Tailwind y MySQL, orientado a ventas y administracion comercial.",
    problem:
      "Un negocio que opera ventas necesita controlar productos, operaciones y empresas desde una plataforma web mantenible y preparada para multiempresa.",
    solution:
      "Se construyo una base SaaS con Laravel, Livewire y Tailwind para manejar una experiencia POS web moderna con separacion por empresas.",
    impact:
      "El proyecto muestra capacidad para disenar software comercial escalable, modular y alineado con necesidades reales de puntos de venta.",
    stack: ["Laravel 11", "Livewire 3", "Tailwind CSS", "MySQL", "Blade"],
    repoUrl: "https://github.com/ingjorgemorales/novapos-saas",
    liveUrl: null,
    featured: true,
    state: PublishState.PUBLISHED,
  },
  {
    title: "n8n Monitor",
    slug: "n8n-monitor",
    sector: "Monitoreo / automatizacion",
    summary:
      "Dashboard de monitoreo en tiempo real para workflows y ejecuciones de n8n, con alertas por Telegram construido en Laravel 12 y MySQL.",
    problem:
      "Los flujos automatizados necesitan monitoreo, visibilidad de ejecuciones y alertas oportunas cuando ocurren fallos o eventos importantes.",
    solution:
      "Se desarrollo un panel con Laravel para consultar ejecuciones, visualizar estados y enviar alertas por Telegram a partir de eventos relevantes.",
    impact:
      "Mejora la observabilidad de automatizaciones y ayuda a reaccionar mas rapido ante fallos o cambios en procesos integrados.",
    stack: ["Laravel 12", "MySQL", "Blade", "CSS", "JavaScript", "Telegram"],
    repoUrl: "https://github.com/ingjorgemorales/n8n-monitor",
    liveUrl: null,
    featured: true,
    state: PublishState.PUBLISHED,
  },
  {
    title: "Tuchin Turismo",
    slug: "tuchin-turismo",
    sector: "Turismo / territorio",
    summary:
      "Sitio web para fomentar el turismo en Tuchin, Cordoba, construido con TypeScript y tecnologias web modernas.",
    problem:
      "La promocion turistica local necesita una presencia digital clara para comunicar atractivos, cultura y valor territorial.",
    solution:
      "Se desarrollo un sitio web orientado a presentar informacion turistica de Tuchin con una interfaz moderna y componentes reutilizables.",
    impact:
      "Contribuye a visibilizar el territorio y sirve como ejercicio de desarrollo frontend aplicado a una necesidad cultural y comunitaria.",
    stack: ["TypeScript", "JavaScript", "HTML", "CSS", "Dockerfile"],
    repoUrl: "https://github.com/ingjorgemorales/Tuchin-turismo",
    liveUrl: null,
    featured: true,
    state: PublishState.PUBLISHED,
  },
  {
    title: "TESIS - Sistema de deteccion de fracturas oseas",
    slug: "tesis-sistema-deteccion-fracturas-oseas",
    sector: "Salud / investigacion aplicada",
    summary:
      "Proyecto academico orientado a la deteccion de fracturas oseas, integrando desarrollo web y analisis de imagenes.",
    problem:
      "El analisis de posibles fracturas requiere apoyo visual, organizacion de resultados y trazabilidad de informacion dentro de un flujo controlado.",
    solution:
      "Se desarrollo un sistema web en PHP con interfaz HTML, CSS y JavaScript para estructurar consultas y resultados asociados a fracturas oseas.",
    impact:
      "Muestra capacidad para abordar una necesidad de alto valor, modelar informacion sensible y construir una solucion aplicada en contexto academico.",
    stack: ["PHP", "CSS", "HTML", "JavaScript", "Hack"],
    repoUrl: "https://github.com/ingjorgemorales/TESIS",
    liveUrl: null,
    featured: true,
    state: PublishState.PUBLISHED,
  },
  {
    title: "Blog con Laravel 9",
    slug: "blog-laravel-9",
    sector: "Aprendizaje / desarrollo web",
    summary:
      "Primer blog desarrollado con Laravel 9, enfocado en practicar estructura MVC, rutas, vistas y bases de una aplicacion web.",
    problem:
      "Para afianzar conocimientos backend era necesario construir una aplicacion funcional con rutas, controladores, vistas y estructura de proyecto.",
    solution:
      "Se construyo un blog con Laravel 9 usando PHP, Blade, JavaScript y estilos para practicar fundamentos de una aplicacion web mantenible.",
    impact:
      "Evidencia bases en Laravel, organizacion MVC y desarrollo de funcionalidades web desde un framework profesional.",
    stack: ["Laravel 9", "PHP", "JavaScript", "Blade", "SCSS", "CSS"],
    repoUrl: "https://github.com/ingjorgemorales/blog",
    liveUrl: null,
    featured: true,
    state: PublishState.PUBLISHED,
  },
  {
    title: "AI-SAAS",
    slug: "ai-saas",
    sector: "SaaS / inteligencia artificial",
    summary:
      "Aplicacion tipo SaaS con Next.js y TypeScript, orientada a explorar interfaces modernas y funcionalidades relacionadas con IA.",
    problem:
      "Las soluciones SaaS modernas necesitan interfaces rapidas, componentes reutilizables y flujos claros para consumir funcionalidades de IA.",
    solution:
      "Se trabajo sobre una aplicacion con Next.js, TypeScript, JavaScript y CSS desplegada en Vercel.",
    impact:
      "Muestra acercamiento a tecnologias modernas de frontend, despliegue en Vercel y patrones de producto digital con enfoque IA.",
    stack: ["Next.js", "TypeScript", "JavaScript", "CSS", "Vercel"],
    repoUrl: "https://github.com/ingjorgemorales/AI-SAAS",
    liveUrl: "https://ai-saas-seniorj.vercel.app/",
    featured: true,
    state: PublishState.PUBLISHED,
  },
  {
    title: "Perfil tecnico y habilidades",
    slug: "perfil-tecnico-habilidades",
    sector: "Marca personal / aprendizaje",
    summary:
      "Repositorio con habilidades, intereses tecnicos y areas de aprendizaje relacionadas con desarrollo web, bases de datos y automatizacion.",
    problem:
      "Un perfil profesional necesita ordenar habilidades actuales, areas de crecimiento y temas tecnicos por aprender.",
    solution:
      "Se documento una ruta de habilidades que incluye gestion de proyectos, Git, lenguajes, desarrollo web, bases de datos, Docker y seguridad.",
    impact:
      "Sirve como punto de partida para comunicar intereses profesionales, brechas de aprendizaje y evolucion del perfil tecnico.",
    stack: ["Git", "JavaScript", "Python", "HTML", "CSS", "PostgreSQL", "Docker"],
    repoUrl: "https://github.com/ingjorgemorales/jorgemorales1",
    liveUrl: null,
    featured: true,
    state: PublishState.PUBLISHED,
  },
  {
    title: "next13-ai-saas",
    slug: "next13-ai-saas",
    sector: "Exploracion / inteligencia artificial",
    summary:
      "Repositorio de exploracion para una aplicacion SaaS con enfoque en inteligencia artificial y stack moderno basado en Next.js.",
    problem:
      "El aprendizaje de productos con IA requiere experimentar con estructuras de aplicacion, rutas, componentes y patrones SaaS.",
    solution:
      "Se inicio una base de proyecto para practicar conceptos de Next.js 13 y aplicaciones orientadas a inteligencia artificial.",
    impact:
      "Refleja investigacion y practica con tecnologias modernas, con margen para completar documentacion y funcionalidades.",
    stack: ["Next.js", "React", "IA", "SaaS"],
    repoUrl: "https://github.com/ingjorgemorales/next13-ai-saas",
    liveUrl: null,
    featured: true,
    state: PublishState.PUBLISHED,
  },
  {
    title: "X-RAI",
    slug: "x-rai",
    sector: "Exploracion / inteligencia artificial",
    summary:
      "Repositorio de exploracion relacionado con inteligencia artificial, pensado como base para prototipos futuros.",
    problem:
      "Al explorar IA es comun iniciar prototipos para validar ideas, flujos y posibilidades antes de consolidar un producto.",
    solution:
      "Se creo una base de repositorio para organizar una idea relacionada con IA y continuar su desarrollo tecnico.",
    impact:
      "Puede convertirse en caso de estudio si se completa con objetivos, funcionalidades y resultados medibles.",
    stack: ["IA", "Prototipado", "GitHub"],
    repoUrl: "https://github.com/ingjorgemorales/X-RAI",
    liveUrl: null,
    featured: true,
    state: PublishState.PUBLISHED,
  },
  {
    title: "tuto-vscode",
    slug: "tuto-vscode",
    sector: "Aprendizaje / herramientas",
    summary:
      "Repositorio inicial de practica con VS Code y GitHub, util como evidencia de primeros pasos en control de versiones.",
    problem:
      "Antes de construir proyectos complejos, es necesario dominar herramientas base como editor, repositorios y flujo de control de versiones.",
    solution:
      "Se creo un repositorio de practica para familiarizarse con VS Code, GitHub y manejo inicial de proyectos.",
    impact:
      "Representa el inicio del recorrido tecnico y la adopcion de buenas practicas de versionamiento.",
    stack: ["VS Code", "Git", "GitHub"],
    repoUrl: "https://github.com/ingjorgemorales/tuto-vscode",
    liveUrl: null,
    featured: true,
    state: PublishState.PUBLISHED,
  },
];

async function main() {
  await prisma.profile.upsert({
    where: { id: "main-profile" },
    update: {
      displayName: "Jorge Andres Morales De La Ossa",
      role: "Ingeniero de sistemas y desarrollador de software",
      headline:
        "Desarrollador de software enfocado en sistemas web, automatizacion de procesos, plataformas operativas y soluciones con enfoque practico.",
      location: "Bogota, Colombia",
      email: "mjorge801@yahoo.com",
      githubUrl,
    },
    create: {
      id: "main-profile",
      displayName: "Jorge Andres Morales De La Ossa",
      role: "Ingeniero de sistemas y desarrollador de software",
      headline:
        "Desarrollador de software enfocado en sistemas web, automatizacion de procesos, plataformas operativas y soluciones con enfoque practico.",
      location: "Bogota, Colombia",
      email: "mjorge801@yahoo.com",
      githubUrl,
      linkedinUrl: "https://www.linkedin.com/",
    },
  });

  await prisma.project.deleteMany();

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
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
