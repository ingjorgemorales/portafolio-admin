import type { Achievement } from "@prisma/client";
import Link from "next/link";
import {
  StateField,
  SubmitButton,
  TextAreaField,
  TextField,
} from "@/components/admin-form-fields";
import { formatDateInput } from "@/lib/admin-utils";

export function AchievementForm({
  achievement,
  action,
  submitLabel,
}: {
  achievement?: Achievement;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  return (
    <form
      action={action}
      className="space-y-5 rounded-lg border border-blue-100 bg-white/90 p-6 shadow-sm backdrop-blur"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          defaultValue={achievement?.title}
          label="Titulo"
          name="title"
          required
        />
        <TextField
          defaultValue={achievement?.category}
          label="Categoria"
          name="category"
          placeholder="Operacion, certificacion, arquitectura..."
        />
      </div>

      <TextAreaField
        defaultValue={achievement?.description}
        label="Descripcion"
        name="description"
        required
        rows={5}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          defaultValue={formatDateInput(achievement?.achievedAt)}
          label="Fecha"
          name="achievedAt"
          type="date"
        />
        <StateField defaultValue={achievement?.state} />
      </div>

      <div className="flex flex-wrap gap-2">
        <SubmitButton label={submitLabel} />
        <Link
          className="rounded-md border border-blue-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-blue-50"
          href="/admin/achievements"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
