# Portafolio Admin

Portafolio profesional con sitio publico y base para panel administrativo.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- PostgreSQL local
- Prisma ORM
- Vercel para despliegue futuro

## Correr en local

```bash
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Abrir:

```text
http://127.0.0.1:3000
```

Rutas iniciales:

- `/`: sitio publico
- `/proyectos/[slug]`: pagina publica individual por proyecto
- `/admin`: dashboard administrativo
- `/admin/login`: pantalla de login local
- `/admin/projects`: administrar proyectos
- `/admin/achievements`: administrar logros
- `/admin/skills`: administrar tecnologias
- `/admin/profile`: editar perfil publico
- `/admin/resume`: editar hoja de vida, estudios, experiencia, cursos, competencias e idiomas

El panel incluye confirmacion antes de eliminar y avisos al crear, editar o borrar registros.

## Imagenes locales

En proyectos puedes cargar una imagen desde el formulario. Los archivos se guardan en:

```text
public/uploads/projects
```

La base de datos guarda la ruta publica, por ejemplo:

```text
/uploads/projects/archivo.webp
```

Para produccion se recomienda migrar estas imagenes a Cloudinary, Supabase Storage o Vercel Blob.

## Importar proyectos de GitHub

Se agrego un script local para cargar los repositorios publicos de `ingjorgemorales` como proyectos del portafolio:

```bash
npm run db:import-github
```

El script actualiza el perfil con el enlace real de GitHub y reemplaza los proyectos existentes por los repositorios publicos revisados. Actualmente importa 12 repositorios, incluyendo `enterprise-automation-platform`, `colvacontratos`, `novapos-saas`, `n8n-monitor` y `Tuchin-turismo`.

Usuario local inicial:

```text
Correo: admin@local.dev
Contrasena: admin123
```

## Configurar PostgreSQL local

1. Instalar PostgreSQL.
2. Crear la base de datos `portafolio_admin`.
3. Copiar `.env.example` como `.env`.
4. Ajustar la cadena de conexion:

```bash
DATABASE_URL="postgresql://postgres:TU_PASSWORD@localhost:5432/portafolio_admin?schema=public"
```

5. Ejecutar:

```bash
npm run db:migrate
npm run db:seed
```

## Despliegue en Vercel

1. Subir el proyecto a GitHub.
2. Crear un proyecto en Vercel desde ese repositorio.
3. Agregar la variable `DATABASE_URL` de produccion.
4. Deploy.

## Siguientes tareas

- Agregar subida de imagenes.
- Cambiar contrasena desde el panel.
- Mejorar validaciones por campo.
- Preparar base de datos de produccion.
- Subir a GitHub.
- Desplegar en Vercel.
