const messages: Record<string, string> = {
  created: "Registro creado correctamente.",
  updated: "Cambios guardados correctamente.",
  deleted: "Registro eliminado correctamente.",
  "upload-error":
    "No se pudo subir la imagen. Revisa que el bucket project-images exista y que el archivo sea JPG, PNG o WEBP de maximo 5 MB.",
};

export function AdminNotice({ status }: { status?: string }) {
  if (!status || !messages[status]) {
    return null;
  }

  const isError = status.endsWith("-error");

  return (
    <div
      className={`rounded-md border px-3 py-2 text-sm ${
        isError
          ? "border-red-200 bg-red-50 text-red-800"
          : "border-emerald-200 bg-emerald-50 text-emerald-800"
      }`}
    >
      {messages[status]}
    </div>
  );
}
