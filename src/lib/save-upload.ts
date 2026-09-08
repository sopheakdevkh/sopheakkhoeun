import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

export type UploadFolder = "projects" | "about";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const MAX_BYTES = 5 * 1024 * 1024;

function extFromMime(mime: string) {
  switch (mime) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    case "image/svg+xml":
      return "svg";
    default:
      return null;
  }
}

function safeExt(filename: string) {
  const ext = path.extname(filename).slice(1).toLowerCase();
  if (["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(ext)) {
    return ext === "jpeg" ? "jpg" : ext;
  }
  return "png";
}

export async function saveUploadedImage(file: File, folder: UploadFolder) {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Invalid file type. Use JPG, PNG, WEBP, GIF, or SVG.");
  }

  if (file.size > MAX_BYTES) {
    throw new Error("File too large. Maximum size is 5 MB.");
  }

  const ext = extFromMime(file.type) ?? safeExt(file.name);
  const filename = `${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", folder);

  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), Buffer.from(await file.arrayBuffer()));

  return `/uploads/${folder}/${filename}`;
}
