import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const allowedImageTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
]);

const maxImageSize = 5 * 1024 * 1024;

export async function saveProjectImage(formData: FormData) {
  const file = formData.get("imageFile");
  const currentImageUrl = String(formData.get("currentImageUrl") ?? "").trim();
  const manualImageUrl = String(formData.get("imageUrl") ?? "").trim();

  if (!(file instanceof File) || file.size === 0) {
    return manualImageUrl || currentImageUrl || null;
  }

  const extension = allowedImageTypes.get(file.type);

  if (!extension) {
    throw new Error("Formato de imagen no permitido. Usa JPG, PNG o WEBP.");
  }

  if (file.size > maxImageSize) {
    throw new Error("La imagen supera el limite de 5 MB.");
  }

  const uploadDirectory = path.join(
    process.cwd(),
    "public",
    "uploads",
    "projects",
  );
  await mkdir(uploadDirectory, { recursive: true });

  const filename = `${randomUUID()}${extension}`;
  const destination = path.join(uploadDirectory, filename);
  const bytes = Buffer.from(await file.arrayBuffer());

  await writeFile(destination, bytes);

  return `/uploads/projects/${filename}`;
}
