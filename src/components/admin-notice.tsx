const messages: Record<string, string> = {
  created: "Registro creado correctamente.",
  updated: "Cambios guardados correctamente.",
  deleted: "Registro eliminado correctamente.",
};

export function AdminNotice({ status }: { status?: string }) {
  if (!status || !messages[status]) {
    return null;
  }

  return (
    <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
      {messages[status]}
    </div>
  );
}
