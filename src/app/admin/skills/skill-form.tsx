import type { Skill } from "@prisma/client";
import Link from "next/link";
import {
  StateField,
  SubmitButton,
  TextField,
} from "@/components/admin-form-fields";

export function SkillForm({
  action,
  skill,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  skill?: Skill;
  submitLabel: string;
}) {
  return (
    <form
      action={action}
      className="space-y-5 rounded-lg border border-blue-100 bg-white/90 p-6 shadow-sm backdrop-blur"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          defaultValue={skill?.name}
          label="Nombre"
          name="name"
          placeholder="Next.js"
          required
        />
        <TextField
          defaultValue={skill?.category}
          label="Categoria"
          name="category"
          placeholder="Frontend, Backend y datos..."
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <TextField
          defaultValue={skill?.level ?? 3}
          label="Nivel 1-5"
          name="level"
          type="number"
        />
        <TextField
          defaultValue={skill?.sortOrder ?? 0}
          label="Orden"
          name="sortOrder"
          type="number"
        />
        <StateField defaultValue={skill?.state} />
      </div>

      <div className="flex flex-wrap gap-2">
        <SubmitButton label={submitLabel} />
        <Link
          className="rounded-md border border-blue-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-blue-50"
          href="/admin/skills"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
