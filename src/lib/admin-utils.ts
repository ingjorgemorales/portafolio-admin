import { PublishState } from "@prisma/client";

export function requiredText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export function optionalText(formData: FormData, key: string) {
  const value = requiredText(formData, key);
  return value.length > 0 ? value : null;
}

export function parseState(formData: FormData) {
  const value = String(formData.get("state") ?? "DRAFT");

  if (value === "PUBLISHED") {
    return PublishState.PUBLISHED;
  }

  if (value === "HIDDEN") {
    return PublishState.HIDDEN;
  }

  return PublishState.DRAFT;
}

export function parseBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

export function parseStack(formData: FormData) {
  return requiredText(formData, "stack")
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseInteger(formData: FormData, key: string, fallback = 0) {
  const value = Number.parseInt(String(formData.get(key) ?? ""), 10);
  return Number.isFinite(value) ? value : fallback;
}

export function parseDate(formData: FormData, key: string) {
  const value = requiredText(formData, key);
  return value ? new Date(`${value}T00:00:00.000Z`) : null;
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatDateInput(value?: Date | null) {
  if (!value) {
    return "";
  }

  return value.toISOString().slice(0, 10);
}
