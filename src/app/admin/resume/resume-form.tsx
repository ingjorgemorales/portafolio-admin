import type { ResumeEntry } from "@prisma/client";
import Link from "next/link";
import {
  SubmitButton,
  TextAreaField,
  TextField,
} from "@/components/admin-form-fields";

const sections = [
  { value: "summary", label: "Resumen" },
  { value: "education", label: "Formacion" },
  { value: "experience", label: "Experiencia" },
  { value: "courses", label: "Cursos" },
  { value: "competencies", label: "Competencias" },
  { value: "languages", label: "Idiomas" },
];

export function ResumeForm({
  action,
  entry,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  entry?: ResumeEntry;
  submitLabel: string;
}) {
  return (
    <form
      action={action}
      className="space-y-5 rounded-lg border border-stone-200 bg-white/90 p-6 shadow-sm backdrop-blur"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-stone-700">Seccion</span>
          <select
            className="mt-2 w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/20"
            defaultValue={entry?.section ?? "education"}
            name="section"
            required
          >
            {sections.map((section) => (
              <option key={section.value} value={section.value}>
                {section.label}
              </option>
            ))}
          </select>
        </label>
        <TextField
          defaultValue={entry?.sortOrder ?? 0}
          label="Orden"
          name="sortOrder"
          type="number"
        />
      </div>

      <TextField
        defaultValue={entry?.title}
        label="Titulo"
        name="title"
        required
      />

      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          defaultValue={entry?.subtitle}
          label="Institucion / empresa"
          name="subtitle"
        />
        <TextField
          defaultValue={entry?.period}
          label="Periodo"
          name="period"
          placeholder="Enero 2023 - Diciembre 2023"
        />
      </div>

      <TextAreaField
        defaultValue={entry?.description}
        label="Descripcion"
        name="description"
        rows={5}
      />

      <label className="flex items-center gap-3 rounded-md border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700">
        <input
          className="h-4 w-4 rounded border-stone-300"
          defaultChecked={entry?.visible ?? true}
          name="visible"
          type="checkbox"
        />
        Visible en el sitio publico
      </label>

      <div className="flex flex-wrap gap-2">
        <SubmitButton label={submitLabel} />
        <Link
          className="rounded-md border border-stone-300 px-4 py-2.5 text-sm font-semibold transition hover:bg-stone-50"
          href="/admin/resume"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
