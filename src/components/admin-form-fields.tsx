import { PublishState } from "@prisma/client";

export function TextField({
  defaultValue,
  label,
  name,
  placeholder,
  required,
  type = "text",
}: {
  defaultValue?: string | number | null;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-blue-800">{label}</span>
      <input
        className="mt-2 w-full rounded-md border border-blue-200 px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
        defaultValue={defaultValue ?? ""}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}

export function TextAreaField({
  defaultValue,
  label,
  name,
  placeholder,
  required,
  rows = 4,
}: {
  defaultValue?: string | null;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-blue-800">{label}</span>
      <textarea
        className="mt-2 w-full resize-y rounded-md border border-blue-200 px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
        defaultValue={defaultValue ?? ""}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
      />
    </label>
  );
}

export function StateField({ defaultValue }: { defaultValue?: PublishState }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-blue-800">Estado</span>
      <select
        className="mt-2 w-full rounded-md border border-blue-200 px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
        defaultValue={defaultValue ?? "DRAFT"}
        name="state"
      >
        <option value="DRAFT">Borrador</option>
        <option value="PUBLISHED">Publicado</option>
        <option value="HIDDEN">Oculto</option>
      </select>
    </label>
  );
}

export function SubmitButton({ label }: { label: string }) {
  return (
    <button
      className="rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
      type="submit"
    >
      {label}
    </button>
  );
}
