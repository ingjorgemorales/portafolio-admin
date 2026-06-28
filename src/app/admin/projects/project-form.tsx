import type { Project } from "@prisma/client";
import Link from "next/link";
import {
  StateField,
  SubmitButton,
  TextAreaField,
  TextField,
} from "@/components/admin-form-fields";

export function ProjectForm({
  action,
  project,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  project?: Project;
  submitLabel: string;
}) {
  return (
    <form
      action={action}
      className="space-y-5 rounded-lg border border-blue-100 bg-white/90 p-6 shadow-sm backdrop-blur"
      encType="multipart/form-data"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          defaultValue={project?.title}
          label="Titulo"
          name="title"
          placeholder="Sistema interno de gestion..."
          required
        />
        <TextField
          defaultValue={project?.slug}
          label="Slug"
          name="slug"
          placeholder="se-genera-si-lo-dejas-vacio"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          defaultValue={project?.sector}
          label="Sector o alias"
          name="sector"
          placeholder="Operacion interna, telecomunicaciones..."
        />
        <TextField
          defaultValue={project?.imageUrl}
          label="URL de imagen manual"
          name="imageUrl"
          placeholder="Opcional si no subes archivo"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          defaultValue={project?.repoUrl}
          label="URL del repositorio"
          name="repoUrl"
          placeholder="https://github.com/..."
          type="url"
        />
        <TextField
          defaultValue={project?.liveUrl}
          label="URL demo"
          name="liveUrl"
          placeholder="https://..."
          type="url"
        />
      </div>

      <input name="currentImageUrl" type="hidden" value={project?.imageUrl ?? ""} />

      {project?.imageUrl ? (
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
          <p className="mb-3 text-sm font-medium text-blue-800">
            Imagen actual
          </p>
          <div
            className="h-44 rounded-md border border-blue-100 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.imageUrl})` }}
          />
        </div>
      ) : null}

      <label className="block rounded-lg border border-dashed border-blue-200 bg-blue-50 p-4">
        <span className="text-sm font-medium text-blue-800">
          Subir imagen del proyecto
        </span>
        <input
          accept="image/jpeg,image/png,image/webp"
          className="mt-3 block w-full text-sm text-blue-800 file:mr-4 file:rounded-md file:border-0 file:bg-blue-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600"
          name="imageFile"
          type="file"
        />
        <span className="mt-2 block text-xs text-blue-500">
          Formatos: JPG, PNG o WEBP. Maximo 5 MB. En produccion se guarda en
          Supabase Storage.
        </span>
      </label>

      <TextAreaField
        defaultValue={project?.summary}
        label="Resumen corto"
        name="summary"
        required
        rows={3}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <TextAreaField
          defaultValue={project?.problem}
          label="Problema"
          name="problem"
          rows={5}
        />
        <TextAreaField
          defaultValue={project?.solution}
          label="Solucion"
          name="solution"
          rows={5}
        />
        <TextAreaField
          defaultValue={project?.impact}
          label="Impacto"
          name="impact"
          rows={5}
        />
      </div>

      <TextAreaField
        defaultValue={project?.stack.join(", ")}
        label="Tecnologias"
        name="stack"
        placeholder="Next.js, PostgreSQL, Prisma"
        rows={3}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <StateField defaultValue={project?.state} />
        <label className="flex items-center gap-3 rounded-md border border-blue-100 px-3 py-2 text-sm font-medium text-blue-800">
          <input
            className="h-4 w-4 rounded border-blue-200"
            defaultChecked={project?.featured ?? true}
            name="featured"
            type="checkbox"
          />
          Mostrar como destacado
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <SubmitButton label={submitLabel} />
        <Link
          className="rounded-md border border-blue-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-blue-50"
          href="/admin/projects"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
