import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const allowedImageTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
]);

const maxImageSize = 5 * 1024 * 1024;
const projectImagesBucket = "project-images";

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

  const filename = `${randomUUID()}${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  if (hasStorageConfig()) {
    return saveProjectImageToSupabase(filename, file.type, bytes);
  }

  const uploadDirectory = path.join(
    process.cwd(),
    "public",
    "uploads",
    "projects",
  );
  await mkdir(uploadDirectory, { recursive: true });

  const destination = path.join(uploadDirectory, filename);
  await writeFile(destination, bytes);

  return `/uploads/projects/${filename}`;
}

function hasStorageConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

async function saveProjectImageToSupabase(
  filename: string,
  contentType: string,
  bytes: Buffer,
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
      },
    },
  );

  const storagePath = `projects/${filename}`;
  const { error } = await supabase.storage
    .from(projectImagesBucket)
    .upload(storagePath, bytes, {
      cacheControl: "31536000",
      contentType,
      upsert: false,
    });

  if (error) {
    throw new Error(`No se pudo subir la imagen a Supabase: ${error.message}`);
  }

  const { data } = supabase.storage
    .from(projectImagesBucket)
    .getPublicUrl(storagePath);

  return data.publicUrl;
}
