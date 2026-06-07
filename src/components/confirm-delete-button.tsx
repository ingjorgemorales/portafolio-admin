"use client";

import { Trash2 } from "lucide-react";

export function ConfirmDeleteButton({
  message = "Esta accion no se puede deshacer. Deseas eliminar este registro?",
}: {
  message?: string;
}) {
  return (
    <button
      className="rounded-md border border-red-200 p-2 text-red-700 transition hover:bg-red-50"
      onClick={(event) => {
        if (!window.confirm(message)) {
          event.preventDefault();
        }
      }}
      title="Eliminar"
      type="submit"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
